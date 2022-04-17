import { getEvaluationData } from "@init/evaluate"
import initialisedDB from "@server/firebase-admin"

export const getEvaluate = getEvaluationData.helper.createAction(async (ApiParams, parameters) => {
  const checks = await initialisedDB.collection("evaluate").doc(parameters.panelID).get()

  return { status: true, report: "success", data: checks.exists ? checks.data() : {} }
})
