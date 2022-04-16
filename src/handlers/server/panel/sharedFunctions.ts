import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"

export const checkPermissionFromRefID = async (dataRefID, req) => {
  const userDoc = await initialisedDB.collection("data").doc(dataRefID).get()
  if (!userDoc.get("panelID").includes(req.body.panelID)) return { status: false, report: "invalidPermission" }
  return { status: true }
}

export const executeWithPermission = async (req, res, callback: (req, res, ID) => any) => {
  const { logged, ID } = await fetchSession(req, res)
  if (!logged) return { status: false, report: "sessionError" }

  if (req.body.panelID === "") return { status: false, report: "unexpectd" }

  const checkPermResult = await checkPermissionFromRefID(ID.dataRefID, req)
  if (!checkPermResult.status) return checkPermResult

  return await callback(req, res, ID)
}
