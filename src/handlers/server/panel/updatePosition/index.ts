import {executeWithPermission} from "@server/panel/sharedFunctions";
import {performBatchUpdatePositions} from "@server/panel/updatePosition/functions";

export const updatePosition = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res) => {
    await performBatchUpdatePositions(req)
    return {status: true, report: "success"}
  })

}