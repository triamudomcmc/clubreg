import bcrypt from "bcryptjs"
import initialisedDB from "@server/firebase-admin"
import { DocumentReference } from "firebase-admin/lib/firestore"
import { generateCard } from "@server/userActions/sharedFunctions"
import { update } from "@handlers/server/tracker"

export const checkInputs = async (dataDoc, userData, req, clubRef) => {

  // First check for request's club
  if (dataDoc.get("club") !== "") return { status: false, report: "in_club" }

  const clubData = await clubRef.get()

  // Check phone number and password for non-audition actions.
  if (!clubData.get(req.body.clubID).audition) {

    // if (userData.get("phone") !== req.body.phone) return { status: false, report: "invalid_phone" }

    if (!(await bcrypt.compare(req.body.password, userData.get("password"))))
      return {
        status: false,
        report: "invalid_password",
      }

  }

  return { status: true, report: "" }
}

export const updateClub = async (clubRef: DocumentReference, req: any, dataRef: DocumentReference, dataDoc: any, ID: any) => {
  return await initialisedDB.runTransaction(async (t) => {

    const doc = await t.get(clubRef)
    const data = doc.get(req.body.clubID)
    

    const clubData = data

    if (clubData.audition) {
      /* 
        Audition section
        --------------------
        Update user's audition list.
      */

      await dataRef.update("audition", { ...(dataDoc?.data()?.audition || {}), ...{ [req.body.clubID]: "waiting" } })

    } else {

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

      /* 
        Update club's data collection.
      */

      if (data.new_count >= data.new_count_limit) throw "club_full"
      const newCount = data.new_count + 1
      t.set(clubRef, { [req.body.clubID]: { new_count: newCount } }, { merge: true }) 


      /* 
        Generate card and update user's data
      */

      const cardRef = await generateCard(dataDoc, clubData, req)
      
      // if (Object.keys(currentData.get("audition") || {}).length <= 0) {
      //   return { status: false, report: "denied" }
      // }

      t.update(dataRef, { club: req.body.clubID, audition: {}, cardID: cardRef.id })
    }


    // Send update to tracker
    update(
      "system",
      `regClub-${req.body.oldClubConfirm ? "oc" : "nc"}-${clubData.audition ? "au" : "nu"}-${req.body.clubID}`,
      req.body.fp,
      ID.userID
    )

    return { status: true, report: clubData.audition ? "success_audition" : "success_notAudition" }
  })
}

