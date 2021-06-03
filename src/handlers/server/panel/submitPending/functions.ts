import initialisedDB from "@server/firebase-admin";

export const batchUpdateTasks = async (tasks, req) => {
  const batch = initialisedDB.batch()

  for (let user of Object.keys(tasks)) {
    const ref = initialisedDB.collection("data").doc(user)
    if (tasks[user].action === "reserved") {
      batch.set(ref, {audition: {[req.body.panelID]: tasks[user].action}, position: {[req.body.panelID]:  tasks[user].pos}}, {merge:true})
    }else{
      batch.set(ref, {audition: {[req.body.panelID]: tasks[user].action}}, {merge:true})
    }
  }

  await batch.commit()
}
