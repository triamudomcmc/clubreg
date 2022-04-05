import { establishNextApi } from "next-bridge"
import { createTempAccUrlBridge } from "@init/dashboard"
import { createTempAccUrlAction } from "../../../handlers/actions/createTenpAccUrlAction"
import { checkAdmin } from "../../../handlers/conditions/checkAdmin"

export default establishNextApi("POST", createTempAccUrlBridge.init(createTempAccUrlAction, checkAdmin))
