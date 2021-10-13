import {fetchSession} from "@server/fetchers/session";
import {checkPermissionFromRefID} from "@server/panel/sharedFunctions";
import initialisedDB from "@server/firebase-admin";

export const executeWithPermission = async (req, res, callback: (req, res, ID) => any) => {
  const {logged, ID} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  if (req.body.panelID === "") return {status: false, report: "unexpectd"}

  const checkPermResult = await checkPermissionFromRefID(ID.dataRefID, req)
  if (!checkPermResult.status) return checkPermResult

  return await callback(req, res, ID)
}

export const executeWithPermissionEx = async (req, res, callback: (req, res, ID) => any) => {
  const {logged, ID} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  if (req.body.id === "") return {status: false, report: "unexpectd"}

  const checkPermResult = await checkStdId(ID.dataRefID, req)
  if (!checkPermResult.status) return checkPermResult

  return await callback(req, res, ID)
}

const checkStdId = async (dataRefID, req) => {
  const userDoc = await initialisedDB.collection("data").doc(dataRefID).get()
  if (req.body.id !== userDoc.get("student_id")) return {status: false, report: "invalidPermission"}

  return {status: true}
}
