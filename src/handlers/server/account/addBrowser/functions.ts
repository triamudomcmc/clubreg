import initialisedDB from "@server/firebase-admin"
import requestIp from "request-ip"
import parser from "ua-parser-js"
import LooseTypeObject from "@interfaces/LooseTypeObject"
import cryptoRandomString from "crypto-random-string"

export const check = (data) => {
  return data === undefined ? "" : data
}

export const getUserData = async (req, userID) => {
  const ua = parser(req.headers["user-agent"])
  const clientIp = requestIp.getClientIp(req)

  const userDataRaw = await initialisedDB.collection("users").doc(userID).get()
  const userData = userDataRaw.data()

  return { ua, clientIp, userData }
}

export const checkExistedBrowser = async (userData, req) => {
  let match = false

  if ("authorised" in userData) {
    const authorisedObj: LooseTypeObject<{ fingerPrint: string }> = userData["authorised"]
    match = Object.values(authorisedObj).some((val) => val.fingerPrint === req.body.fp)
  }

  if (match) return { status: false, report: "browserExisted" }

  return { status: true }
}

export const appendDeviceToDB = async (req, ua, userID, clientIp) => {
  const randomDeviceID = cryptoRandomString({ length: 20 })

  await initialisedDB
    .collection("users")
    .doc(userID)
    .set(
      {
        authorised: {
          [randomDeviceID]: {
            fingerPrint: req.body.fp,
            browser: {
              name: check(ua.browser.name),
              version: check(ua.browser.version),
            },
            os: {
              name: check(ua.os.name),
              version: check(ua.os.version),
            },
            ip: clientIp,
            device: {
              vendor: check(ua.device.vendor),
              model: check(ua.device.model),
            },
            cpu: { architecture: check(ua.device.architecture) },
          },
        },
      },
      { merge: true }
    )
}
