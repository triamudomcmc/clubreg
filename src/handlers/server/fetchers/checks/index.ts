import {executeWithPermission} from "@server/utilities/permission";
import {performBatchUpdatePositions} from "@server/panel/updatePosition/functions";
import initialisedDB from "@server/firebase-admin";
import {getPrevMonday} from "@config/time";

const performFetchChecks = async (req, res) => {
  let lastmonday = getPrevMonday()

  if (req.body.accessId) {
    const accessData = await initialisedDB.collection("temp-tasks").doc(req.body.accessId).get()
    if (accessData.get("expire") > new Date().getTime()) {
      lastmonday = accessData.get("targetTime")
    }else{
      accessData.ref.delete()
    }
  }

  const checks = await initialisedDB.collection("attendance").doc(lastmonday.toString()).get()

  if (checks.exists) {
    return {status: true, report: "success", data: checks.get(req.body.panelID)}
  }else{
    return {status: true, report: "success", data: {}}
  }

}

export const fetchChecks = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    return await performFetchChecks(req, res)
  })

}
