import {fetchSession} from "@server/fetchers/session";
import {batchUpdateTasks} from "@server/panel/submitPending/functions";
import {update} from "@server/tracker";

export const submitPending = async (req, res) => {

  const {logged, ID} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  update("system", `submitPending-${JSON.stringify(req.body.tasks)}`, req.body.fp, ID.userID)

  await batchUpdateTasks(req.body.tasks, req)

  return {status: true, report: "success"}
}