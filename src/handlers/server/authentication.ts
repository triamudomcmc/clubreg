import initialisedDB from "@server/firebase-admin"
import bcrypt from "bcryptjs"
import Cookies from "cookies"
import cryptoRandomString from "crypto-random-string";

const sessionSize = 24

const generateSession = async (sessCollection) => {
  let sessionID = cryptoRandomString({length: sessionSize})
  let sessionDoc = await sessCollection.doc(sessionID).get()

  //provide unused session id
  while (sessionDoc.exists) {
    sessionID = cryptoRandomString({length: sessionSize})
    sessionDoc = await sessCollection.doc(sessionID).get()
  }

  return sessionID
}

export const login = async (stdID, password, live, fingerPrint, req, res) => {

  //initialise collections
  const userCollection = initialisedDB.collection("users")
  const sessionsColl = initialisedDB.collection("sessions")

  if (stdID === "" || password === "") return {status: false, report: "invalid_credentials"}

  const userDB = await userCollection.where("stdID", "==", stdID).get()

  if (userDB.docs.length <= 0) return {status: false, report: "invalid_user"}

  const userDoc = userDB.docs[0]

  //password checking guard clause
  if (!(await bcrypt.compare(password, userDoc.get("password")))) return {
    status: false, report: "invalid_password"
  }

  const expires = (new Date().getTime()) + live

  //append session to db
  const sessionID = await generateSession(sessionsColl)
  await sessionsColl.doc(sessionID)
                    .create({userID: userDoc.id, clientfp: fingerPrint, expires: expires})

  //set session cookie
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  cookies.set('sessionID', sessionID, {
    httpOnly: true,
    sameSite: 'lax',
    signed: true,
    expires: new Date(expires)
  })

  return {status: true, report: "success"}

}

export const destroySession = async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  if (!sessionID) return {status: false}

  //destroy cookie and remove session from db
  cookies.set("sessionID")
  await initialisedDB.collection("sessions").doc(sessionID).delete()
  return {status: true}
}