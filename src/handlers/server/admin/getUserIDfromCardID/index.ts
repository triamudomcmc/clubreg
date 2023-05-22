import { executeWithPermission } from "@server/admin/sharedFunctions"
import initialisedDB from "@server/firebase-admin"
import { getPrevMonday } from "@config/time"

export const getUserIDfromCardID = (req, res) => {
  return executeWithPermission(req, res, async (req, res) => {
    if (req.body.id.length == 20) {
      const dataRef = await initialisedDB.collection("data").where("cardID", "==", req.body.id).get()
      if (dataRef.empty) return { status: false, report: "invalid_cardID" }
      const data = await initialisedDB.collection("users").where("dataRefID", "==", dataRef.docs[0].id).get()
      if (data.empty) return { status: false, report: "invalid_cardID" }
      return { status: true, report: "success", data: { userID: data.docs[0].id, stdID: data.docs[0].get("stdID") } }
    } else {
      return { status: false, report: "invalid_cardID" }
    }
  })
}
