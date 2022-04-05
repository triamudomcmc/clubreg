import { checkInputs, updateClub } from "@server/userActions/regClub/functions"
import { generateCard, initData } from "@server/userActions/sharedFunctions"
import { fetchSession } from "@server/fetchers/session"
import { update } from "@server/tracker"
import initialisedDB from "@server/firebase-admin"
import { endLastRound, endRegClubTime, lastround } from "@config/time"

export const regClub = async (req, res) => {
  if (new Date().getTime() < lastround || new Date().getTime() >= endLastRound)
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
    const clubData = await updateClub(clubRef, req)

    if (clubData.audition && !req.body.oldClubConfirm) {
      if (new Date().getTime() > lastround) return { status: false, report: "denied" }
      // is audition and not confirm old club
      await dataRef.update("audition", { ...dataDoc.data().audition, ...{ [req.body.clubID]: "waiting" } })
    } else {
      if (req.body.oldClubConfirm) return { status: false, report: "denied" }

      // confirm or not audition
      const cardRef = await generateCard(dataDoc, clubData, req)
      const currentData = await initialisedDB.collection("data").doc(ID.dataRefID).get()

      if (currentData.get("club") !== "") {
        return { status: false, report: "in_club" }
      }
      if (Object.keys(currentData.get("audition") || {}).length <= 0) {
        return { status: false, report: "denied" }
      }

      await dataRef.update({ club: req.body.clubID, audition: {}, cardID: cardRef.id })
    }

    update(
      "system",
      `regClub-${req.body.oldClubConfirm ? "oc" : "nc"}-${clubData.audition ? "au" : "nu"}-${req.body.clubID}`,
      req.body.fp,
      userData.id
    )

    return { status: true, report: clubData.audition ? "success_audition" : "success_notAudition" }
  } catch (e) {
    return { status: false, report: e }
  }
}
