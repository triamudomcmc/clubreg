import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"

export const toggleSafeMode = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }
  if (typeof req.body.safeMode !== "boolean") return { status: false, report: "dataError" }

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()

  
  if (!userData.get("2FA")) {
    return { status: false, report: "no2FA"}
  }
  await initialisedDB.collection("users").doc(ID.userID).update({ safeMode: req.body.safeMode })

  return { status: true, report: "success"}
}
