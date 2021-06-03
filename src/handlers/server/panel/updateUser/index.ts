import {executeWithPermission} from "@server/panel/sharedFunctions";
import {updateUserAction} from "@server/panel/updateUser/mainFunction";


export const updateUser = async (req, res) => {

  return await executeWithPermission(req, res, updateUserAction)

}