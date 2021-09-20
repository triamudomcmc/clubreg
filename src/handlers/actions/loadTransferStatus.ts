import {loadTransferStatusBridge} from "@init/transfer";
import initialisedDB from "@server/firebase-admin";

export const loadTransferStatus = loadTransferStatusBridge.helper.createAction(async (ApiParams, parameters, ConditionParams) => {

  const transferData = await initialisedDB.collection("confirmation-tasks").where("club","==", parameters.panelID).get()

  return {status:true, report: "success", data: transferData.docs.map((data) => (data.data()))}
})
