import initialisedDB from "@server/firebase-admin"

export const initCollections = (data: Array<{ coll: string; doc: string }>) => {
  return data.map((item) => {
    return initialisedDB.collection(item.coll).doc(item.doc)
  })
}
