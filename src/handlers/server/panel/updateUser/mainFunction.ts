import initialisedDB from "@server/firebase-admin"
import { moveFromNonReserve, moveToReserve, removeFromReserve } from "@server/panel/updateUser/functions"
import { update } from "@server/tracker"

export const updateUserAction = async (req, res, ID) => {
  const objectRefId = req.body.objectRefID

  const objectDoc = await initialisedDB.collection("data").doc(objectRefId).get()

  // if action is either passed or failed
  if (req.body.task.action === "passed" || req.body.task.action === "failed") {
    // if user is in reserved
    if (req.body.panelID in objectDoc.get("audition") && objectDoc.get("audition")[req.body.panelID] === "reserved") {
      await removeFromReserve(objectDoc, req, objectRefId)
      update("system", `moveFromReserve-${objectDoc.get("student_id")}`, req.body.fp, ID.userID)
      return { status: true, report: "success" }
    }

    if (req.body.task.action === "passed") {
      // check if passed is full
      const clubData = await initialisedDB.collection("clubs").doc(req.body.panelID).get()
      const currentClubLimit = clubData.data().new_count_limit
      const currentPassed = await initialisedDB
        .collection("data")
        .where(`audition.${req.body.panelID}`, "==", "passed")
        .get()

      if (currentPassed.size >= currentClubLimit) return { status: false, report: "quota_exceeded" }
    }

    await moveFromNonReserve(objectRefId, req)
    update("system", `moveFromNonReserve-${objectDoc.get("student_id")}`, req.body.fp, ID.userID)
    return { status: true, report: "success" }
  }

  await moveToReserve(objectDoc, objectRefId, req)
  update("system", `moveToReserve-${objectDoc.get("student_id")}`, req.body.fp, ID.userID)

  return { status: true, report: "success" }
}
