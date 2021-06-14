import bcrypt from "bcryptjs"
import initialisedDB from "@server/firebase-admin";
import {firestore} from "firebase-admin/lib/firestore";

export const checkInputs = async (dataDoc, userData, req) => {
  if (!(req.body.clubID in dataDoc.get("audition")) || dataDoc.get("club") !== "") return {status: false, report: "not_audition"}
  if (dataDoc.get("audition")[req.body.clubID] !== "passed") return {status: false, report: "not_pass"}
  if (userData.get("phone") !== req.body.phone) return {status: false, report: "invalid_phone"}
  if (!(await bcrypt.compare(req.body.password, userData.get("password")))) return {
    status: false, report: "invalid_password"
  }
  return {status: true}
}

export const updateClub = async (clubRef: firestore.DocumentReference, req) => {
  return await initialisedDB.runTransaction(async (t) => {
    const doc = await t.get(clubRef);
    // 1 read
    const data = doc.get(req.body.clubID)
    if (!data.audition) throw "invalid_club_type"
    if (data.new_count >= data.new_count_limit) throw "club_full"
    const newCount = data.new_count + 1

    // 1 write
    t.set(clubRef, {[req.body.clubID]: {new_count: newCount}}, {merge: true})
    return data
  })
}

export const createNewAuditionData = async (dataDoc, req, clubRef) => {

  const updatedItem = dataDoc.get("audition")
  const newAuditionData = {}

  for (let key of Object.keys(updatedItem)) {
    if (key === req.body.clubID) {
      newAuditionData[key] = "confirmed"
    }else{
      if (updatedItem[key] === "failed") {newAuditionData[key] = "failed"} else {
        if (updatedItem[key] === "passed") {
          const prevCall = await clubRef.get()
          const prevCount = prevCall.get("call_count") || 0
          await clubRef.set({[key]: {call_count: prevCount + 1}}, {merge: true})
        }
        newAuditionData[key] = "rejected"
      }
    }
  }

  return newAuditionData
}