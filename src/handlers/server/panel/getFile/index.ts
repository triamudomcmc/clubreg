import { executeWithPermission, executeWithPermissionEx } from "@server/utilities/permission"
import { Storage } from "@google-cloud/storage"
import initialisedDB from "@server/firebase-admin"
import { performFetchFiles } from "@server/attendance/fetchFiles/mainFunction"
import { request } from "http"
import { getUNIXTimeStamp } from "@config/time"

const main = async (req) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  })

  const myBucket = storage.bucket("clubs-docs")

  const file = myBucket.file(`${req.body.id}.pdf`)

  const url = await file.getSignedUrl({
    action: "read",
    expires: getUNIXTimeStamp() + 5 * 60 * 1000,
  })

  return { status: true, report: "success", data: { url: url || "" } }
}

export const getFile = async (req, res) => {
  return await executeWithPermissionEx(req, res, async (req, res, ID) => {
    return await main(req)
  })
}
