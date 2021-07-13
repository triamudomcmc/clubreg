import initialisedDB from "@server/firebase-admin";
import {fetchSession} from "@server/fetchers/session";
import {ActionBlock} from "@lib/action/createAction";

export const toggleSafeModeBlock: ActionBlock<{safeMode: boolean}> = async (APIParams, parameters, paramsFromCondition) => {

  const {safeMode} = parameters

  if (typeof safeMode !== "boolean") return {status: false, report: "dataError"}

  await initialisedDB.collection("users").doc(paramsFromCondition.userID).update({safeMode: safeMode})

  return {status: true, report: "success"}

}