import {performUpload, upBucket} from "@server/attendance/uploadFile/mainFunction";
import {executeWithPermission, executeWithPermissionEx} from "@server/utilities/permission";

export const uploadFiles = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    const data = await performUpload(req, ID)
    return {status: true, report: "success", data: data}
  })

}


export const uploadDocs = async (req, res) => {

  return await executeWithPermissionEx(req, res, async (req, res, ID) => {
    const data = await upBucket(req, ID)
    return {status: true, report: "success", data: data}
  })

}
