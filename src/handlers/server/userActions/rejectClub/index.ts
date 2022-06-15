import { initData } from "@server/userActions/sharedFunctions"
import { checkInputs } from "@server/userActions/rejectClub/functions"
import { fetchSession } from "@server/fetchers/session"
import { endAnnounceTime, lastround } from "@config/time"

export const rejectClub = async (req, res) => {
  if (new Date().getTime() > endAnnounceTime) return { status: false, report: "exceeded_time_limit" }

  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  // DB init
  const { userData, dataRef, dataDoc, clubRef } = await initData(ID.userID, ID.dataRefID)

  // check inputs
  const checkInputResult = await checkInputs(dataDoc, userData, req)
  if (!checkInputResult.status) return { status: false, report: checkInputResult.report }

  try {
    const updatedItem = dataDoc.get("audition")
    updatedItem[req.body.clubID] = "rejected"

    await dataRef.update({ audition: updatedItem })
    const prevCall = await clubRef.get()
    const prevCount = prevCall.get(req.body.clubID)["call_count"] || 0
    await clubRef.set({ [req.body.clubID]: { call_count: prevCount + 1 } }, { merge: true })

    return { status: true, report: "success" }
  } catch (e) {
    return { status: false, report: e }
  }
}
