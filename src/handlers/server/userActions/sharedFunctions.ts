import initialisedDB from "@server/firebase-admin"
import { initCollections } from "@server/utilities/database"

export const generateCard = async (dataDoc, clubData, req) => {
  return await initialisedDB.collection("cards").add({
    title: dataDoc.get("title"),
    firstname: dataDoc.get("firstname"),
    lastname: dataDoc.get("lastname"),
    room: dataDoc.get("room"),
    club: req.body.clubID,
    place: clubData.place,
    message: clubData.message,
    contact: clubData.contact ? clubData.contact : "",
    contact2: clubData.contact2 ? clubData.contact2 : "",
    contact3: clubData.contact3 ? clubData.contact3 : "",
  })
}

export const initData = async (userID, dataRefID, clubData = true, clubID: string = null) => {
  const collections = initCollections(
    clubData
      ? [
          { coll: "users", doc: userID },
          { coll: "data", doc: dataRefID },
          { coll: "clubs", doc: clubID },
        ]
      : [
          { coll: "users", doc: userID },
          { coll: "data", doc: dataRefID },
        ]
  )
  const userData = await collections[0].get(),
    dataRef = await collections[1],
    clubRef = clubData ? collections[2] : null
  const dataDoc = await dataRef.get()

  return { userData, dataRef, clubRef, dataDoc }
}
