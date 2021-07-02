import LooseTypeObject from "@interfaces/LooseTypeObject";
import bcrypt from "bcryptjs"
import {generateExpireTime} from "@server/authentication/sharedFunction";
import Cookies from "cookies"
import sgMail from "@sendgrid/mail";
import initialiseDB from "@server/firebase-admin"
import {getUNIXTimeStamp} from "@config/time";

export const checkCredentials = async (stdID, password, fingerPrint, userCollection, req) => {
  if (stdID === "" || password === "") return {status: false, report: "invalid_credentials"}

  const userDB = await userCollection.where("stdID", "==", stdID).get()

  if (userDB.docs.length <= 0) return {status: false, report: "invalid_user"}

  const userDoc = userDB.docs[0]

  let verified = false

  if (req.body.verify !== "") {
    const task = await initialiseDB.collection("tasks").doc(req.body.verify).get()
    if (task.exists) {
      if (task.get("expire") > getUNIXTimeStamp() && task.get("userID") === userDoc.id){
        verified = true
      }
      await task.ref.delete()
    }
  }

  if (userDoc.get("safeMode") === true && !verified) {
    const auData = userDoc.data()
    if (!("authorised" in auData)) return {status: false, report: "notAuthorised"}
    const authorisedField: LooseTypeObject<{fingerPrint: string}> = auData.authorised
    if(!(Object.values(authorisedField).some(val => (val.fingerPrint === fingerPrint)))) {
      const task = await initialiseDB.collection("tasks").add({
        type: "bypass",
        expire: getUNIXTimeStamp() + ( 2 * 60 * 1000),
        userID: userDoc.id
      })

      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: auData["email"],
        from: {email: 'no-reply@triamudom.club', name: 'TUCMC Account'},
        subject: 'มีการ login จากอุปกรณ์ที่ไม่ได้รับอนุญาต',
        html: `คุณสามารถอนุญาติ browser นี้ได้ช่ั่วคราวได้ด้วยการกดลิงก์นี้ https://register.clubs.triamudom.ac.th/auth?verify=${task.id} \n ลิงก์นี้จะมีอายุ 2 นาที หากนี่ไม่ใช่คุณห้ามกดลิงก์นี้และควรเข้าไปเปลี่ยนรหัสผ่าน`,
      }

      await sgMail.send(msg)
      return {status: false, report: "notAuthorised"}
    }
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
    userID: userDoc.id, dataRefID: userDoc.get("dataRefID"), clientfp: fingerPrint, expires: expires, special: !!userDoc.get("admin")
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
