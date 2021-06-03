import {fetchSession} from "@server/fetchers/session";
import {appendDeviceToDB, check, checkExistedBrowser, getUserData} from "@server/account/addBrowser/functions";

export const addBrowser = async (req, res) => {

  const {logged, ID} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  const {ua, clientIp, userData} = await getUserData(req, ID.userID)

  const checkBrowserExistedResult = await checkExistedBrowser(userData, req)
  if (!checkBrowserExistedResult.status) return checkBrowserExistedResult

  await appendDeviceToDB(req, ua, ID.userID, clientIp)

  return {status: true, report: "success"}

}