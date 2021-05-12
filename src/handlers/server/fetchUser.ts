import Cookies from "cookies"
import initialisedDB from "@server/firebase-admin"
import {destroySession} from "@server/authentication";


export const fetchUser = async (req, res, fingerprint) => {

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  //guard clauses
  if (!sessionID) return {status: false, data: {userData: {}}, report: "missingCookie"}

  // 1 read
  const sessionInfo = await initialisedDB.collection("sessions").doc(sessionID).get()

  if (!sessionInfo.exists) {
    cookies.set("sessionID");
    return {status: false, data: {userData: {}}, report: "sessionError"}
  }
  if (sessionInfo.get("clientfp") !== fingerprint) {
    await destroySession(req, res, "fp_reject");
    return {status: false, data: {userData: {}}, report: "sessionRejected"}
  }
  if (sessionInfo.get("expires") <= new Date().getTime()) {
    await destroySession(req, res, "expired");
    return {status: false, data: {userData: {}}, report: "sessionExpired"}
  }

  // 1 read
  const docData = await initialisedDB.collection("data").doc(sessionInfo.get("dataRefID"))
                                     .get()

  if (!docData.exists) return {status: false, data: {userData: {}}, report: "userNotFound"}

  return {
    status: true, data: {
      logged: true,
      expires: sessionInfo.get("expires"),
      userID: sessionInfo.get("userID"),
      userData: docData.data()
    }, report: "success"
  }
}

export const fetchUserCredentials = async (req, res) => {
  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()

  const rawData = userData.get("authorised")
  const authorisedArr = rawData ? Object.keys(rawData).map(key => {
    return {...{id: key, browser: rawData[key].browser, os: rawData[key].os, device: rawData[key].device, cpu: rawData[key].cpu, ip: rawData[key].ip}, self: req.body.fingerPrint === key}
  }): []

  return {status: true, report: "success", data: {
    phone: userData.get("phone"),
      email: userData.get("email"),
      authorised: authorisedArr,
      safeMode: userData.get("safeMode")
    }}
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