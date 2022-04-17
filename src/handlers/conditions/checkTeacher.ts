import { ConditionBlock } from "next-bridge"
import { fetchSession } from "@server/fetchers/session"
import initialisedDB from "@server/firebase-admin"

export const checkTranferActionSubmit: ConditionBlock<null> = async (req, res) => {
  const session = await fetchSession(req, res)

  if (!session.logged) return { status: false, report: "error" }

  const transferData = await initialisedDB.collection("confirmation-tasks").doc(req.body.transactionId).get()

  if (transferData.get("target") !== session.ID.userID) return { status: false, report: "invalid" }

  return { status: true, report: "valid", data: { userID: session.ID.userID, fp: req.body.fp } }
}
