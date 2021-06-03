import {fetchSession} from "@server/fetchers/session";
import {batchUpdateTasks} from "@server/panel/submitPending/functions";

export const submitPending = async (req, res) => {

  const {logged} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  await batchUpdateTasks(req.body.tasks, req)

  return {status: true, report: "success"}
}