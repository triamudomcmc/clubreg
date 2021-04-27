import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "cookies"
import initialisedDB from "@server/firebase-admin"
import {destroySession} from "@server/authentication";


export const fetchUser = async (req, res, fingerprint) => {
  let result = { logged: false, userData: {} }


  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})
  if (sessionID) {
    const sessionInfo = await initialisedDB.collection("sessions").doc(sessionID).get()
    if(sessionInfo.exists) {
      if (sessionInfo.get("clientfp") == fingerprint) {
        if (sessionInfo.get("expires") > new Date().getTime()) {
          const docData = await initialisedDB.collection("users").doc(sessionInfo.get("userID"))
                                             .get()
          if (docData.exists) {
            result.logged = true
            result.userData = {email: docData.get("email"), username: docData.get("username"), stdID: docData.get("stdID"), prefix: docData.get("prefix"), firstname: docData.get("firstname"), lastname: docData.get("lastname"), room: docData.get("room"), number: docData.get("number")}
          }
        } else {
          //reject expired session
          await destroySession(req, res)
        }
      } else {
        //reject stolen session
        await destroySession(req, res)
      }
    }else{
      cookies.set("sessionID")
    }
  }

  return result
}