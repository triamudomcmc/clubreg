import initialisedDB from "@server/firebase-admin"
import bcrypt from "bcryptjs"
import Cookies from "cookies"
import cryptoRandomString from "crypto-random-string";
import {isASCII, isNumeric} from "@utilities/texts";

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
  const sess = await sessionsColl.add({userID: userDoc.id,dataRefID: userDoc.get("dataRefID"), clientfp: fingerPrint, expires: expires})

  //set session cookie
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  cookies.set('sessionID', sess.id, {
    httpOnly: true,
    sameSite: 'lax',
    signed: true,
    expires: new Date(expires)
  })

  return {status: true, report: "success"}

}

class Data {

  private doc
  private request

  constructor(document) {
    this.doc = document
  }

  public addRefRequest(req) {
    this.request = req
    return this
  }

  public compareKey(key: string){
    return this.request.body[key] == this.doc.get(key)
  }

  public get(key: string){
    return this.doc.get(key)
  }
}

const isValidEmail = (email: string) => {
  return email !== "" && email.includes("@") && email.includes(".")
}

const isValidPassword = (password: string) => {
  return password.length >= 10 && isASCII(password)
}

export const register = async (req) => {

  const ref = initialisedDB.collection("ref")
  const userColl = initialisedDB.collection("users")

  const ousd = await userColl.where("stdID","==",req.body.stdID).get()
  if (!ousd.empty) return {status: false, report: "user_exists"}
  const refDB = await ref.where("student_id", "==", req.body.stdID).get()

  if(refDB.empty) return {status: false, report: "invalid_stdID"}
  const data = new Data(refDB.docs[0]).addRefRequest(req)
  if(!data.compareKey("firstname") || !data.compareKey("lastname")) return {status: false, report: "mismatch_data"}
  if(!isValidEmail(req.body.email) || !isNumeric(req.body.phone)) return {status: false, report: "invalid_data"}
  if(!isValidPassword(req.body.password) || req.body.password !== req.body.confirmPassword) return {status: false, report: "invalid_credentials"}
  const dataColl = initialisedDB.collection("data")

  const dataDoc = await dataColl.add({
    ...refDB.docs[0].data(),
    ...{
      club: "",
      audition: {}
    }
  })
  await userColl.add({
    stdID: refDB.docs[0].get("student_id"),
    email: req.body.email,
    phone: req.body.phone,
    dataRefID: dataDoc.id,
    password: await bcrypt.hash(req.body.password, 10),
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