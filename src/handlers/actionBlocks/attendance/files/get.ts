import {ActionBlock} from "@lib/action/createAction";
import initialisedDB from "@server/firebase-admin";
import {Storage} from "@google-cloud/storage";
import {getUNIXTimeStamp} from "@config/time";
import {getFileContext} from "@handlers/init/attendance";

export const getFileBlock = getFileContext.helper.createAction(async (APIParams, parameters) => {
  const fileData = await initialisedDB.collection("files").doc(parameters.fileID).get()

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
})
