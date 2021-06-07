import {generateCard, initData} from "@server/userActions/sharedFunctions";
import {createNewAuditionData, updateClub, checkInputs} from "@server/userActions/confirmClub/functions";
import {fetchSession} from "@server/fetchers/session";
import {update} from "@server/tracker";

export const confirmClub = async (req, res) => {

  // check session
  const {logged, ID} = await fetchSession(req,res)

  if (!logged) return {status: false, report: "sessionError"}


  // init DB
  const {userData, dataRef, clubRef, dataDoc} = await initData(ID.userID, ID.dataRefID)

  // check inputs
  const checkInputResult = await checkInputs(dataDoc, userData, req)
  if (!checkInputResult.status) return {status: false, report: checkInputResult.report}

  try {
    const clubData = await updateClub(clubRef, req)

    const newAuditionData = createNewAuditionData(dataDoc, req)

    const cardRef = await generateCard(dataDoc, clubData, req)

    await dataRef.update({club: req.body.clubID, audition: newAuditionData, cardID: cardRef.id})

    update("system", `confirmClub-${req.body.clubID}`, req.body.fp, userData.id)

    return {status: true, report: "success"}

  }catch (e) {
    return {status: false, report: e}
  }

}