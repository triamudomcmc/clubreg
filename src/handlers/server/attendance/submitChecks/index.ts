import {executeWithPermission} from "@server/utilities/permission";
import {performFetchFiles} from "@server/attendance/fetchFiles/mainFunction";
import {getPrevMonday} from "@config/time";
import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";

const performSubmitFetch = async (req, ID) => {
  let lastmonday = getPrevMonday()

  if (req.body.accessId) {
    const accessData = await initialisedDB.collection("temp-tasks").doc(req.body.accessId).get()
    if (accessData.get("expire") > new Date().getTime()) {
      lastmonday = accessData.get("targetTime")
    }else{
      accessData.ref.delete()
    }
  }

  await initialisedDB.collection("attendance").doc(lastmonday.toString()).set({
    [req.body.panelID]: req.body.data
  }, {merge: true})

  update("system",`submitAttendanceData-${req.body.panelID}-${JSON.stringify(req.body.data)}`, req.body.fp, ID.userID)
}

export const submitChecks = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    await performSubmitFetch(req, ID)
    return {status: true, report: "success"}
  })

}
