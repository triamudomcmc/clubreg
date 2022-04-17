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

const performUpload = async (req, ID) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, "\n"),
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

  let reviews = []

  for (let rev of req.body.reviews) {
    if (rev.profile.includes("data:image")) {
      const tempFileName = `userUpload-${new Date().getTime()}-${Math.floor(Math.random() * 400)}`
      const res = await upload(rev.profile, storage, tempFileName)
      reviews.push({ ...rev, profile: `https://storage.googleapis.com/clwimages/${tempFileName}` })
    } else {
      reviews.push(rev)
    }
  }

  const clubDataDoc = initialisedDB.collection("clubs").doc("mainData")
  const out = await clubDataDoc.update({ [`${req.body.panelID}.status`]: "pending" })

  const dat = await initialisedDB.collection("clubDisplay").doc(req.body.panelID).get()
  await initialisedDB
    .collection("clubDisplay")
    .doc(req.body.panelID)
    .set(
      {
        ...req.body.contact,
        reviews: reviews,
        description: req.body.main,
        images: { ...(dat.get("images") || {}), ...nim },
      },
      { merge: true }
    )

  const clubDisplayRequestDoc = initialisedDB.collection("clubDisplayRequests").doc()
  const cDisplayRequestOut = clubDisplayRequestDoc.create({
    clubID: req.body.panelID,
    timeStamp: +new Date(),
    userID: ID.userID,
    data: {
      ...req.body.contact,
      reviews: reviews,
      description: req.body.main,
      images: { ...(dat.get("images") || {}), ...nim },
    },
  })

  return null
}

const main = async (req, ID) => {
  performUpload(req, ID)

  return { status: true, report: "success", data: { url: "" } }
}

export const submitChanges = async (req, res) => {
  return await executeWithPermission(req, res, async (req, res, ID) => {
    return await main(req, ID)
  })
}
