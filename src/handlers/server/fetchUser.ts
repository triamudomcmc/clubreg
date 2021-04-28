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
  if (sessionInfo.get("clientfp") !== fingerprint) return await destroySession(req, res)
  if (sessionInfo.get("expires") <= new Date().getTime()) return await destroySession(req, res)

  const docData = await initialisedDB.collection("users").doc(sessionInfo.get("userID"))
                                     .get()

  if (!docData.exists) return {logged: false, userData: {}}
  return {
    logged: true,
    userData: {
      email: docData.get("email"), username: docData.get("username"),
      stdID: docData.get("stdID"), prefix: docData.get("prefix"),
      firstname: docData.get("firstname"), lastname: docData.get("lastname"),
      room: docData.get("room"), number: docData.get("number")
    }
  }
}