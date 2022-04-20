import { ClubDisplay } from "@interfaces/clubDisplay"
import initialisedDB from "@server/firebase-admin"
import bcrypt from "bcryptjs"
import { executeWithTUCMCPermission } from "@server/panel/sharedFunctions"
import { update } from "@handlers/server/tracker"

const changeClubDisplayStatusAction = async (req, res, ID): Promise<{ status: boolean; report?: string }> => {
  try {
    const userDoc = initialisedDB.collection("users").doc(ID.userID)
    const userOut = await userDoc.get()

    if (!userOut.exists) {
      return { status: false, report: "user_not_found" }
    }

    // password checking guard clause
    if (!(await bcrypt.compare(req.body.password, userOut.get("password"))))
      return {
        status: false,
        report: "invalid_password",
      }

    const clubDoc = await initialisedDB.collection("clubs").doc("mainData")
    const out = await clubDoc.update({ [`${req.body.clubID}.status`]: req.body.status })

    if (req.body.status === "declined") {
      const out2 = await clubDoc.update({ [`${req.body.clubID}.reason`]: req.body.reason })
    }

    await initialisedDB.collection("clubDisplayRequests").add({
      action: "evaluate",
      fp: req.body.fp,
      status: req.body.status,
      userID: ID.userID,
      studentID: ID.studentID,
      clubID: req.body.clubID,
      ...(req.body.reason && { reason: req.body.reason }),
    })

    update(
      "system",
      `changeClubDisplay-${req.body.clubID}-${req.body.status}-${req.body?.reason}`,
      req.body.fp,
      ID.userID
    )

    return { status: true, report: "success" }
  } catch (e: any) {
    return { status: false, report: e }
  }
}

export const changeClubDisplayStatus = async (req, res): Promise<{ status: boolean; report?: string }> => {
  // if (new Date().getTime() >= editDataTime) return { status: false, report: "exceeded_time_limit" }

  return await executeWithTUCMCPermission(req, res, changeClubDisplayStatusAction)
}
