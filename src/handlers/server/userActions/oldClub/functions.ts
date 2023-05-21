import bcrypt from "bcryptjs"
import initialisedDB from "@server/firebase-admin"
import { DocumentReference } from "firebase-admin/lib/firestore"
import {generateCard} from "@server/userActions/sharedFunctions"
import {update} from "@server/tracker"

export const checkInputs = async (dataDoc, userData, req, clubRef) => {
  if (dataDoc.get("club") !== "") return { status: false, report: "in_club" }

  if (!(await bcrypt.compare(req.body.password, userData.get("password"))))
    return {
      status: false,
      report: "invalid_password",
    }

  return { status: true, report: "" }
}

export const updateClub = async (clubRef: DocumentReference, req: any, dataRef: DocumentReference, dataDoc: any, ID: any) => {
  return await initialisedDB.runTransaction(async (t) => {

    const doc = await t.get(clubRef)
    const data = doc.data()


    const clubData = data


      /*
        Not audition section
        --------------------
        Second check if the request was already in a certain club.
      */

      const currentData = await t.get(dataRef)

      if (typeof currentData.get("club") !== "string" ) {
        return {status:false, report: "unexpected"}
      }

      if (currentData.get("club") !== "") {
        return { status: false, report: "in_club" }
      }

      if (currentData.get("old_club") !== req.body.clubID) {
        return { status: false, report: "not_old_club" }
      }

      /*
        Update club's data collection.
      */

      if (data.old_count >= data.old_count_limit) throw "club_full"
      const updatedOldCount = data.old_count + 1
      t.set(clubRef, { old_count: updatedOldCount }, { merge: true })


      /*
        Generate card and update user's data
      */

      const cardRef = await generateCard(dataDoc, clubData, req)

      t.update(dataRef, { club: req.body.clubID, audition: {}, cardID: cardRef.id })


    update(
      "system",
      `regClub-oc-${clubData.audition ? "au" : "nu"}-${req.body.clubID}`,
      req.body.fp,
      ID.userID
    )

    return { status: true, report: "success" }
  })
}

