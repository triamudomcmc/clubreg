import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {appendData, appendUser, checkCredentials} from "./functions";
import {ActionBlock} from "@lib/action/createAction";
import {RegisterParamsType} from "../../../init/auth";


export const registerBlock: ActionBlock<RegisterParamsType> = async (APIParams, parameters) => {

  const {fingerPrint} = APIParams

  //initialise collections
  const ref = initialisedDB.collection("ref"),
        userColl = initialisedDB.collection("users"),
        dataColl = initialisedDB.collection("data")

  const checkCredResult = await checkCredentials(userColl, parameters, ref)
  if (!checkCredResult.status) return checkCredResult

  const {refDB} = checkCredResult.data

  const userDoc = await appendUser(userColl, parameters, refDB, await appendData(dataColl, refDB, parameters.stdID))

  //update Tracker
  update("system", "register", fingerPrint, userDoc.id)

  return {status: true, report: "success"}

}