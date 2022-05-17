import initialisedDB from "@server/firebase-admin"
import path from "path"
import fs from "fs"
import { update } from "@server/tracker"
const SibApiV3Sdk = require('sib-api-v3-sdk')

const Reset = (actionID: string): string => {
  const dir = path.resolve("./public", "_template/resetsvg.html")
  const html = fs.readFileSync(dir)
  const actionURL = `https://register.clubs.triamudom.ac.th/auth/reset${actionID}`

  return html.toString().replace(/{{action_url}}/g, actionURL)
}

export const forgot = async (req, res) => {

const inputEmail: string = (req.body.email || "")
  const user = await initialisedDB
    .collection("users")
    .where("email", "==", inputEmail.toLowerCase())
    .get()

  if (user.empty) return { status: false, report: "missing_email" }

  const action = await initialisedDB.collection("tasks").add({
    userID: user.docs[0].id,
    expire: new Date().getTime() + 60 * 60 * 1000,
  })


  const url = `https://register.clubs.triamudom.ac.th/auth/reset${action.id}`

  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.MAIL_KEY
  const api = new SibApiV3Sdk.TransactionalEmailsApi()
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = {name: "Triam Udom Clubs Registration System", email: "no-reply@triamudom.club"}
  sendSmtpEmail.to = [{email: `${req.body.email}`}]
  sendSmtpEmail.subject = "มีการขอเปลี่ยนรหัสผ่าน"
  sendSmtpEmail.htmlContent = `
  <!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>เปลี่ยนรหัสผ่าน</title>
    <meta name="description" content="เปลี่ยนรหัสผ่าน">
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
                                        <h1 style="color:#1e1e2d; font-weight:600; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">มีคำขอแก้ไขรหัสผ่าน</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#718096; font-size:15px;line-height:24px; margin:0;">
                                            บัญชีของคุณมีคำขอในการแก้ไขรหัสผ่าน หากต้องการดำเนินการต่อกดที่ด้านล่างช้อความนี้เพื่อดำเนินการในขั้นต่อไป คำขอนี้จะมีอายุ 1 ชั่วโมง
                                        </p>
                                        <a href="${url}"
                                            style="background:#f687b3;text-decoration:none !important; font-weight:600; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">เปลี่ยนรหัสผ่าน</a>
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

api.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
    console.log('API called successfully. Returned data: ' + data);
  }, function(error: any) {
    console.error(error);
  });

  const msg = {
    to: req.body.email,
    from: { email: "no-reply@triamudom.club", name: "TUCMC Account" },
    subject: "การขอเปลี่ยนรหัสผ่าน",
    text: `แก้ไขรหัสผ่านได้ที่ https://register.clubs.triamudom.ac.th/auth/reset${action.id}`,
  }

  update("system", "forgot", req.body.fp, user.docs[0].id)

  return { status: true, report: "success" }
}

// export const forgot = async (req, res) => {
//   const user = await initialisedDB
//     .collection("users")
//     .where("email", "==", req.body.email || "")
//     .get()

//   if (user.empty) return { status: false, report: "missing_email" }

//   const action = await initialisedDB.collection("tasks").add({
//     userID: user.docs[0].id,
//     expire: new Date().getTime() + 60 * 60 * 1000,
//   })

//   // sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//   // const ua = parser(req.headers["user-agent"])

//   // const msg = {
//   //   to: req.body.email,
//   //   from: { email: "no-reply@triamudom.club", name: "TUCMC Account" },
//   //   subject: "การขอเปลี่ยนรหัสผ่าน",
//   //   text: `แก้ไขรหัสผ่านได้ที่ https://register.clubs.triamudom.ac.th/auth/reset${action.id}`,
//   // }

//   // await sgMail.send(msg)

//   update("system", "forgot", req.body.fp, user.docs[0].id)

//   return {
//     status: true,
//     report: "success",
//     data: { redirect: `https://register.clubs.triamudom.ac.th/auth/reset${action.id}` },
//   }
// }
