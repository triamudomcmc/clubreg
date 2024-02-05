import { getAllAttendanceData } from "@init/evaluate"
import initialisedDB from "@server/firebase-admin"

export const getAllAttendance = getAllAttendanceData.helper.createAction(async (ApiParams, parameters) => {
  const checks = await initialisedDB.collection("attendance").get()

  const start = 1699203600000
  const end = 1707152399000

  const res = checks.docs
    .filter((doc) => (parseInt(doc.id) >= start && parseInt(doc.id) <= end))
    .map((data) => ({ date: data.id, data: data.get(parameters.panelID) }))

  return { status: true, report: "success", data: res }
})
