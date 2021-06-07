import {executeWithPermission} from "@server/panel/sharedFunctions";
import {performBatchUpdatePositions} from "@server/panel/updatePosition/functions";

export const updatePosition = async (req, res) => {

  return await executeWithPermission(req, res, async (req, res, ID) => {
    await performBatchUpdatePositions(req, ID)
    return {status: true, report: "success"}
  })

}