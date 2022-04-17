import initialisedDB from "@server/firebase-admin"
import { update } from "@server/tracker"
import { appendSession, checkCredentials, destroyActiveSessions } from "@server/authentication/login/functions"
import { generateCard } from "@server/userActions/sharedFunctions"

export const login = async (stdID, password, live, fingerPrint, req, res) => {
  //initialise collections
  const userCollection = initialisedDB.collection("users"),
    sessionsColl = initialisedDB.collection("sessions")

  const checkCredResult = await checkCredentials(stdID, password, fingerPrint, userCollection, req)
  if (!checkCredResult.status) return checkCredResult

  const { userDoc } = checkCredResult

  // destroy all active session
  await destroyActiveSessions(sessionsColl, userDoc)

  await appendSession(sessionsColl, userDoc, fingerPrint, live, req, res)

  const dataDoc = await initialisedDB.collection("data").doc(userDoc.get("dataRefID")).get()

  const clubID = dataDoc.get("club")

  if (dataDoc.get("club") !== "" && !dataDoc.get("cardID") && dataDoc.get("level") !== "9") {
    const data = await initialisedDB.collection("clubs").doc("mainData").get()
    const cardId = await generateCard(dataDoc, data.data()[clubID], { body: { clubID: clubID } })
    await initialisedDB.collection("data").doc(userDoc.get("dataRefID")).update("cardID", cardId.id)
  }

  //update Tracker
  update("system", "login", fingerPrint, userDoc.id)

  return { status: true, report: "success" }
}
