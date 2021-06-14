import initialisedDB from "@server/firebase-admin";
import {destroySession} from "@server/authentication/destroySession";
import {announceTime} from "@config/time";

export const getSessionData = async (sessionID, cookies, req, res, fingerprint) => {

  const sessionData = await initialisedDB.collection("sessions").doc(sessionID).get()

  if (!sessionData.exists) {
    cookies.set("sessionID");
    return {status: false, data: {userData: {}}, report: "sessionError"}
  }

  if (sessionData.get("clientfp") !== fingerprint) {
    await destroySession(req, res, "fp_reject");
    return {status: false, data: {userData: {}}, report: "sessionRejected"}
  }

  if (sessionData.get("expires") <= new Date().getTime()) {
    await destroySession(req, res, "expired");
    return {status: false, data: {userData: {}}, report: "sessionExpired"}
  }

  return {status: true, sessionData}

}

export const getUserDataFromSessionData = async (sessionData) => {
  const docData = await initialisedDB.collection("data").doc(sessionData.get("dataRefID")).get()

  if (!docData.exists) return {status: false, data: {userData: {}}, report: "userNotFound"}

  const d = docData.data()
  let esc = {}

  Object.keys(d.audition).forEach(k => {
    return esc[k] = "waiting"
  })

  const hide = new Date().getTime() < announceTime

  const userData = {
    logged: true,
    expires: sessionData.get("expires"),
    userID: sessionData.get("userID"),
    userData: {...d, ...hide && {audition: esc}}
  }

  return {status: true, userData}
}