import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"
import speakeasy from "speakeasy"

const generate2FA = (stdID) => {
  const secretCode = speakeasy.generateSecret({
    name: `${process.env.APP_NAME} (${stdID})`,
  })

  return {
    otpauthUrl : secretCode.otpauth_url,
    base32: secretCode.base32,
  }
}

export const toggleSafeMode = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }
  if (typeof req.body.safeMode !== "boolean") return { status: false, report: "dataError" }

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  let FAData = null

  
  if (!userData.get("2FA")) {
    FAData = generate2FA(userData.get("stdID"))
    await userData.ref.update({"2FA": FAData})
  }else{
    FAData = userData.get("2FA")
  }

  await initialisedDB.collection("users").doc(ID.userID).update({ safeMode: req.body.safeMode })

  return { status: true, report: "success", data: FAData }
}
