import Cookies from "cookies"
import initialisedDB from "@server/firebase-admin"
import {destroySession} from "@server/authentication";


export const fetchUser = async (req, res, fingerprint) => {

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  //guard clauses
  if (!sessionID) return {logged: false, userData: {}}
  const sessionInfo = await initialisedDB.collection("sessions").doc(sessionID).get()
  if (!sessionInfo.exists) return cookies.set("sessionID")
  if (sessionInfo.get("clientfp") !== fingerprint) return await destroySession(req, res, "fp_reject")
  if (sessionInfo.get("expires") <= new Date().getTime()) return await destroySession(req, res, "expired")

  const docData = await initialisedDB.collection("data").doc(sessionInfo.get("dataRefID"))
                                     .get()

  if (!docData.exists) return {logged: false, userData: {}}
  return {
    logged: true,
    userID: sessionInfo.get("userID"),
    userData: docData.data()
  }
}