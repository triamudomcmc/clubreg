import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"

export const checkPermissionFromRefID = async (dataRefID, req) => {
  const userDoc = await initialisedDB.collection("data").doc(dataRefID).get()
  if (!userDoc.get("panelID").includes(req.body.panelID)) return { status: false, report: "invalidPermission" }
  return { status: true, userData: userDoc.data() }
}

export const checkPermissionFromRefIDExclusive = async (dataRefID, req) => {
  const userDoc = await initialisedDB.collection("data").doc(dataRefID).get()
  const userData = userDoc.data()
  const clubID = req.body.panelID
  if (!userData.panelID.map(e => (e.split("_")[0])).includes(clubID) && !(clubID === "ก30920" && userData.panelID.map(e => (e.split("-")[0])).includes("ก30920"))) return { status: false, report: "invalidPermission" }
  return { status: true, userData: userDoc.data() }
}

export const executeWithPermission = async (req, res, callback: (req, res, ID) => any) => {
  const { logged, ID } = await fetchSession(req, res)
  if (!logged) return { status: false, report: "sessionError" }

  if (req.body.panelID === "") return { status: false, report: "unexpectd" }

  const checkPermResult = await checkPermissionFromRefID(ID.dataRefID, req)
  if (!checkPermResult.status) return checkPermResult

  const _ID: { userID: string; dataRefID: string; studentID: string } = {
    ...ID,
    studentID: checkPermResult.userData.student_id,
  }

  return await callback(req, res, _ID)
}
