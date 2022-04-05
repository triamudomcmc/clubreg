import { fetchSession } from "@server/fetchers/session"
import { performDeleteDevice } from "@server/account/removeBrowser/functions"

export const removeBrowser = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }
  if (req.body.browserID === "") return { status: false, report: "dataError" }

  await performDeleteDevice(ID.userID, req)

  return { status: true, report: "success" }
}
