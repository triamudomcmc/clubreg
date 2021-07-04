import {executeWithPermission, getUpdatedUser} from "@server/admin/sharedFunctions";
import initialisedDB from "@server/firebase-admin";
import {getPrevMonday, getUNIXTimeStamp} from "@config/time";

export const getReport = (req, res) => {

  return executeWithPermission(req, res, async (req ,res) => {

    const data = await initialisedDB.collection("attendance").doc(req.body.ts.name.toString() || getPrevMonday()).get()

    return {status: true, report: "success", data: Object.keys(data.data())}
  })

}