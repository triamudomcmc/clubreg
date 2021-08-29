import {ActionBlock} from "@lib/action/createAction";
import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {deleteFileContext} from "@handlers/init/attendance";

export const deleteFileBlock = deleteFileContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {
  await initialisedDB.collection("files").doc(parameters.id).delete()
  update("system",`deleteFile-FID-${parameters.id}`, APIParams.fingerPrint, paramsFromCondition.userID)
  return {status: true, report: "success"}
})
