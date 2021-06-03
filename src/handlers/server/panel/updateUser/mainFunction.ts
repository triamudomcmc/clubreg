import initialisedDB from "@server/firebase-admin";
import {moveFromNonReserve, moveToReserve, removeFromReserve} from "@server/panel/updateUser/functions";

export const updateUserAction = async (req, res) => {
  const objectRefId = req.body.objectRefID

  const objectDoc = await initialisedDB.collection("data").doc(objectRefId).get()

  // if action is either passed or failed
  if (req.body.task.action === "passed" || req.body.task.action === "failed") {

    // if user is in reserved
    if (req.body.panelID in objectDoc.get("audition") && objectDoc.get("audition")[req.body.panelID] === "reserved") {
      await removeFromReserve(objectDoc, req, objectRefId)
      return {status: true, report: "success"}
    }

    await moveFromNonReserve(objectRefId, req)
    return {status: true, report: "success"}
  }

  await moveToReserve(objectDoc, objectRefId, req)


  return {status: true, report: "success"}
}