import initialisedDB from "@server/firebase-admin";
import parser from "ua-parser-js"
import sgMail from "@sendgrid/mail";
import path from "path";
import fs from "fs";

const Reset = (actionID: string): string => {

  const dir = path.resolve('./public', "_template/resetsvg.html");
  const html = fs.readFileSync(dir)
  const actionURL = `https://register.clubs.triamudom.ac.th/auth/reset${actionID}`

  return html.toString().replace(/{{action_url}}/g, actionURL)
}

export const forgot = async (req, res) => {
  const user = await initialisedDB.collection("users").where("email","==", req.body.email).get()
  if (user.empty) return {status: false, report: "missing_email"}

  const action = await initialisedDB.collection("tasks").add({
    userID: user.docs[0].id,
    expire: new Date().getTime() + 60 * 60 * 1000
  })

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const ua = parser(req.headers["user-agent"])

  const msg = {
    to: req.body.email,
    from: {email: 'no-reply@triamudom.club', name: 'TUCMC Account'},
    subject: 'การขอเปลี่ยนรหัสผ่าน',
    html: Reset(action.id),
  }

  await sgMail.send(msg)

  return {status: true, report: "success"}
}