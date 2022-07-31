import initialisedDB from "@server/firebase-admin"
import path from "path"
import fs from "fs"
import { update } from "@server/tracker"
const SibApiV3Sdk = require("sib-api-v3-sdk")

const Reset = (actionID: string): string => {
  const dir = path.resolve("./public", "_template/resetsvg.html")
  const html = fs.readFileSync(dir)
  const actionURL = `https://register.clubs.triamudom.ac.th/auth/reset${actionID}`

  return html.toString().replace(/{{action_url}}/g, actionURL)
}

export const forgot = async (req, res) => {
  const inputEmail: string = req.body.email || ""
  const user = await initialisedDB.collection("users").where("email", "==", inputEmail.toLowerCase()).get()

  if (user.empty) return { status: false, report: "missing_email" }

  const action = await initialisedDB.collection("tasks").add({
    userID: user.docs[0].id,
    expire: new Date().getTime() + 60 * 60 * 1000,
  })

  const url = `https://register.clubs.triamudom.ac.th/auth/reset${action.id}`

  const defaultClient = SibApiV3Sdk.ApiClient.instance

  const apiKey = defaultClient.authentications["api-key"]
  apiKey.apiKey = process.env.MAIL_KEY
  const api = new SibApiV3Sdk.TransactionalEmailsApi()
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail.sender = { name: "Triam Udom Clubs Registration System", email: "no-reply@triamudom.club" }
  sendSmtpEmail.to = [{ email: `${req.body.email}` }]
  sendSmtpEmail.subject = "มีการขอเปลี่ยนรหัสผ่าน"
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        * {
          font-family: "Prompt";
        }
      </style>
    </head>
    <body style="width: 100%; @import url(https://fonts.googleapis.com/css?family=Prompt:200,300,400,600&display=swap); font-family: 'Prompt', sans-serif;">
      <div style="margin: auto; width: 360px">
        <div
          style="
            min-width: 440px;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #f7fafc;
            padding: 46px 0 0 0;
          "
        >
          <h1 style="font-weight: bold; color: #4a5568; font-size: 28px; margin: 0; letter-spacing: -0.01em">
            นักเรียนได้แจ้งลืมรหัสผ่าน
          </h1>
          <p style="color: #4a5568; font-weight: 300; margin: 2px 0 0; letter-spacing: -0.025em">
            กรุณากดปุ่มด้านล่างเพื่อรีเซ็ตรหัสผ่านบัญชี
          </p>
          <a
            href="${url}"
            style="
              background-color: #f687b3;
              text-decoration: none;
              padding: 15px 90px;
              border-radius: 9999px;
              margin: 34px 0;
            "
          >
            <span style="font-weight: 200; color: white">รีเซ็ตรหัสผ่าน</span>
          </a>
          <div
            style="
              color: #4a5568;
              font-weight: 300;
              margin: 2px 0 0;
              padding: 0 60px;
              letter-spacing: -0.025em;
              text-align: center;
            "
          >
            <p style="margin: 0">
              ปุ่มนี้จะหมดอายุภายในเวลา 1 ชั่วโมง หากเลยเวลา ที่กำหนดแล้ว กรุณากลับไปที่หน้าเว็บไซต์
            </p>
            <p style="margin: 0">เพื่อดำเนินการส่งคำขอเปลี่ยนรหัสผ่านอีกครั้ง</p>
          </div>
          <div
            style="
              width: 100%;
              background: #edf2f7;
              color: #4a5568;
              font-weight: 300;
              margin: 32px 0 0;
              padding: 34px 0;
              letter-spacing: -0.025em;
              text-align: center;
            "
          >
            <p style="font-weight: 600; margin: 0">ขอแสดงความนับถือ</p>
            <p style="margin: 0">งานกิจกรรมพัฒนาผู้เรียน (กช.)</p>
          </div>
          <div
            style="
              width: 100%;
              background: #1a202c;
              color: #4a5568;
              font-weight: 300;
              padding: 10px 0px;
              letter-spacing: -0.025em;
              display: flex;
              justify-content: space-between;
            "
          >
            <div style="display: flex; align-items: center; padding: 0px 30px">
              <span style="color: white; font-size: 38px; font-weight: 600; border-width: 1px">กช.</span>
              <span style="width: 1.5px; background: white; margin-top: 2px; height: 22px; margin-left: 5px" />
              <div style="margin-left: 6px">
                <h1
                  style="
                    color: white;
                    font-size: 11px;
                    white-space: nowrap;
                    font-weight: 500;
                    margin: 0;
                    line-height: 10px;
                  "
                >
                  งานกิจกรรมพัฒนาผู้เรียน
                </h1>
                <h1 style="color: white; font-size: 11px; white-space: nowrap; font-weight: 300; margin: 0">
                  โรงเรียนเตรียมอุดมศึกษา
                </h1>
              </div>
            </div>
            <div style="display: flex; align-items: center; padding: 0px 30px">
              <a style="display: flex" href="https://www.facebook.com/triamudomclubs">
                <img style="margin-right: 12px" src="https://register.clubs.triamudom.ac.th/assets/fb.png" />
              </a>
              <a style="display: flex" href="https://instagram.com/tucmc_official">
                <img src="https://register.clubs.triamudom.ac.th/assets/ig.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
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

  const msg = {
    to: req.body.email,
    from: { email: "no-reply@triamudom.club", name: "TUCMC Account" },
    subject: "การขอเปลี่ยนรหัสผ่าน",
    text: `แก้ไขรหัสผ่านได้ที่ https://register.clubs.triamudom.ac.th/auth/reset${action.id}`,
  }

  update("system", "forgot", req.body.fp, user.docs[0].id)

  return { status: true, report: "success" }
}
