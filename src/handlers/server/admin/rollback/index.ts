import { executeWithPermission, getUpdatedUser } from "@server/admin/sharedFunctions"
import initialisedDB from "@server/firebase-admin"

export const rollback = (req, res) => {
  return executeWithPermission(req, res, async (req, res) => {
    const cache = await initialisedDB.collection("cache").doc(req.body.cacheID).get()
    if (!cache.exists) return { status: false, report: "invalid_cacheID" }

    await initialisedDB.collection(cache.get("collection")).doc(cache.get("refID")).update(cache.get("data"))

    const fetchLatest = await getUpdatedUser(cache.get("collection"), cache.get("refID"))
    if (!fetchLatest.status) return fetchLatest

    await cache.ref.delete()
    return { status: true, report: "success", data: { updated: fetchLatest.data } }
  })
}
