import LooseTypeObject from "@interfaces/LooseTypeObject"
import bcrypt from "bcryptjs"
import { generateExpireTime } from "@server/authentication/sharedFunction"
import Cookies from "cookies"
import sgMail from "@sendgrid/mail"
import initialiseDB from "@server/firebase-admin"
import { getUNIXTimeStamp } from "@config/time"
import cryptoRandomString from "crypto-random-string"
const SibApiV3Sdk = require("sib-api-v3-sdk")
import speakeasy from "speakeasy"

const sendEmail = (email: string, code: string) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance

  const apiKey = defaultClient.authentications["api-key"]
  apiKey.apiKey = process.env.MAIL_KEY
  const api = new SibApiV3Sdk.TransactionalEmailsApi()
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail.sender = { name: "Triam Udom Clubs Registration System", email: "no-reply@triamudom.club" }
  sendSmtpEmail.to = [{ email: `${email}` }]
  sendSmtpEmail.subject = "มีการ login จากอุปกรณ์ที่ไม่ได้รับอนุญาต"
  sendSmtpEmail.htmlContent = `

  <!doctype html>
  <html lang="en-US">
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>มีการ login จากอุปกรณ์ที่ไม่ได้รับอนุญาต</title>
      <meta name="description" content="มีการ login จากอุปกรณ์ที่ไม่ได้รับอนุญาต">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:600; margin:0;font-size:32px;font-family:'Rubik',sans-serif;letter-spacing: 4px;">${code}</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#718096; font-size:15px;line-height:24px; margin:0;">
                                              โปรดนำรหัสนี้กรอกลงบนหน้าเว็บไซต์ เพื่อเป็นการยืนยันตัวตน Browser นี้ หากคุณไม่ได้เป็นผู้เข้าสู่ระบบแล้วพบข้อความนี้ขึ้นหลายครั้ง ทางเราแนะนำให้ทำการ<a href="https://register.clubs.triamudom.ac.th/auth?forgot">เปลี่ยนรหัสผ่าน</a>เพื่อความปลอดภัยของบัญชี
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"><strong>งานกิจกรรมพัฒนาผู้เรียน โรงเรียนเตรียมอุดมศึกษา</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
  </html>
  
`

  api.sendTransacEmail(sendSmtpEmail).then(
    function (data: any) {
      console.log("API called successfully. Returned data: " + data)
    },
    function (error: any) {
      console.error(error)
    }
  )
}

export const checkCredentials = async (stdID, password, fingerPrint, userCollection, req) => {
  if (stdID === "" || password === "") return { status: false, report: "invalid_credentials" }

  const userDB = await userCollection.where("stdID", "==", stdID).get()

  if (userDB.docs.length <= 0) return { status: false, report: "invalid_user" }

  const userDoc = userDB.docs[0]

  let verified = false

  if (req.body.verify && req.body.verify !== "") {
    const validated = speakeasy.totp.verify({
      secret: userDoc.get("2FA")["base32"],
      encoding: 'base32',
      token: req.body.code,
    })

    if (validated) {
      verified = true
    }else{
      return {status:false, report: "incorrectCode"}
    }
  }

  if (userDoc.get("safeMode") === true && !verified) {

    if (!userDoc.get("2FA")) {
      await userDoc.ref.update({safeMode: false})
      return { status: false, report: "disabled2FA", data: {  } }
    }

    const auData = userDoc.data()
    if (!("authorised" in auData)) return { status: false, report: "notAuthorised" }
    const authorisedField: LooseTypeObject<{ fingerPrint: string }> = auData.authorised
    if (!Object.values(authorisedField).some((val) => val.fingerPrint === fingerPrint)) {
      return { status: false, report: "notAuthorised", data: {  } }
    }
  }

  //password checking guard clause
  if (!(await bcrypt.compare(password, userDoc.get("password"))))
    return {
      status: false,
      report: "invalid_password",
    }

  return { status: true, userDoc }
}

export const destroyActiveSessions = async (sessionsColl, userDoc) => {
  const activeSessions = await sessionsColl.where("userID", "==", userDoc.id).get()
  activeSessions.forEach((doc) => {
    doc.ref.delete()
  })
}


export const appendSession = async (sessionsColl, userDoc, fingerPrint, remember, req, res) => {

  let live = 60 * 60 * 1000 // default - 1 hour session live span

  if (remember) {
    live = 4 * 60 * 60 * 1000 // not trusted client - 4 hour session live span
    
    if (userDoc.get("safeMode") === true) {
      const auData = userDoc.data()
      if (("authorised" in auData)) {
        const authorisedField: LooseTypeObject<{ fingerPrint: string }> = auData.authorised
        if (Object.values(authorisedField).some((val) => val.fingerPrint === fingerPrint)) {
          live = 6 * 30 * 24 * 60 * 60 * 1000 // trusted client - 6 months session live span
        }
      }
    }
  }

  const expires = generateExpireTime(live)

  //append session to db
  const sess = await sessionsColl.add({
    userID: userDoc.id,
    dataRefID: userDoc.get("dataRefID"),
    clientfp: fingerPrint,
    expires: expires,
    special: !!userDoc.get("admin") ? "admin" : userDoc.get("stdID").includes("ก") ? "teacher" : false,
  })

  //set session cookie
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] })
  cookies.set("sessionID", sess.id, {
    httpOnly: true,
    sameSite: "Strict",
    signed: true,
    expires: new Date(expires),
  })
}
