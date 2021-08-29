import {ConditionBlock} from "../action/createAction";
import {fetchSession} from "./lib/session";
import {checkPermissionFromRefID} from "./lib/permission/checkPermissionFromRefID";
import initialisedDB from "@server/firebase-admin";
import {checkAdminFromUserID} from "@lib/blocks/lib/permission/checkAdminFromUserID";

const checkSession: ConditionBlock<null> = async (req,res) => {
  const sessionData = await fetchSession(req, res)

  if (!sessionData.logged) return {status: false, report: "not_authenticated"}
  return {status: true, report: "authenticated", data: sessionData.ID}
}

const checkPanel: ConditionBlock<null> = async (req, res, data) => {

  const session = await checkSession(req, res)

  if (!session.status) return session

  const checkPermResult = await checkPermissionFromRefID(session.data.dataRefID, req)
  if (!checkPermResult.status) return checkPermResult

  return {status: true, report: "authenticated", data: session.data}
}

const checkEmail: ConditionBlock<null> = async (req, res) => {
  const user = await initialisedDB.collection("users").where("email","==", (req.body.email || "").toLowerCase()).get()
  if (user.empty) return {status: false, report: "missing_email"}
  return {status: true, report: "authenticated", data: {userID: user.docs[0].id}}
}

const checkAdmin: ConditionBlock<null> = async (req, res) => {
  const session = await checkSession(req, res)

  if (!session.status) return session

  const checkPermResult = await checkAdminFromUserID(session.data.userID, req)
  if (!checkPermResult.status) return checkPermResult

  return {status: true, report: "valid"}
}

export const conditionBlocks = {
  checkSession,
  checkPanel,
  checkEmail,
  checkAdmin
}
