import {executeWithPermission} from "@server/admin/sharedFunctions";
import initialisedDB from "@server/firebase-admin";

export const query = (req, res) => {

  return executeWithPermission(req, res, async (req ,res) => {

    const data = await initialisedDB.collection("data").where(req.body.query.field, req.body.query.operator, req.body.query.context).get()
    if (data.empty) return {status: false, report: "not_found"}

    let merged = []

    for (let obj of data.docs) {
      const userData = await initialisedDB.collection("users").where("stdID","==",obj.get("student_id")).get()
      if (!userData.empty) {
        merged.push({...obj.data(), email: userData.docs[0].get("email"), phone: userData.docs[0].get("phone"), refID: obj.id, userID: userData.docs[0].id})
      }
    }

    return {status: true, report: "success", data: merged}
  })

}