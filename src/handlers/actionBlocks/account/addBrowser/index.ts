import {fetchSession} from "@server/fetchers/session";
import {appendDeviceToDB, check, checkExistedBrowser, getUserData} from "@actionBlocks/account/addBrowser/functions";
import {ActionBlock} from "@lib/action/createAction";

export const addBrowserBlock: ActionBlock<{}> = async (APIParams, parameters, paramsFromCondition) => {

  const {ua, clientIp, userData} = await getUserData(APIParams.req, paramsFromCondition.userID)

  if (!userData.beta?.includes("privacyOps")) {
    return {status: false, report: "betaError"}
  }

  const checkBrowserExistedResult = await checkExistedBrowser(userData, APIParams.fingerPrint)
  if (!checkBrowserExistedResult.status) return checkBrowserExistedResult

  await appendDeviceToDB(APIParams.fingerPrint, ua, paramsFromCondition.userID, clientIp)

  return {status: true, report: "success"}

}