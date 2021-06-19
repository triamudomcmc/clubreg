import initialisedDB from "@server/firebase-admin";
import {getPrevMonday} from "@config/time";

export const performFetchFiles = async (req, ID) => {
  const files = await initialisedDB.collection("files").where("owner","==", req.body.panelID).get()
  const prevMon = getPrevMonday(new Date().getTime())

  const res = files.docs.filter(i => (i.get("timestamp") >= prevMon))

  return res.map(snap => (snap.data()))
}