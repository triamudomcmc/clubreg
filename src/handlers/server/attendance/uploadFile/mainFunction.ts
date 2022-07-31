import { Storage } from "@google-cloud/storage"
import initialisedDB from "@server/firebase-admin"
import { update } from "@server/tracker"

export const performUpload = async (req, ID) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  })

  const bucket = storage.bucket(process.env.BUCKET_NAME)
  const tempFileName = `${req.body.panelID}-${new Date().getTime()}`
  const file = bucket.file(tempFileName)

  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  }

  await initialisedDB.collection("files").add({
    timestamp: req.body.targetTime,
    owner: req.body.panelID,
    filename: decodeURI(req.body.file),
    bucketName: tempFileName,
  })

  const [response] = await file.generateSignedPostPolicyV4(options)

  update("system", `fileUpload-${tempFileName}`, req.body.fp, ID.userID)

  return response
}

export const upBucket = async (req, ID) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  })

  const bucket = storage.bucket("turn-in")
  const fname = `${req.body.id}/version-${new Date().getTime()}.pdf`
  const file = bucket.file(fname)

  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  }

  const [response] = await file.generateSignedPostPolicyV4(options)

  update("system", `docFileUpload-${fname}`, req.body.fp, ID.userID)

  return response
}
