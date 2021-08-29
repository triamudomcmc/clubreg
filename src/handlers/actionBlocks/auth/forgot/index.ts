import initialisedDB from "@server/firebase-admin";
import sgMail from "@sendgrid/mail";
import {update} from "@server/tracker";
import {ActionBlock} from "@lib/action/createAction";
import {forgotContext} from "@handlers/init/auth";

export const forgotBlock = forgotContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const userID = paramsFromCondition.userID

  const action = await initialisedDB.collection("tasks").add({
    userID: userID,
    expire: new Date().getTime() + 60 * 60 * 1000
  })

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: parameters.email,
    from: {email: 'no-reply@triamudom.club', name: 'TUCMC Account'},
    subject: 'การขอเปลี่ยนรหัสผ่าน',
    text: `แก้ไขรหัสผ่านได้ที่ https://register.clubs.triamudom.ac.th/auth/reset${action.id}`
  }

  await sgMail.send(msg)

  update("system", "forgot", APIParams.fingerPrint, userID)

  return {status: true, report: "success"}
})
