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


  const clubRef = initialisedDB.collection("clubs").doc("mainData")

  try {
    const clubData = await initialisedDB.runTransaction(async (t) => {
      const doc = await t.get(clubRef);
      const data = doc.get(req.body.clubID)
      if (data.new_count >= data.new_count_limit) throw "club_full"
      const newCount = data.new_count + 1
      t.set(clubRef, {[req.body.clubID]: {new_count: newCount}}, {merge:true})
      return data
    })

    if (clubData.audition) {
      await dataRef.update("audition", {...dataDoc.data().audition, ...{[req.body.clubID]: "waiting"}})
    }else{
      const cardRef = await initialisedDB.collection("cards").add({
        title: dataDoc.get("title"),
        firstname: dataDoc.get("firstname"),
        lastname: dataDoc.get("lastname"),
        room: dataDoc.get("room"),
        club: req.body.clubID,
        place: clubData.place,
        contact: clubData.contact ? clubData.contact : "",
        contact2: clubData.contact2 ? clubData.contact2 : "",
        contact3: clubData.contact3 ? clubData.contact3 : ""
      })

      await dataRef.update({club: req.body.clubID, audition: {}, cardID: cardRef.id})
    }



    return {status: true, report: clubData.audition ? "success_audition" : "success_notAudition"}
  }catch (e) {
    return {status: false, report: e}
  }

}

export const confirmClub = async (req, res) => {
  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  const dataRef = initialisedDB.collection("data").doc(ID.dataRefID)
  const dataDoc = await dataRef.get()
  if (!(req.body.clubID in dataDoc.get("audition")) || dataDoc.get("club") !== "") return {status: false, report: "not_audition"}
  if (dataDoc.get("audition")[req.body.clubID] !== "passed") return {status: false, report: "not_pass"}
  if (userData.get("phone") !== req.body.phone) return {status: false, report: "invalid_phone"}
  if (!(await bcrypt.compare(req.body.password, userData.get("password")))) return {
    status: false, report: "invalid_password"
  }


  const clubRef = initialisedDB.collection("clubs").doc("mainData")

  try {
    const clubData = await initialisedDB.runTransaction(async (t) => {
      const doc = await t.get(clubRef);
      const data = doc.get(req.body.clubID)
      if (!data.audition) throw "invalid_club_type"
      if (data.new_count >= data.new_count_limit) throw "club_full"
      const newCount = data.new_count + 1
      t.set(clubRef, {[req.body.clubID]: {new_count: newCount}}, {merge:true})
      return data
    })

    const updatedItem = dataDoc.get("audition")
    const newAuditionData = {}
    Object.keys(updatedItem).forEach((key) => {
      if (key === req.body.clubID) return newAuditionData[key] = "confirmed"
      if (updatedItem[key] === "failed") return newAuditionData[key] = "failed"
      newAuditionData[key] = "rejected"
    })

    const cardRef = await initialisedDB.collection("cards").add({
      title: dataDoc.get("title"),
      firstname: dataDoc.get("firstname"),
      lastname: dataDoc.get("lastname"),
      room: dataDoc.get("room"),
      club: req.body.clubID,
      place: clubData.place,
      contact: clubData.contact ? clubData.contact : "",
      contact2: clubData.contact2 ? clubData.contact2 : "",
      contact3: clubData.contact3 ? clubData.contact3 : ""
    })

    await dataRef.update({club: req.body.clubID, audition: newAuditionData, cardID: cardRef.id})


    return {status: true, report: "success"}
  }catch (e) {
    return {status: false, report: e}
  }

}

export const rejectClub = async (req, res) => {
  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}

  const userData = await initialisedDB.collection("users").doc(ID.userID).get()
  const dataRef = initialisedDB.collection("data").doc(ID.dataRefID)
  const dataDoc = await dataRef.get()
  if (!(req.body.clubID in dataDoc.get("audition")) || dataDoc.get("club") !== "") return {status: false, report: "not_audition"}
  if (dataDoc.get("audition")[req.body.clubID] !== "passed") return {status: false, report: "not_pass"}
  if (!(await bcrypt.compare(req.body.password, userData.get("password")))) return {
    status: false, report: "invalid_password"
  }

  try {

    const updatedItem = dataDoc.get("audition")
    updatedItem[req.body.clubID] = "rejected"

    await dataRef.update({audition: updatedItem})

    return {status: true, report: "success"}
  }catch (e) {
    return {status: false, report: e}
  }

}