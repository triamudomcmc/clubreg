import { getSessionID } from "@server/utilities/cookies"
import { getAndCheckSessionValidity } from "@server/fetchers/session/functions"

export const fetchSession = async (
  req,
  res
): Promise<{ logged: boolean; ID: { userID: string | null; dataRefID: string | null } }> => {
  const { sessionID, cookies } = getSessionID(req, res)
  if (!sessionID) return { logged: false, ID: { userID: null, dataRefID: null } }

  const inspectSessionResult = await getAndCheckSessionValidity(cookies, req, res, sessionID)
  if (!inspectSessionResult.logged) return { logged: inspectSessionResult.logged, ID: inspectSessionResult.ID }

  const { sessionData } = inspectSessionResult

  return { logged: true, ID: { userID: sessionData.get("userID"), dataRefID: sessionData.get("dataRefID") } }
}
