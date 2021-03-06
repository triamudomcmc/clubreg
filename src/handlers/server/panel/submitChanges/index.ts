import { Storage } from "@google-cloud/storage"
import { getUNIXTimeStamp } from "@config/time"
import {
  executeWithPermission,
  executeWithPermissionEx,
  executeWithPermissionExclusive,
} from "@handlers/server/utilities/permission"
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
    projectId: process.env.FCERT_PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  })

  const images = req.body.images
  const nim = {}

  try {
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

    const clubDataDoc = await initialisedDB.collection("clubs").doc("mainData").get()
    const panelid: string = req.body.panelID
    let clubData = clubDataDoc?.get(panelid)
    let pid = panelid

    if (!clubData) {
      clubData = clubDataDoc?.get(`${panelid}_1`)
      if (!clubData) {
        if (panelid.includes("???30920")) {
          clubData = clubDataDoc?.get(`???30920-1`)
          pid = "???30920-1"
        }
      } else {
        pid = `${panelid}_1`
      }
    }

    const out = await clubDataDoc.ref.update({ [`${pid}.status`]: "pending" })

    const dat = await initialisedDB.collection("clubDisplayPending").doc(req.body.panelID).get()
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
    const cDisplayRequestOut = await clubDisplayRequestDoc.create({
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

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const main = async (req, ID) => {
  const status = performUpload(req, ID)

  if (status) {
    return { status: true, report: "success", data: { url: "" } }
  } else {
    return { status: false, report: "unexpected_error" }
  }
}

export const submitChanges = async (req, res) => {
  return await executeWithPermissionExclusive(req, res, async (req, res, ID) => {
    return await main(req, ID)
  })
}
