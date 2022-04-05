import { executeWithPermission } from "@server/utilities/permission"
import { performFetchFiles } from "@server/attendance/fetchFiles/mainFunction"

export const fetchFiles = async (req, res) => {
  return await executeWithPermission(req, res, async (req, res, ID) => {
    const data = await performFetchFiles(req, ID)
    return { status: true, report: "success", data: data }
  })
}
