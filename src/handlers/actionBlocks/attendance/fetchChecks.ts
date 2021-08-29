import {ActionBlock} from "@lib/action/createAction";
import {getPrevMonday} from "@config/time";
import initialisedDB from "@server/firebase-admin";
import {fetchChecksContext} from "@handlers/init/attendance";

export const fetchChecksBlock = fetchChecksContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {
  let lastmonday = getPrevMonday()

  if (parameters.accessId) {
    const accessData = await initialisedDB.collection("temp-tasks").doc(parameters.accessId).get()
    if (accessData.get("expire") > new Date().getTime()) {
      lastmonday = accessData.get("targetTime")
    }else{
      accessData.ref.delete()
    }
  }

  const checks = await initialisedDB.collection("attendance").doc(lastmonday.toString()).get()

  if (checks.exists) {
    return {status: true, report: "success", data: checks.get(parameters.panelID)}
  }else{
    return {status: true, report: "success", data: {}}
  }
})
