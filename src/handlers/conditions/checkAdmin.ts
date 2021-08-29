import {ConditionBlock} from "next-bridge";
import {fetchSession} from "@server/fetchers/session";
import initialisedDB from "@server/firebase-admin";

const checkAdminFromUserID = async (userID, req) => {
  const userDoc = await initialisedDB.collection("users").doc(userID).get()
  if (!!!userDoc.get("admin")) return {status: false, report: "invalidPermission"}

  return {status: true, report: "validPermission"}
}

export const checkAdmin: ConditionBlock<null> = async (req, res)=> {
  const session = await fetchSession(req, res)

  if (!session.logged) return {status: false, report: "error"}

  const checkPermResult = await checkAdminFromUserID(session.ID.userID, req)
  if (!checkPermResult.status) return checkPermResult

  return {status: true, report: "valid"}
}
