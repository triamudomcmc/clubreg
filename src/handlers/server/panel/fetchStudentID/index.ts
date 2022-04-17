import { executeWithPermission } from "@server/panel/sharedFunctions"
import { updateUserAction } from "@server/panel/updateUser/mainFunction"
import { editDataTime } from "@config/time"
import { fetchStudentIDAction } from "./mainFunction"

export const fetchStudentID = async (req, res) => {
  // if (new Date().getTime() >= editDataTime) return { status: false, report: "exceeded_time_limit" }

  return await executeWithPermission(req, res, fetchStudentIDAction)
}
