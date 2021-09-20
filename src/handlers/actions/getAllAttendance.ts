import {getAllAttendanceData} from "@init/evaluate";
import initialisedDB from "@server/firebase-admin";

export const getAllAttendance = getAllAttendanceData.helper.createAction(async (ApiParams, parameters) => {

  const checks = await initialisedDB.collection("attendance").get()

  const res = checks.docs.map((data) => ({date: data.id, data: data.get(parameters.panelID)}))

  return {status: true, report: "success", data: res}
})
