import {submitEval} from "@init/evaluate";
import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";

export const submitEvaluate = submitEval.helper.createAction(async (ApiParams, parameters, cond) => {
  await initialisedDB.collection("evaluate").doc(parameters.panelID).set(parameters.data)
  update("system", `evaluate-${parameters.panelID}-${JSON.stringify(parameters.data)}`, ApiParams.req.body.fp, cond.userID)
  return {status: true, report: "success"}
})
