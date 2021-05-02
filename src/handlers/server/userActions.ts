import initialisedDB from "@server/firebase-admin"
import {fetchSession} from "@server/fetchUser";
import bcrypt from "bcryptjs"
import {isEmpty} from "@utilities/object";

export const regClub = async (req, res) => {
  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  const dataRef = initialisedDB.collection("data").doc(ID.dataRefID)
  const dataDoc = await dataRef.get()
  if (dataDoc.get("club") !== "" || req.body.clubID in dataDoc.get("audition")) return {status: false, report: "in_club"}
  if (userData.get("phone") !== req.body.phone) return {status: false, report: "invalid_phone"}
  if (!(await bcrypt.compare(req.body.password, userData.get("password")))) return {
    status: false, report: "invalid_password"
  }


  const clubRef = initialisedDB.collection("clubs").doc(req.body.clubID)

  try {
    const isAu = await initialisedDB.runTransaction(async (t) => {
      const doc = await t.get(clubRef);
      const data = doc.data()
      if (!isEmpty(dataDoc.get("audition")) && !data.audition) throw "in_audition"
      if (data.new_count >= data.new_count_limit) throw "club_full"
      const newCount = data.new_count + 1
      t.update(clubRef, {new_count: newCount})
      return data.audition
    })

    await initialisedDB.runTransaction(async (t) => {
      const us = await t.get(dataRef);
      const usData = us.data()
      if (isAu) {
        console.log("call1")
        t.update(dataRef, "audition", {...usData.audition, ...{[req.body.clubID]: "waiting"}})
      }else{
        console.log("call")
        t.update(dataRef, "club", req.body.clubID)
      }
    })

    return {status: true, report: isAu ? "success_audition" : "success_notAudition"}
  }catch (e) {
    return {status: false, report: e}
  }

}