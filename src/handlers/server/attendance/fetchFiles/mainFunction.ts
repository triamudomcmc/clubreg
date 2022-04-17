import initialisedDB from "@server/firebase-admin"
import { getPrevMonday } from "@config/time"

export const performFetchFiles = async (req, ID) => {
  const files = await initialisedDB.collection("files").where("owner", "==", req.body.panelID).get()
  let prevMon = getPrevMonday()

  if (req.body.accessId) {
    const accessData = await initialisedDB.collection("temp-tasks").doc(req.body.accessId).get()
    if (accessData.get("expire") > new Date().getTime()) {
      prevMon = accessData.get("targetTime")
    } else {
      accessData.ref.delete()
    }
  }

  const res = files.docs.filter((i) => i.get("timestamp") >= prevMon)

  return res.map((snap) => ({ ...snap.data(), id: snap.id }))
}
