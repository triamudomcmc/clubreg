import {ActionBlock} from "@lib/action/createAction";
import {getPrevMonday} from "@config/time";
import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {attendanceData, sendDataContext} from "@handlers/init/attendance";

export const sendDataBlock = sendDataContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const {data, panelID} = parameters

  let lastmonday = getPrevMonday()

  if (parameters.accessId) {
    const accessData = await initialisedDB.collection("temp-tasks").doc(parameters.accessId).get()
    if (accessData.get("expire") > new Date().getTime()) {
      lastmonday = accessData.get("targetTime")
    }else{
      accessData.ref.delete()
    }
  }

  await initialisedDB.collection("attendance").doc(lastmonday.toString()).set({
    [panelID]: data
  }, {merge: true})

  update("system",`submitAttendanceData-${panelID}-${JSON.stringify(data)}`, APIParams.fingerPrint, paramsFromCondition.userID)

  return {status: true, report: "success"}
})
