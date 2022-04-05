import initialisedDB from "@server/firebase-admin"
import { update } from "@server/tracker"

export const performBatchUpdatePositions = async (req, ID) => {
  const tasks = req.body.tasks
  const batch = initialisedDB.batch()

  for (let item of tasks) {
    const ref = initialisedDB.collection("data").doc(item.dataRefID)
    batch.set(ref, { position: { [req.body.panelID]: item.position } }, { merge: true })
  }

  update("system", `batchUpdatePos-${JSON.stringify(req.body.tasks)}`, req.body.fp, ID.userID)

  await batch.commit()
}
