import { checkInputs, updateClub } from "@server/userActions/oldClub/functions"
import { generateCard, initData } from "@server/userActions/sharedFunctions"
import { fetchSession } from "@server/fetchers/session"
import { update } from "@server/tracker"
import initialisedDB from "@server/firebase-admin"
import { endLastRound, endOldClub, endRegClubTime, lastround, startOldClub } from "@config/time"
import {DocumentData, DocumentReference} from "firebase-admin/lib/firestore"

export const oldClub = async (req, res) => {
  if (!(new Date().getTime() < endOldClub && new Date().getTime() >= startOldClub))
    return { status: false, report: "exceeded_time_limit" }

  // Procedures
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  // DB init
  const { userData, dataRef, clubRef, dataDoc } = await initData(ID.userID, ID.dataRefID,true, req.body.clubID)

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
