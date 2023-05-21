import {SignedPostPolicyV4Output, Storage} from "@google-cloud/storage"
import { getUNIXTimeStamp } from "@config/time"
import {
  executeWithPermission,
  executeWithPermissionEx,
  executeWithPermissionExclusive,
} from "@handlers/server/utilities/permission"
import initialisedDB from "@server/firebase-admin"

const upload = async (type: string, storage, tempFileName): Promise<SignedPostPolicyV4Output> => {

  const bucket = storage.bucket("clwimages")
  const file = bucket.file(tempFileName)

  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
  }

  const [response] = await file.generateSignedPostPolicyV4(options)

  return response
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
    const policies = []
    for (let k of Object.keys(images)) {
      if (images[k] !== null) {
        const tempFileName = `userUpload-${new Date().getTime()}-${Math.floor(Math.random() * 400)}`
        const res = await upload(images[k], storage, tempFileName)
        if (res) {
          policies.push({key: k, content: res})
          nim[k] = `https://storage.googleapis.com/clwimages/${tempFileName}`
        }
      }
    }

    let reviews = []

    let ind = 0
    for (let rev of req.body.reviews) {
      if (Object.keys(rev.profile).includes("type")) {
        const tempFileName = `userUpload-${new Date().getTime()}-${Math.floor(Math.random() * 400)}`
        const res = await upload(rev.profile, storage, tempFileName)
        policies.push({key: `review-${ind}`, content: res})
        reviews.push({ ...rev, profile: `https://storage.googleapis.com/clwimages/${tempFileName}` })
      } else {
        reviews.push(rev)
      }
      ind++
    }

    const clubDataDoc = await initialisedDB.collection("clubs").doc(req.body.panelID).get()
    const panelid: string = req.body.panelID
    let clubData = clubDataDoc.data()
    let pid = panelid

    if (!clubData) {
      clubData = clubDataDoc?.get(`${panelid}_1`)
      if (!clubData) {
        if (panelid.includes("ก30920")) {
          clubData = clubDataDoc?.get(`ก30920-1`)
          pid = "ก30920-1"
        }
      } else {
        pid = `${panelid}_1`
      }
    }

    const out = await clubDataDoc.ref.update({ [`${pid}.status`]: "pending" })

    const dat = await initialisedDB.collection("clubDisplayPending").doc(req.body.panelID).get()
    await initialisedDB
      .collection("clubDisplayPending")
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

    return policies
  } catch (error) {
    console.error(error)
    return null
  }
}

const main = async (req, ID) => {
  const status = await performUpload(req, ID)

  if (status) {
    return { status: true, report: "success", data: {policies: status} }
  } else {
    return { status: false, report: "unexpected_error" }
  }
}

export const submitChanges = async (req, res) => {
  return await executeWithPermissionExclusive(req, res, async (req, res, ID) => {
    return await main(req, ID)
  })
}
