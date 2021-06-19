import {performUpload} from "@server/attendance/uploadFile/mainFunction";
import {executeWithPermission} from "@server/utilities/permission";

export const uploadFiles = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    const data = await performUpload(req, ID)
    return {status: true, report: "success", data: data}
  })

}