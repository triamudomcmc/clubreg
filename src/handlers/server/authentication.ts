import initialisedDB from "@server/firebase-admin"
import bcrypt from "bcryptjs"
import Cookies from "cookies"
import cryptoRandomString from "crypto-random-string";
import {isASCII, isNumeric} from "@utilities/texts";
import {update} from "@server/tracker";
import LooseTypeObject from "../../interfaces/LooseTypeObject";

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

const createDataPair = (ref1: LooseTypeObject<string>, ref2: LooseTypeObject<string>) => {
  const ref1Keys = Object.keys(ref1), ref2Keys = Object.keys(ref2)
  let primary = ref1, secondary = ref2
  if (ref1Keys.length < ref2Keys.length) primary = ref2; secondary = ref1
  const dataPair = {}
  Object.keys(primary).map(value => {
    dataPair[value] = [primary[value], value in secondary ? secondary[value] : ""]
  })

  return dataPair
}

const compareDataPair = (dataPair: LooseTypeObject<string>, key: string) => dataPair[key][0] === dataPair[key][1]

const isValidEmail = (email: string) => email !== "" && email.includes("@") && email.includes(".")

const isValidPassword = (password: string) => password.length >= 10 && isASCII(password)

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

  if (!isValidPassword(req.body.password) || req.body.password !== req.body.confirmPassword) return {
    status: false, report: "invalid_credentials"
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