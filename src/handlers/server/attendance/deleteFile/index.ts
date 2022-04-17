import { executeWithPermission } from "@server/utilities/permission"
import { performFetchFiles } from "@server/attendance/fetchFiles/mainFunction"
import initialisedDB from "@server/firebase-admin"
import { update } from "@server/tracker"

const main = async (req, ID) => {
  await initialisedDB.collection("files").doc(req.body.id).delete()
  update("system", `deleteFile-FID-${req.body.id}`, req.body.fp, ID.userID)
}

export const deleteFile = async (req, res) => {
  return await executeWithPermission(req, res, async (req, res, ID) => {
    const data = await main(req, ID)
    return { status: true, report: "success" }
  })
}
