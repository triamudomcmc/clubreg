import { fetchSession } from "@server/fetchers/session"
import { batchUpdateTasks } from "@server/panel/submitPending/functions"
import { update } from "@server/tracker"
import initialisedDB from "@server/firebase-admin"
import { editDataTime } from "@config/time"

export const submitPending = async (req, res) => {
  if (new Date().getTime() >= editDataTime) return { status: false, report: "exceeded_time_limit" }

  const { logged, ID } = await fetchSession(req, res)
  if (!logged) return { status: false, report: "sessionError" }

  if (req.body.tasks.length <= 0) return { status: false, report: "invalid_tasks" }

  // check if passed is full
  const clubData = await initialisedDB.collection("clubs").doc("mainData").get()
  const currentClubLimit = clubData.get(req.body.panelID).new_count_limit
  const currentPassed = await initialisedDB
    .collection("data")
    .where(`audition.${req.body.panelID}`, "==", "passed")
    .get()

  const tasksObject: Array<{ action: string; pos: number }> = Object.values(req.body.tasks)

  const batchSize = tasksObject.reduce((prev, iter) => {
    if (iter.action === "passed") {
      return prev + 1
    } else {
      return prev
    }
  }, 0)

  if (currentPassed.size + batchSize > currentClubLimit) return { status: false, report: "quota_exceeded" }

  update("system", `submitPending-${JSON.stringify(req.body.tasks)}`, req.body.fp, ID.userID)

  await batchUpdateTasks(req.body.tasks, req)

  return { status: true, report: "success" }
}
