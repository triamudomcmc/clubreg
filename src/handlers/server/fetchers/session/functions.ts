import initialisedDB from "@server/firebase-admin";
import {destroySession} from "@server/authentication/destroySession";

export const getAndCheckSessionValidity = async (cookies, req, res, sessionID) => {

  const sessionData = await initialisedDB.collection("sessions").doc(sessionID).get()

  if (!sessionData.exists) { cookies.set("sessionID"); return {logged: false, ID: {userID: null, dataRefID: null}} }
  if (sessionData.get("clientfp") !== req.body.fp) { await destroySession(req, res, "fp_reject"); return {logged: false, ID: {userID: null, dataRefID: null}} }
  if (sessionData.get("expires") <= new Date().getTime()) { await destroySession(req, res, "expired"); return {logged: false, ID: {userID: null, dataRefID: null}} }

  return {logged: true, sessionData}
}