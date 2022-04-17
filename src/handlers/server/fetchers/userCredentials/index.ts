import { getUserCredentialsFromID } from "@server/fetchers/userCredentials/functions"
import { fetchSession } from "@server/fetchers/session"

export const fetchUserCredentials = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)
  if (!logged) return { status: false, report: "sessionError" }

  const { userCredentials } = await getUserCredentialsFromID(ID.userID, req)

  return { status: true, report: "success", data: userCredentials }
}
