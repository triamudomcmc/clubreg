import LooseTypeObject from "@interfaces/LooseTypeObject";
import bcrypt from "bcryptjs"
import {generateExpireTime} from "@server/authentication/sharedFunction";
import Cookies from "cookies"

export const checkCredentials = async (stdID, password, fingerPrint, userCollection) => {
  if (stdID === "" || password === "") return {status: false, report: "invalid_credentials"}

  const userDB = await userCollection.where("stdID", "==", stdID).get()

  if (userDB.docs.length <= 0) return {status: false, report: "invalid_user"}

  const userDoc = userDB.docs[0]

  if (userDoc.get("safeMode") === true) {
    const auData = userDoc.data()
    if (!("authorised" in auData)) return {status: false, report: "notAuthorised"}
    const authorisedField: LooseTypeObject<{fingerPrint: string}> = auData.authorised
    if(!(Object.values(authorisedField).some(val => (val.fingerPrint === fingerPrint)))) return {status: false, report: "notAuthorised"}
  }
  //password checking guard clause
  if (!(await bcrypt.compare(password, userDoc.get("password")))) return {
    status: false, report: "invalid_password"
  }

  return {status: true, userDoc}
}

export const destroyActiveSessions = async (sessionsColl, userDoc) => {
  const activeSessions = await sessionsColl.where("userID","==",userDoc.id).get()
  activeSessions.forEach(doc => {
    doc.ref.delete()
  })
}

export const appendSession = async (sessionsColl, userDoc, fingerPrint, live ,req, res) => {
  const expires = generateExpireTime(live)

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
}
