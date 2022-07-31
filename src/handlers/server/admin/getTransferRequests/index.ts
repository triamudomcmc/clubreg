import { executeWithPermission } from "@server/admin/sharedFunctions"
import initialisedDB from "@server/firebase-admin"

export const getTrandferRequests = (req, res) => {
  return executeWithPermission(req, res, async (req, res) => {
    const confirms = await initialisedDB.collection("confirmation-tasks").get()

    return { status: true, report: "success", data: confirms.docs.map((e) => e.data()) }
  })
}
