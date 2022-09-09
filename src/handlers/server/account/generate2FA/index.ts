import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"
import speakeasy from "speakeasy"

const generate2FAa = (stdID) => {
  const secretCode = speakeasy.generateSecret({
    name: `${process.env.APP_NAME} (${stdID})`,
  })

  return {
    otpauthUrl : secretCode.otpauth_url,
    base32: secretCode.base32,
  }
}

export const generate2FA = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  let FAData = null

  
  if (!userData.get("2FA")) {
    FAData = generate2FAa(userData.get("stdID"))
    await userData.ref.update({"2FA": FAData})
  }else{
    FAData = userData.get("2FA")
  }

  return { status: true, report: "success", data: FAData }
}
