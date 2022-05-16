import bcrypt from "bcryptjs"
import initialisedDB from "@server/firebase-admin"
import { DocumentReference } from "firebase-admin/lib/firestore"

export const checkInputs = async (dataDoc, userData, req, clubRef) => {
  if (dataDoc.get("club") !== "") return { status: false, report: "in_club" }

  const clubData = await clubRef.get()

  if (!clubData.get(req.body.clubID).audition || req.body.oldClubConfirm) {
    if (userData.get("phone") !== req.body.phone) return { status: false, report: "invalid_phone" }
    if (!(await bcrypt.compare(req.body.password, userData.get("password"))))
      return {
        status: false,
        report: "invalid_password",
      }
  }

  return { status: true, report: "" }
}

export const updateClub = async (clubRef: DocumentReference, req) => {
  return await initialisedDB.runTransaction(async (t) => {
    const doc = await t.get(clubRef)
    // 1 read
    const data = doc.get(req.body.clubID)

    if (!req.body.oldClubConfirm) {
      // register new club
      if (data.audition) return data
      if (data.new_count >= data.new_count_limit) throw "club_full"
      const newCount = data.new_count + 1
      // 1 write
      t.set(clubRef, { [req.body.clubID]: { new_count: newCount } }, { merge: true })
    } else {
      // confirm old club
      if (data.old_count >= data.old_count_limit) throw "club_full"
      const newOCount = data.old_count + 1
      t.set(clubRef, { [req.body.clubID]: { old_count: newOCount } }, { merge: true })
    }

    return data
  })
}
