import {submitEval} from "@init/evaluate";
import initialisedDB from "@server/firebase-admin";

export const submitEvaluate = submitEval.helper.createAction(async (ApiParams, parameters) => {
  await initialisedDB.collection("evaluate").doc(parameters.panelID).set(parameters.data)
  return {status: true, report: "success"}
})
