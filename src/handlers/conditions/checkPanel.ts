import {ConditionBlock} from "next-bridge";
import {fetchSession} from "@server/fetchers/session";
import initialisedDB from "@server/firebase-admin";

export const checkPanel: ConditionBlock<null> = async (req, res)=> {
  const session = await fetchSession(req, res)

  if (!session.logged) return {status: false, report: "error"}

  const userData = await initialisedDB.collection("data").doc(session.ID.dataRefID).get()

  if (!userData.get("panelID") || !userData.get("panelID").includes(req.body.panelID)) return {status: false, report: "invalid"}

  return {status: true, report: "valid", data: {userID: session.ID.userID, fp: req.body.fp}}
}
