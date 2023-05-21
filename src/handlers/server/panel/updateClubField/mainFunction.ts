import { update } from "@handlers/server/tracker"
import initialisedDB from "@server/firebase-admin"

export const updateClubFieldAction = async (req, res, ID) => {
  try {
    const clubDoc = initialisedDB.collection("clubs").doc(req.body.panelID)
    const out = await clubDoc.update({[req.body.field]: req.body.data.value})

    update(
      "system",
      `updaateField-${req.body.panelID}-${req.body.field}-${req.body.data.value}`,
      req.body.fp,
      ID.userID
    )
    
    return { status: true, report: "success" }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
