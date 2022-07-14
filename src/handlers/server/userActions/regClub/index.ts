import { checkInputs, updateClub } from "@server/userActions/regClub/functions"
import { generateCard, initData } from "@server/userActions/sharedFunctions"
import { fetchSession } from "@server/fetchers/session"
import { update } from "@server/tracker"
import initialisedDB from "@server/firebase-admin"
import { endLastRound, endRegClubTime, lastround, openTime } from "@config/time"
import { DocumentData, DocumentReference } from "firebase-admin/firestore"

export const regClub = async (req, res) => {

  if (new Date().getTime() < openTime)
    return { status: false, report: "exceeded_time_limit" }

  // Check session validity
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  // DB init
  const { userData, dataRef, clubRef, dataDoc } = await initData(ID.userID, ID.dataRefID)

  // check inputs
  const checkInputResult = await checkInputs(dataDoc, userData, req, clubRef)
  if (!checkInputResult.status) return { status: false, report: checkInputResult.report }

  try {
    // Perform all actions in a single transaction.

    const clubData = await updateClub(<DocumentReference<DocumentData>>clubRef, req, dataRef, dataDoc, ID)

    return clubData

  } catch (e) {

    const error = <{code:number}> e

    // Listen for concurrent related rejections.

    if (error.code == 10) {
      return { status: false, report: "concurrent" }
    }

    return { status: false, report: e }
  }
}
