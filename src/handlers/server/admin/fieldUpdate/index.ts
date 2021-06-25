import {executeWithPermission, getUpdatedUser} from "@server/admin/sharedFunctions";
import initialisedDB from "@server/firebase-admin";
import {getUNIXTimeStamp} from "@config/time";

export const fieldUpdate = (req, res) => {

  return executeWithPermission(req, res, async (req ,res) => {

    let coll = "data"

    if (req.body.data.field === "email" || req.body.data.field === "phone") {
      coll = "users"
    }

    const prevData = await initialisedDB.collection(coll).doc(req.body.data.refID).get()

    const cache = await initialisedDB.collection("cache").add({
      collection: coll,
      refID: prevData.id,
      data: coll === "users" ? {email: prevData.get("email"), phone: prevData.get("phone")} : prevData.data(),
      timestamp: getUNIXTimeStamp()
    })

    await prevData.ref.update(req.body.data.field, req.body.data.data)

    const fetchLatest = await getUpdatedUser(coll, prevData.id)
    if (!fetchLatest.status) return fetchLatest

    return {status: true, report: "success", data: {cacheID: cache.id, updated: fetchLatest.data}}
  })

}