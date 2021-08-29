import {fetchSession} from "@server/fetchers/session";
import {performDeleteDevice} from "@actionBlocks/account/removeBrowser/functions";
import {ActionBlock} from "@lib/action/createAction";
import {removeBrowserContext} from "@handlers/init/account";

export const removeBrowserBlock = removeBrowserContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const {browserID} = parameters
  if (browserID === "") return {status: false, report: "dataError"}

  await performDeleteDevice(paramsFromCondition.userID, browserID)

  return {status: true, report: "success"}

})
