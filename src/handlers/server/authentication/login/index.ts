import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {appendSession, checkCredentials, destroyActiveSessions} from "@server/authentication/login/functions";

export const login = async (stdID, password, live, fingerPrint, req, res) => {

  //initialise collections
  const userCollection = initialisedDB.collection("users"),
        sessionsColl = initialisedDB.collection("sessions")

  const checkCredResult = await checkCredentials(stdID,password,fingerPrint,userCollection)
  if(!checkCredResult.status) return checkCredResult

  const {userDoc} = checkCredResult

  // destroy all active session
  await destroyActiveSessions(sessionsColl, userDoc)

  await appendSession(sessionsColl, userDoc, fingerPrint, live, req, res)

  //update Tracker
  update("system", "login", fingerPrint, userDoc.id)

  return {status: true, report: "success"}

}