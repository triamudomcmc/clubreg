import parser from "ua-parser-js"
import {fetchSession} from "@server/fetchUser";
import initialisedDB from "@server/firebase-admin";
import requestIp from "request-ip"
import cryptoRandomString from "crypto-random-string";
import {isEmpty} from "@utilities/object";
import LooseTypeObject from "../../interfaces/LooseTypeObject";

const check = (data) => {
  return data === undefined ? "" : data
}

export const addBrowser = async (req, res) => {

  const {logged, ID} = await fetchSession(req, res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}

  const ua = parser(req.headers["user-agent"])
  const clientIp = requestIp.getClientIp(req);

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  const usObj = userData.data()
  let match = false

  if ("authorised" in usObj) {
    const authorisedObj: LooseTypeObject<{fingerPrint: string}> = usObj["authorised"]
    match = Object.values(authorisedObj).some(val => (val.fingerPrint === req.body.fingerPrint))
  }

  if (match) return {status: false, report: "browserExisted"}

  const randomDeviceID = cryptoRandomString({length: 20})

  await initialisedDB.collection("users").doc(ID.userID).set({
    authorised: {[randomDeviceID]: {
      fingerPrint: req.body.fingerPrint,
        browser: {
          name: check(ua.browser.name),
          version: check(ua.browser.version)
        },
        os: {
          name: check(ua.os.name),
          version: check(ua.os.version)
        },
        ip: clientIp,
        device: {
          vendor: check(ua.device.vendor),
          model: check(ua.device.model)
        },
        cpu: {architecture: check(ua.device.architecture)}
      }}
  }, {merge: true})

  return {status: true, report: "success"}

}

export const toggleSafeMode = async (req, res) => {

  const {logged, ID} = await fetchSession(req, res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}
  if (typeof req.body.safeMode !== "boolean")return {status: false, report: "dataError"}

  await initialisedDB.collection("users").doc(ID.userID).update({safeMode: req.body.safeMode})

  return {status: true, report: "success"}

}

export const removeBrowser = async (req, res) => {

  const {logged, ID} = await fetchSession(req, res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}
  if (req.body.browserID === "") return {status: false, report: "dataError"}

  const data = await initialisedDB.collection("users").doc(ID.userID).get()
  const authorised = data.data().authorised
  delete authorised[req.body.browserID]
  await data.ref.update({authorised: authorised})

  return {status: true, report: "success"}

}