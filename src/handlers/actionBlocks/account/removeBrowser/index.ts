import {fetchSession} from "@server/fetchers/session";
import {performDeleteDevice} from "@actionBlocks/account/removeBrowser/functions";
import {ActionBlock} from "@lib/action/createAction";

export const removeBrowserBlock: ActionBlock<{browserID: string}> = async (APIParams, parameters, paramsFromCondition) => {

  const {browserID} = parameters
  if (browserID === "") return {status: false, report: "dataError"}

  await performDeleteDevice(paramsFromCondition.ID.userID, browserID)

  return {status: true, report: "success"}

}