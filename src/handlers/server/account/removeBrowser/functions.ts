import initialisedDB from "@server/firebase-admin"

export const performDeleteDevice = async (userID, req) => {
  const data = await initialisedDB.collection("users").doc(userID).get()
  const authorised = data.data().authorised
  delete authorised[req.body.browserID]
  await data.ref.update({ authorised: authorised })
}
