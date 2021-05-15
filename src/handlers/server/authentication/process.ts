import initialisedDB from "@server/firebase-admin"
import bcrypt from "bcryptjs"
import Cookies from "cookies"
import {isASCII, isNumeric} from "@utilities/texts";
import {update} from "@server/tracker";
import LooseTypeObject from "@interfaces/LooseTypeObject";
import {compareDataPair, createDataPair, isValidEmail, isValidPassword} from "@server/authentication/dataChecking";

export const login = async (stdID, password, live, fingerPrint, req, res) => {

  //initialise collections
  const userCollection = initialisedDB.collection("users")
  const sessionsColl = initialisedDB.collection("sessions")

  if (stdID === "" || password === "") return {status: false, report: "invalid_credentials"}

  const userDB = await userCollection.where("stdID", "==", stdID).get()

  if (userDB.docs.length <= 0) return {status: false, report: "invalid_user"}

  const userDoc = userDB.docs[0]

  if (userDoc.get("safeMode") === true) {
    const auData = userDoc.data()
    if (!("authorised" in auData)) return {status: false, report: "notAuthorised"}
    const authorisedField: LooseTypeObject<{fingerPrint: string}> = auData.authorised
    if(!(Object.values(authorisedField).some(val => (val.fingerPrint === fingerPrint)))) return {status: false, report: "notAuthorised"}
  }
  //password checking guard clause
  if (!(await bcrypt.compare(password, userDoc.get("password")))) return {
    status: false, report: "invalid_password"
  }

  const expires = (new Date().getTime()) + live

  // destroy all active session
  const activeSessions = await sessionsColl.where("userID","==",userDoc.id).get()
  activeSessions.forEach(doc => {
    doc.ref.delete()
  })

  //append session to db
  const sess = await sessionsColl.add({
    userID: userDoc.id, dataRefID: userDoc.get("dataRefID"), clientfp: fingerPrint, expires: expires
  })

  //set session cookie
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  cookies.set('sessionID', sess.id, {
    httpOnly: true,
    sameSite: 'Strict',
    signed: true,
    expires: new Date(expires)
  })

  //update Tracker
  update("system", "login", fingerPrint, userDoc.id)

  return {status: true, report: "success"}

}

export const register = async (req) => {

  //initialise collections
  const ref = initialisedDB.collection("ref")
  const userColl = initialisedDB.collection("users")

  const ousd = await userColl.where("stdID", "==", req.body.stdID).get()

  if (!ousd.empty) return {status: false, report: "user_exists"}

  const refDB = await ref.where("student_id", "==", req.body.stdID).get()

  if (refDB.empty) return {status: false, report: "invalid_stdID"}

  const dataPair = createDataPair(refDB.docs[0].data(), req.body)

  if (!compareDataPair(dataPair, "firstname") || !compareDataPair(dataPair, "lastname")) return {
    status: false, report: "mismatch_data"
  }

  if (!isValidEmail(req.body.email) || !isNumeric(req.body.phone)) return {
    status: false, report: "invalid_data"
  }

  if (!isValidPassword(req.body.password)) return {
    status: false, report: "invalid_credentials"
  }

  if(req.body.password !== req.body.confirmPassword) return {
    status: false, report: "password_mismatch"
  }

  const dataColl = initialisedDB.collection("data")

  const dataDoc = await dataColl.add({
    ...refDB.docs[0].data(),
    ...{
      club: "",
      audition: {}
    }
  })

  const userDoc = await userColl.add({
    stdID: refDB.docs[0].get("student_id"),
    email: req.body.email,
    phone: req.body.phone,
    dataRefID: dataDoc.id,
    password: await bcrypt.hash(req.body.password, 10),
    safeMode: false,
    authorised: {}
  })

  //update Tracker
  update("system", "register", req.body.fingerPrint, userDoc.id)

  return {status: true, report: "success"}

}

export const destroySession = async (req, res, cause = "") => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  if (!sessionID) return {status: false}

  //destroy cookie and remove session from db
  cookies.set("sessionID")
  const doc = initialisedDB.collection("sessions").doc(sessionID)
  const data = await doc.get()

  //update Tracker
  update("system", cause !== "" ? "logout->" + cause : "logout", data.get("clientfp"), data.get("userID"))
  await doc.delete()

  return {status: true}
}