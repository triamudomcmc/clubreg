import Cookies from "cookies"
import initialisedDB from "@server/firebase-admin"
import {destroySession} from "@server/authentication";


export const fetchUser = async (req, res, fingerprint) => {

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  //guard clauses
  if (!sessionID) return {logged: false, data: {userData: {}}, report: "missingCookie"}

  // 1 read
  const sessionInfo = await initialisedDB.collection("sessions").doc(sessionID).get()

  if (!sessionInfo.exists) {
    cookies.set("sessionID");
    return {logged: false, data: {userData: {}}, report: "sessionError"}
  }
  if (sessionInfo.get("clientfp") !== fingerprint) {
    await destroySession(req, res, "fp_reject");
    return {logged: false, data: {userData: {}}, report: "sessionRejected"}
  }
  if (sessionInfo.get("expires") <= new Date().getTime()) {
    await destroySession(req, res, "expired");
    return {logged: false, data: {userData: {}}, report: "sessionExpired"}
  }

  // 1 read
  const docData = await initialisedDB.collection("data").doc(sessionInfo.get("dataRefID"))
                                     .get()

  if (!docData.exists) return {logged: false, data: {userData: {}}, report: "userNotFound"}

  return {
    status: true, data: {
      logged: true,
      expires: sessionInfo.get("expires"),
      userID: sessionInfo.get("userID"),
      userData: docData.data()
    }, report: "success"
  }
}

export const fetchSession = async (req, res, fingerprint) => {

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  //guard clauses
  if (!sessionID) return {logged: false, ID: {}}

  // 1 read
  const sessionInfo = await initialisedDB.collection("sessions").doc(sessionID).get()

  if (!sessionInfo.exists) return cookies.set("sessionID")
  if (sessionInfo.get("clientfp") !== fingerprint) return await destroySession(req, res, "fp_reject")
  if (sessionInfo.get("expires") <= new Date().getTime()) return await destroySession(req, res, "expired")

  return {
    logged: true,
    ID: {userID: sessionInfo.get("userID"), dataRefID: sessionInfo.get("dataRefID")}
  }
}