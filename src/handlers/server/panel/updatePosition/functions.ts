import initialisedDB from "@server/firebase-admin";

export const performBatchUpdatePositions = async (req) => {
  const tasks = req.body.tasks
  const batch = initialisedDB.batch()

  for (let item of tasks) {
    const ref = initialisedDB.collection("data").doc(item.dataRefID)
    batch.set(ref, {position: {[req.body.panelID]:  item.position}}, {merge:true})
  }

  await batch.commit()
}
