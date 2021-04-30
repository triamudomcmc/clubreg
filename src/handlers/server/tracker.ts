import initialiseDB from "./firebase-admin"

export const update = async (type: "click" | "system", context: string, fingerPrint: string | undefined, userID = null) => {
  const trackCol = initialiseDB.collection("track")
  await trackCol.add({fingerPrint: typeof fingerPrint !== "undefined" ? fingerPrint : null, userID: userID, type: type, context: context, timestamp: new Date().getTime()})
}