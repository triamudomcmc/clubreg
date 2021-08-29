import {ActionBlock} from "@lib/action/createAction";
import {getPrevMonday} from "@config/time";
import initialisedDB from "@server/firebase-admin";
import {fetchChecksContext} from "@handlers/init/attendance";

export const fetchChecksBlock = fetchChecksContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {
  const lastmonday = getPrevMonday()

  const checks = await initialisedDB.collection("attendance").doc(lastmonday.toString()).get()

  if (checks.exists) {
    return {status: true, report: "success", data: checks.get(parameters.panelID)}
  }else{
    return {status: true, report: "success", data: {}}
  }
})
