import { generateCard, initData } from "@server/userActions/sharedFunctions"
import { createNewAuditionData, updateClub, checkInputs } from "@server/userActions/confirmClub/functions"
import { fetchSession } from "@server/fetchers/session"
import { update } from "@server/tracker"
import { endAnnounceTime, endLastRound, lastround } from "@config/time"

export const confirmClub = async (req, res) => {
  if (new Date().getTime() > endAnnounceTime) return { status: false, report: "exceeded_time_limit" }

  // check session
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  // init DB
  const { userData, dataRef, clubRef, dataDoc } = await initData(ID.userID, ID.dataRefID)

  // check inputs
  const checkInputResult = await checkInputs(dataDoc, userData, req)
  if (!checkInputResult.status) return { status: false, report: checkInputResult.report }

  try {
    await updateClub(clubRef, req, dataRef, dataDoc)
 
    update("system", `confirmClub-${req.body.clubID}`, req.body.fp, userData.id)

    return { status: true, report: "success" }
  } catch (e) {
    return { status: false, report: e }
  }
}
