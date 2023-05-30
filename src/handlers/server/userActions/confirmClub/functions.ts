import bcrypt from "bcryptjs"
import initialisedDB from "@server/firebase-admin"
import { DocumentReference } from "firebase-admin/lib/firestore"
import { generateCard } from "@server/userActions/sharedFunctions"

export const checkInputs = async (dataDoc, userData, req) => {
  if (!(req.body.clubID in dataDoc.get("audition")) || dataDoc.get("club") !== "")
    return { status: false, report: "not_audition" }
  if (dataDoc.get("audition")[req.body.clubID] !== "passed") return { status: false, report: "not_pass" }
  if (dataDoc.get("audition")[req.body.clubID] === "confirmed") return { status: false, report: "confirmed" }

  if (!(await bcrypt.compare(req.body.password, userData.get("password"))))
    return {
      status: false,
      report: "invalid_password",
    }
  return { status: true }
}

export const updateClub = async (clubRef: DocumentReference, req, dataRef, dataDoc) => {
  return await initialisedDB.runTransaction(async (t) => {
    const doc = await t.get(clubRef)
    // 1 read
    const data = doc.data()

    if (!data.audition) throw "invalid_club_type"
    if (data.new_count >= data.new_count_limit) throw "club_full"
    const newCount = data.new_count + 1

    const newAuditionData = await createNewAuditionData(dataDoc, req, clubRef, t)

    // 1 write
    t.set(clubRef, { new_count: newCount } , { merge: true })

    const cardRef = await generateCard(dataDoc, data, req)

    t.update(dataRef, { club: req.body.clubID, audition: newAuditionData, cardID: cardRef.id })
  })
}

export const createNewAuditionData = async (dataDoc, req, clubRef, t) => {
  const updatedItem = dataDoc.get("audition")
  const newAuditionData = {}

  for (let key of Object.keys(updatedItem)) {
    if (key === req.body.clubID) {
      newAuditionData[key] = "confirmed"
    } else {
      if (updatedItem[key] === "failed") {
        newAuditionData[key] = "failed"
      } else {
        if (updatedItem[key] === "passed") {
          const prevCall = await initialisedDB.collection("clubs").doc(key).get()
          const prevCount = prevCall.get("call_count") || 0
          await initialisedDB.collection("clubs").doc(key).update("call_count", prevCount + 1)
        }
        newAuditionData[key] = "rejected"
      }
    }
  }

  return newAuditionData
}
