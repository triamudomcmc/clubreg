import initialisedDB from "@server/firebase-admin";
import {fetchSession} from "@server/fetchers/session";
import {ActionBlock} from "@lib/action/createAction";
import {toggleSafeModeContext} from "@handlers/init/account";

export const toggleSafeModeBlock = toggleSafeModeContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const {safeMode} = parameters

  if (typeof safeMode !== "boolean") return {status: false, report: "dataError"}

  await initialisedDB.collection("users").doc(paramsFromCondition.userID).update({safeMode: safeMode})

  return {status: true, report: "success"}

})
