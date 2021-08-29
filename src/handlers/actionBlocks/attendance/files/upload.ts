import {ActionBlock} from "@lib/action/createAction";
import {Storage} from "@google-cloud/storage";
import initialisedDB from "@server/firebase-admin";
import {update} from "@server/tracker";
import {uploadFileContext} from "@handlers/init/attendance";

export const uploadFileBlock = uploadFileContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const {fingerPrint} = APIParams

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.FCERT_CLIENT_EMAIL,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
  });

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const tempFileName = `${parameters.panelID}-${new Date().getTime()}`
  const file = bucket.file(tempFileName);

  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };

  await initialisedDB.collection("files").add({
    timestamp: new Date().getTime(),
    owner: parameters.panelID,
    filename: decodeURI(parameters.file),
    bucketName: tempFileName
  })

  const [response] = await file.generateSignedPostPolicyV4(options);

  update("system",`fileUpload-${tempFileName}`, fingerPrint, paramsFromCondition.userID)

  return {status: true, report: "success", data: response}
})
