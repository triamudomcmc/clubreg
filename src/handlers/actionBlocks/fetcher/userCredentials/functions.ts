import initialisedDB from "@server/firebase-admin";

export const getUserCredentialsFromID = async (userID, fingerPrint) => {
  const userData = await initialisedDB.collection("users").doc(userID).get()

  const rawData = userData.get("authorised")
  const authorisedArr = rawData ? Object.keys(rawData).map(key => {
    return {...{id: key, browser: rawData[key].browser, os: rawData[key].os, device: rawData[key].device, cpu: rawData[key].cpu, ip: rawData[key].ip}, self:  fingerPrint === rawData[key].fingerPrint}
  }): []

  const userCredentials = {
    phone: userData.get("phone"),
    email: userData.get("email"),
    authorised: authorisedArr,
    safeMode: userData.get("safeMode"),
    beta: userData.get("beta") || []
  }

  return { userCredentials }
}