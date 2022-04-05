import { establishNextApi } from "next-bridge"
import { loadTransferStatusBridge, updateTransferStatusBridge } from "@init/transfer"
import { updateTransferStatusAction } from "../../handlers/actions/updateTransferStatusAction"
import { checkTranferActionSubmit } from "../../handlers/conditions/checkTeacher"
import { loadTransferStatus } from "../../handlers/actions/loadTransferStatus"
import { checkPanel } from "../../handlers/conditions/checkPanel"

export default establishNextApi("POST", [
  updateTransferStatusBridge.init(updateTransferStatusAction, checkTranferActionSubmit),
  loadTransferStatusBridge.init(loadTransferStatus, checkPanel),
])
