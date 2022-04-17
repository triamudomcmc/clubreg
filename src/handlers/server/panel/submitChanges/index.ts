import { Storage } from "@google-cloud/storage"
import { getUNIXTimeStamp } from "@config/time"
import { executeWithPermission, executeWithPermissionEx } from "@handlers/server/utilities/permission"
import initialisedDB from "@server/firebase-admin"

const upload = async (image: string, storage, tempFileName) => {
  const base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, ""),
    mimeType = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1],
    imageBuffer = Buffer.from(base64EncodedImageString, "base64")

  const bucket = storage.bucket("clwimages")
  const file = bucket.file(tempFileName)

  const res = await file
    .save(imageBuffer, {
      metadata: { contentType: mimeType },
      public: true,
      validation: "md5",
    })
    .then(function (err) {
      if (err && err.length != 0) {
        console.error("The file is not saved", err)
        return false
      } else {
        return true
      }
    })

  return res
}

const performUpload = async (req) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID_R,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL_R,
      private_key: process.env.FCERT_PRIVATE_KEY_R.replace(/\\n/g, "\n"),
    },
  })

  const images = req.body.images
  const nim = {}

  for (let k of Object.keys(images)) {
    if (images[k] !== null) {
      const tempFileName = `userUpload-${new Date().getTime()}-${Math.floor(Math.random() * 400)}`
      const res = await upload(images[k], storage, tempFileName)
      if (res) {
        nim[k] = `https://storage.googleapis.com/clwimages/${tempFileName}`
      }
    }
  }

  const clubDataDoc = initialisedDB.collection("clubs").doc("mainData")
  const out = await clubDataDoc.update({ [`${req.body.panelID}.status`]: "pending" })

  await await initialisedDB.collection("clubDisplay").doc(req.body.panelID).set(
    {
      reviews: req.body.reviews,
      description: req.body.main,
      images: nim,
    },
    { merge: true }
  )

  return null
}

const main = async (req) => {
  performUpload(req)

  return { status: true, report: "success", data: { url: "" } }
}

export const submitChanges = async (req, res) => {
  return await executeWithPermission(req, res, async (req, res, ID) => {
    return await main(req)
  })
}
