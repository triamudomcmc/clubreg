import { executeWithPermission } from "@server/admin/sharedFunctions"
import initialisedDB from "@server/firebase-admin"
import { getPrevMonday } from "@config/time"

export const getTrackingHistory = (req, res) => {
  return executeWithPermission(req, res, async (req, res) => {
    let data

    if (req.body.id.length == 5) {
      const userData = await initialisedDB.collection("users").where("stdID", "==", req.body.id).get()
      console.log(userData.docs[0].id)
      if (userData.empty) return { status: false, report: "invalid_stdID" }
      data = await initialisedDB.collection("track").where("userID", "==", userData.docs[0].id).get()
    } else {
      data = await initialisedDB.collection("track").where("userID", "==", req.body.id).get()
    }

    return { status: true, report: "success", data: data.docs.map((item) => item.data()) }
  })
}
