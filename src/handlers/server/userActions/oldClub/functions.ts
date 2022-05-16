import bcrypt from "bcryptjs"
import initialisedDB from "@server/firebase-admin"
import { DocumentReference } from "firebase-admin/lib/firestore"

export const checkInputs = async (dataDoc, userData, req, clubRef) => {
  if (dataDoc.get("club") !== "") return { status: false, report: "in_club" }

  if (!(await bcrypt.compare(req.body.password, userData.get("password"))))
    return {
      status: false,
      report: "invalid_password",
    }

  return { status: true, report: "" }
}

export const updateClub = async (clubRef: DocumentReference, req) => {
  return await initialisedDB.runTransaction(async (t) => {
    const doc = await t.get(clubRef)
    // 1 read
    const data = doc.get(req.body.clubID)
    const newOCount = data.old_count + 1

    // confirm old club
    if (data.old_count < data.old_count_limit) {
      await t.update(clubRef, { [req.body.clubID]: { old_count: newOCount } })

      return data
    } else {
      throw "club_full"
    }
  })
}
