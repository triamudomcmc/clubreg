// functions
import * as functions from "firebase-functions"
// import db from "./firestore"
const admin = require("firebase-admin")
admin.initializeApp()

const db = admin.firestore()
const cors = require("cors")({ origin: true })

// export { tracker } from "./tracker"
export const tracker = functions.region("asia-southeast1").https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const resObj = {
      type: req.body.type,
      context: req.body.context,
      fingerPrint: typeof req.body.fp !== "undefined" ? req.body.fp : null,
      userID: req.body.userID,
      timeStamp: +new Date(),
    }

    functions.logger.info(JSON.stringify(resObj), { structuredData: true })

    await db.collection("track").add(resObj)

    res.json({})
  })
})
