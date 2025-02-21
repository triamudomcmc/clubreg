import { getAllAttendanceData } from "@init/evaluate"
import initialisedDB from "@server/firebase-admin"

export const getAllAttendance = getAllAttendanceData.helper.createAction(async (ApiParams, parameters) => {
  const checks = await initialisedDB.collection("attendance").get()

  const start = new Date('2024-10-28T00:00:00.00').getTime()
  const end = new Date('2025-02-03T00:00:00.00').getTime()

  const res = checks.docs
    .filter((doc) => (parseInt(doc.id) >= start && parseInt(doc.id) <= end))
    .map((data) => ({ date: data.id, data: data.get(parameters.panelID) }))

  return { status: true, report: "success", data: res }
})
