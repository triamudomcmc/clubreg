import {ActionBlock} from "@lib/action/createAction";
import initialisedDB from "@server/firebase-admin";
import {getPrevMonday} from "@config/time";
import {fetchFilesContext} from "@handlers/init/attendance";

export const fetchFilesBlock: ActionBlock<{panelID: string}> = fetchFilesContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {
  const files = await initialisedDB.collection("files").where("owner","==", parameters.panelID).get()
  let prevMon = getPrevMonday()

  if (parameters.accessId) {
    const accessData = await initialisedDB.collection("temp-tasks").doc(parameters.accessId).get()
    if (accessData.get("expire") > new Date().getTime()) {
      prevMon = accessData.get("targetTime")
    }else{
      accessData.ref.delete()
    }
  }

  const res = files.docs.filter(i => (i.get("timestamp") >= prevMon))
  const data = res.map(snap => ({...snap.data(), id: snap.id}))

  return {status: true, report: "success", data: data}
})
