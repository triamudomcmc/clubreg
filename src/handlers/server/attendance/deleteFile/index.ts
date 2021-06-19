import {executeWithPermission} from "@server/utilities/permission";
import {performFetchFiles} from "@server/attendance/fetchFiles/mainFunction";
import initialisedDB from "@server/firebase-admin";

const main = async (req, ID) => {
  await initialisedDB.collection("files").doc(req.body.id).delete()
}

export const deleteFile = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    const data = await main(req, ID)
    return {status: true, report: "success"}
  })

}