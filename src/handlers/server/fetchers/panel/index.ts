import { fetchSession } from "@server/fetchers/session"
import { getMembers, getUserDataFromRefID } from "@server/fetchers/panel/functions"

export const fetchPanel = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)
  if (!logged) return { status: false, report: "sessionError" }

  const getUserDataResult = await getUserDataFromRefID(ID.dataRefID, req)
  if (!getUserDataResult.status) return getUserDataResult

  const members = await getMembers(req)

  return { status: true, report: "success", data: members }
}
