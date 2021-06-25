import initialisedDB from "@server/firebase-admin";
import {fetchSession} from "@server/fetchers/session";

export const checkPermission = async (userID) => {
  const userDoc = await initialisedDB.collection("users").doc(userID).get()
  if (!userDoc.get("admin")) return {status: false, report: "invalidPermission"}

  return {status: true}
}

export const executeWithPermission = async (req, res, callback: (req, res, ID) => any) => {
  const {logged, ID} = await fetchSession(req, res)
  if (!logged) return {status: false, report: "sessionError"}

  const checkPermResult = await checkPermission(ID.userID)
  if (!checkPermResult.status) return checkPermResult

  return await callback(req, res, ID)
}

export const getUpdatedUser = async (collection, refID) => {
  const data = await initialisedDB.collection(collection).doc(refID).get()
  if (!data.exists) return {status: false, report: "invalid_refID"}

  let userDoc;

  if (collection === "users"){
    userDoc = await initialisedDB.collection("data").doc(data.get("dataRefID")).get()
  }else{
    const doc = await initialisedDB.collection("users").where("stdID","==", data.get("student_id")).get()
    userDoc = doc.docs[0]
  }

  if (userDoc.empty) return {status: false, report: "invalid_stdID"}
  return {status: true, report: "success", data: collection === "users" ? {...userDoc.data(), refID: userDoc.id, userID: data.id, email: data.get("email"), phone: data.get("phone")} : {...data.data(), refID: data.id, userID: userDoc.id, email: userDoc.get("email"), phone: userDoc.get("phone")}}
}