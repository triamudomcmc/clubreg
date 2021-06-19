import { Storage } from '@google-cloud/storage';
import initialisedDB from "@server/firebase-admin";

export const performUpload = async (req, ID) => {

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const tempFileName = `${req.body.panelID}-${new Date().getTime()}`
  const file = bucket.file(tempFileName);

  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };

  await initialisedDB.collection("files").add({
    timestamp: new Date().getTime(),
    owner: req.body.panelID,
    filename: req.body.file,
    bucketName: tempFileName
  })

  const [response] = await file.generateSignedPostPolicyV4(options);

  return response
}