import {establishNextApi} from "next-bridge";
import {createTempAccUrlBridge} from "@init/dashboard/report";
import {createTempAccUrlAction} from "@actionBlocks/dashboard/report/createTempAccUrlAction";
import {conditionBlocks} from "@lib/blocks/conditionBlocks";

export default establishNextApi("POST", createTempAccUrlBridge.init(createTempAccUrlAction, conditionBlocks.checkAdmin))
