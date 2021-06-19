import {fetchSession} from "@server/fetchers/session";
import {checkPermissionFromRefID} from "@server/panel/sharedFunctions";

export const executeWithPermission = async (req, res, callback: (req, res, ID) => any) => {
  const {logged, ID} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  if (req.body.panelID === "") return {status: false, report: "unexpectd"}

  const checkPermResult = await checkPermissionFromRefID(ID.dataRefID, req)
  if (!checkPermResult.status) return checkPermResult

  return await callback(req, res, ID)
}