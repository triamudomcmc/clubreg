import {executeWithPermission} from "@server/utilities/permission";
import { Storage } from '@google-cloud/storage';
import initialisedDB from "@server/firebase-admin";
import {performFetchFiles} from "@server/attendance/fetchFiles/mainFunction";
import {request} from "http";
import {getUNIXTimeStamp} from "@config/time";

const main = async (req, ID) => {

  const fileData = await initialisedDB.collection("files").doc(req.body.fileID).get()

  if (!fileData.exists) return {status: false, report: "fileNotExist"}

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
  });

  const myBucket = storage.bucket(process.env.BUCKET_NAME)

  const file = myBucket.file(`${fileData.get("bucketName")}`);

  const url = await file.getSignedUrl({
    action: 'read',
    expires: getUNIXTimeStamp() + (5 * 60 * 1000),
  })

  return {status: true, report: "success", data: {url: url || ""}}
}

export const getFile = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    return await main(req, ID)
  })

}