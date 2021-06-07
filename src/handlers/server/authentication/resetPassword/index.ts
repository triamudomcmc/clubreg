import initialisedDB from "@server/firebase-admin";
import bcrypt from "bcryptjs"

export const resetPassword = async (req, res) => {

  if (req.password !== req.conPassword) return {status: false, report: "mismatch_password"}
  const doc = await initialisedDB.collection("tasks").doc(req.body.actionID).get()
  if (!doc.exists) return {status: false, report: "missing_email"}

  const hashedPass = await bcrypt.hash(req.body.password, 10)

  await initialisedDB.collection("users").doc(doc.get("userID")).update({password: hashedPass})

  return {status: true}
}