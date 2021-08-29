import {createTempAccUrlBridge} from "@init/dashboard";
import initialisedDB from "@server/firebase-admin";

export const createTempAccUrlAction = createTempAccUrlBridge.helper.createAction(async (ApiParams, parameters, ConditionParams) => {
  const taskCollection = initialisedDB.collection("temp-tasks")
  const expire = new Date().getTime() + (2 * 60 * 60 * 1000)
  const taskDoc = await taskCollection.add({
    type: "Attendance_Temporary_Access",
    expire: expire,
    targetTime: parameters.timestamp,
    club: parameters.club
  })

  return {status: true, report:"success", data: {accessUrl: `https://register.clubs.triamudom.ac.th/panel/attendance?access=${taskDoc.id}&route=${parameters.club}&targetTime=${parameters.timestamp}&expire=${expire}`}}
})
