
import {checkInputs, updateClub} from "@server/userActions/regClub/functions";
import {generateCard, initData} from "@server/userActions/sharedFunctions";
import {fetchSession} from "@server/fetchers/session";

export const regClub = async (req, res) => {

  // Procedures
  const {logged, ID} = await fetchSession(req,res)

  if (!logged) return {status: false, report: "sessionError"}

  // DB init
  const {userData, dataRef, clubRef, dataDoc} = await initData(ID.userID, ID.dataRefID)

  // check inputs
  const checkInputResult = await checkInputs(dataDoc, userData, req)
  if (!checkInputResult.status) return {status: false, report: checkInputResult.report}


  try {
    const clubData = await updateClub(clubRef, req)

    if (clubData.audition && !req.body.oldClubConfirm) {
      // is audition and not confirm old club
      await dataRef.update("audition", {...dataDoc.data().audition, ...{[req.body.clubID]: "waiting"}})
    }else{
      // confirm or not audition
      const cardRef = await generateCard(dataDoc, clubData, req)
      await dataRef.update({club: req.body.clubID, audition: {}, cardID: cardRef.id})
    }


    return {status: true, report: clubData.audition ? "success_audition" : "success_notAudition"}
  }catch (e) {
    return {status: false, report: e}
  }

}