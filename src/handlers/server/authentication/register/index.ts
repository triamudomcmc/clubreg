import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {appendData, appendUser, checkCredentials} from "@server/authentication/register/functions";


export const register = async (req) => {

  //initialise collections
  const ref = initialisedDB.collection("ref"),
        userColl = initialisedDB.collection("users"),
        dataColl = initialisedDB.collection("data")

  const checkCredResult = await checkCredentials(userColl, req, ref)
  if (!checkCredResult.status) return checkCredResult

  const {refDB} = checkCredResult

  const userDoc = await appendUser(userColl,req, refDB, await appendData(dataColl, refDB))

  //update Tracker
  update("system", "register", req.body.fp, userDoc.id)

  return {status: true, report: "success"}

}