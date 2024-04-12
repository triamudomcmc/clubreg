import { update } from "@handlers/server/tracker"
import initialisedDB from "@server/firebase-admin"
import { isEmpty } from "@utilities/object"
import bcrypt from "bcryptjs"

export const addClubCommitteeAction = async (req, res, ID) => {
  try {
    const userDoc = initialisedDB.collection("users").doc(ID.userID)
    const userOut = await userDoc.get()

    if (!userOut.exists) {
      return { status: false, report: "user_not_found" }
    }

    //password checking guard clause
    if (!(await bcrypt.compare(req.body.password, userOut.get("password"))))
      return {
        status: false,
        report: "invalid_password",
      }

    const studentDoc = initialisedDB.collection("data").where("student_id", "==", req.body.studentID)
    const studentOut = await studentDoc.get()

    if (studentOut.empty || studentOut.size === 0) {
      return { status: false, report: "student_not_found" }
    } else if (studentOut.size > 0 && ID.studentID === req.body.studentID) {
      return { status: false, report: "cannot_add_self" }
    }

    const studentData = await studentOut.docs[0].data()

    const clubDoc = initialisedDB.collection("clubs").doc(req.body.panelID)
    const clubOut = await clubDoc.get()

    const clubData = clubOut.data()

    if (isEmpty(clubData)) {
      return { status: false, report: "club_not_found" }
    }

    if (!clubData.hasOwnProperty("committees")) {
      await clubDoc.update({ committees: [req.body.studentID] })
    } else {
      if (clubData?.committees?.includes(req.body.studentID)) {
        return { status: false, report: "already_is_committee" }
      }

      await clubDoc.update({ committees: [...clubData.committees, req.body.studentID] })

      update(
        "system",
        `addCommittes-${req.body.panelID}-${req.body.studentID}`,
        req.body.fp,
        ID.userID
      )
    }

    return { status: true, report: "success" }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
