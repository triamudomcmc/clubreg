import initialisedDB from "@server/firebase-admin";

export const checkPermissionFromRefID = async (dataRefID, req) => {
  const userDoc = await initialisedDB.collection("data").doc(dataRefID).get()
  if (!userDoc.get("panelID").includes(req.body.panelID)) return {status: false, report: "invalidPermission"}

  return {status: true, report: "validPermission"}
}