import { executeWithPermission } from "@server/panel/sharedFunctions"
import { performBatchUpdatePositions } from "@server/panel/updatePosition/functions"
import { positionUpdateTime } from "@config/time"

export const updatePosition = async (req, res) => {
  if (new Date().getTime() >= positionUpdateTime) return { status: false, report: "exceeded_time_limit" }

  return await executeWithPermission(req, res, async (req, res, ID) => {
    await performBatchUpdatePositions(req, ID)
    return { status: true, report: "success" }
  })
}
