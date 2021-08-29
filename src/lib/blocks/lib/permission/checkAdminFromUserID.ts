import initialisedDB from "@server/firebase-admin";

export const checkAdminFromUserID = async (userID, req) => {
  const userDoc = await initialisedDB.collection("users").doc(userID).get()
  if (!!!userDoc.get("admin")) return {status: false, report: "invalidPermission"}

  return {status: true, report: "validPermission"}
}
