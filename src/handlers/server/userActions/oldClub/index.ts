import { checkInputs, updateClub } from "@server/userActions/oldClub/functions"
import { generateCard, initData } from "@server/userActions/sharedFunctions"
import { fetchSession } from "@server/fetchers/session"
import { update } from "@server/tracker"
import initialisedDB from "@server/firebase-admin"
import { endLastRound, endOldClub, endRegClubTime, lastround, startOldClub } from "@config/time"

export const oldClub = async (req, res) => {
  if (!(new Date().getTime() < endOldClub && new Date().getTime() >= startOldClub))
    return { status: false, report: "exceeded_time_limit" }

  // Procedures
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }

  // DB init
  const { userData, dataRef, clubRef, dataDoc } = await initData(ID.userID, ID.dataRefID)

  // check inputs
  const checkInputResult = await checkInputs(dataDoc, userData, req, clubRef)
  if (!checkInputResult.status) return { status: false, report: checkInputResult.report }

  try {

    const doc = await clubRef.get()
    // 1 read
    const data = doc.get(req.body.clubID)

    const clubData = data

    // confirm or not audition
    const cardRef = await generateCard(dataDoc, clubData, req)
    const currentData = await initialisedDB.collection("data").doc(ID.dataRefID).get()

    if (currentData.get("club") !== "") {
      return { status: false, report: "in_club" }
    }

    if (currentData.get("old_club") !== req.body.clubID && currentData.get("old_club") !== "ก30921") {
      return { status: false, report: "not_old_club" }
    }

    await dataRef.update({ club: req.body.clubID, audition: {}, cardID: cardRef.id })

    await updateClub(clubRef, req)

    update("system", `regClub-${"oc"}-${clubData.audition ? "au" : "nu"}-${req.body.clubID}`, req.body.fp, userData.id)

    return { status: true, report: clubData.audition ? "success_audition" : "success_notAudition" }
  } catch (e) {
    return { status: false, report: e }
  }
}
