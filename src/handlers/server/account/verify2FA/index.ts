import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"
import speakeasy from "speakeasy"

export const verify2FA = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  let FAData = null
  FAData = userData.get("2FA")

  if (!FAData) {
    return {status: false, report: "invalid"}
  }

  const validated = speakeasy.totp.verify({
    secret: FAData["base32"],
    encoding: 'base32',
    token: req.body.code,
  })

  if (!validated) {
    return {status: false, report: "invalidCode"}
  }

  userData.ref.update({"2FA.verified": true})



  return { status: true, report: "success"}
}
