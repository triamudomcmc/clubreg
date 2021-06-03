import {getSessionID} from "@server/utilities/cookies";
import {getSessionData, getUserDataFromSessionData} from "@server/fetchers/user/functions";


export const fetchUser = async (req, res, fingerprint) => {

  const {sessionID, cookies} = getSessionID(req, res)
  if (!sessionID) return {status: false, data: {userData: {}}, report: "missingCookie"}

  const getSessionResult = await getSessionData(sessionID,cookies, req, res, fingerprint)
  if (!getSessionResult.status) return getSessionResult

  const getUserDataResult = await getUserDataFromSessionData(getSessionResult.sessionData)
  if (!getUserDataResult.status) return getUserDataResult

  const {userData} = getUserDataResult

  return {
    status: true, data: userData, report: "success"
  }
}