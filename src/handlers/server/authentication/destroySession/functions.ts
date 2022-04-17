import initialisedDB from "@server/firebase-admin"

export const destroyClientSession = async (cookies, sessionID) => {
  try {
    //destroy cookie and remove session from db
    cookies.set("sessionID")
    const doc = initialisedDB.collection("sessions").doc(sessionID)
    const data = await doc.get()
    await doc.delete()

    return { status: true, data }
  } catch (e) {
    return { status: false, report: e }
  }
}
