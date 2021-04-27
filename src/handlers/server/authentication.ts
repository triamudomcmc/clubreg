import initialisedDB from "@server/firebase-admin"
import * as argon2 from "argon2";
import Cookies from "cookies"
import cryptoRandomString from "crypto-random-string";

const sessionSize = 24

export const login = async (stdID, password, live, fingerPrint, req, res) => {
  let result = {status: false, report: ""}

  const userCollection = initialisedDB.collection("users")
  const sessionsColl = initialisedDB.collection("sessions")

  if(stdID !== "" && password !== ""){

    try {

      const userDB = await userCollection.where("stdID","==",stdID).get()
      if(userDB.docs.length > 0){
        const userDoc = userDB.docs[0]
        if (await argon2.verify(userDoc.get("password"), password)) {

          let sessionID = cryptoRandomString({length: sessionSize})
          let sessionDoc = await sessionsColl.doc(sessionID).get()

          while (sessionDoc.exists) {
            sessionID = cryptoRandomString({length: sessionSize})
            sessionDoc = await sessionsColl.doc(sessionID).get()
          }

          const expires = (new Date().getTime()) + live
          await sessionsColl.doc(sessionID).create({userID: userDoc.id, clientfp: fingerPrint,expires: expires})
          const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
          cookies.set('sessionID', sessionID, {
            httpOnly: true,
            sameSite: 'lax',
            signed: true,
            expires: new Date(expires)
          })

          result.status = true
          result.report = "success"
        }else{
          result.report = "invalidPass"
        }
      }else{
        result.report = "invalidID"
      }

    } catch (e) {
      console.log(e)
      result.report = "DBerror"
    }

  }

  return result

}

export const destroySession = async (req, res) => {
  let result = {status: false}

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})
  if(sessionID){
    cookies.set("sessionID")
    await initialisedDB.collection("sessions").doc(sessionID).delete()
    result.status = true
  }

  return result
}