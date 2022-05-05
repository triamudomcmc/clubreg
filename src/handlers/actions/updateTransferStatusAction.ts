import { updateTransferStatusBridge } from "@init/transfer"
import initialisedDB from "@server/firebase-admin"
import { update } from "@server/tracker"
import { FieldValue } from "@google-cloud/firestore"

const removeFromUser = async (data, taskData) => {
  const from = await initialisedDB.collection("data").where("student_id", "==", data.from.id).get()
  if (from.docs.length < 1) return { status: false, report: "failed" }
  let panel = from.docs[0].get("panelID")
  panel = panel.filter((item) => item !== taskData.get("club"))
  if (panel.length <= 0) {
    panel = FieldValue.delete()
  }
  await from.docs[0].ref.update({ panelID: panel })
  return { status: true, report: "success" }
}

const addToUser = async (data, taskData) => {
  const to = await initialisedDB.collection("data").where("student_id", "==", data.to.id).get()
  if (to.docs.length < 1) return { status: false, report: "failed" }
  const panel: Array<string> = to.docs[0].get("panelID") || []
  panel.push(taskData.get("club"))
  await to.docs[0].ref.update({ panelID: panel })
  return { status: true, report: "success" }
}

export const updateTransferStatusAction = updateTransferStatusBridge.helper.createAction(
  async (ApiParams, parameters, ConditionParams) => {
    if (parameters.transactionId) {
      if (parameters.status === "accept" || parameters.status === "reject") {
        if (parameters.status === "accept") {
          const taskData = await initialisedDB.collection("confirmation-tasks").doc(parameters.transactionId).get()
          const data = taskData.get("data")
          const resR = await removeFromUser(data, taskData)
          if (!resR.status) return resR
          const resA = await addToUser(data, taskData)
          if (!resA.status) return resA
        }
        await initialisedDB
          .collection("confirmation-tasks")
          .doc(parameters.transactionId)
          .update({ status: parameters.status })
        update(
          "system",
          `update-transfer-status-id-${parameters.transactionId}`,
          ConditionParams.fp,
          ConditionParams.userID
        )
      }
    }
    return { status: true, report: "success" }
  }
)
