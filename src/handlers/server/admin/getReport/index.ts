import { executeWithPermission, getUpdatedUser } from "@server/admin/sharedFunctions"
import initialisedDB from "@server/firebase-admin"
import { getPrevMonday, getUNIXTimeStamp } from "@config/time"
import { clubMap } from "@config/clubMap"

export const getReport = (req, res) => {
  return executeWithPermission(req, res, async (req, res) => {
    const timestamp = req.body.ts.name.toString() || getPrevMonday()

    const data = await initialisedDB.collection("attendance").doc(timestamp).get()
    const temps = await initialisedDB.collection("temp-tasks").where("targetTime", "==", parseInt(timestamp)).get()

    let clubs = {}

    Object.keys(clubMap).forEach((id) => {
      clubs[id] = { checked: false }
    })

    Object.keys(data.data() || {}).forEach((id) => {
      clubs[id] = { ...clubs[id], checked: true }
    })

    temps.docs.forEach((taskData) => {
      if (taskData.get("expire") < new Date().getTime()) {
        taskData.ref.delete()
        return
      }

      clubs[taskData.get("club")] = {
        ...clubs[taskData.get("club")],
        expire: taskData.get("expire"),
        targetTime: taskData.get("targetTime"),
        id: taskData.id,
      }
    })

    return { status: true, report: "success", data: clubs }
  })
}
