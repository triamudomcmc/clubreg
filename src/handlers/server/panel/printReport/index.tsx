import { executeWithPermission } from "../sharedFunctions"
import initialisedDB from "@server/firebase-admin"
import { async } from "crypto-random-string"

export const printReport = async (req, res) => {
  return await executeWithPermission(req, res, async (req, res) => {
    const doc = await initialisedDB.collection("printReport").add({
      data: JSON.stringify(req.body.data),
      meta: req.body.meta,
    })

    return { status: true, report: "", data: { path: doc.id } }
  })
}
