import admin, { storage } from "firebase-admin"
import firebaseCert from "../../config/firebaseCert"

const initStorage = (): storage.Storage => {
  try {
    return admin.storage()
  } catch {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseCert),
    })
    return admin.storage()
  }
}

export default initStorage()
