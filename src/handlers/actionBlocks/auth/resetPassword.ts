import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {ActionBlock} from "@lib/action/createAction";
import bcrypt from "bcryptjs"

export const resetPasswordBlock: ActionBlock<{password: string, conPassword: string, actionID: string}> = async (APIParams, parameters) => {

  const {password, conPassword, actionID} = parameters

  if (password !== conPassword) return {status: false, report: "mismatch_password"}
  const doc = await initialisedDB.collection("tasks").doc(actionID).get()
  if (!doc.exists) return {status: false, report: "missing_email"}

  const hashedPass = await bcrypt.hash(password, 10)

  await initialisedDB.collection("users").doc(doc.get("userID")).update({password: hashedPass})

  await doc.ref.delete()
  update("system", "reset_password", APIParams.fingerPrint, doc.get("userID"))

  return {status: true, report: "success"}
}