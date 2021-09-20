import {establishNextApi} from "next-bridge";
import {getAllAttendanceData, getEvaluationData, submitEval} from "@init/evaluate";
import {getAllAttendance} from "../../handlers/actions/getAllAttendance";
import {checkPanel} from "../../handlers/conditions/checkPanel";
import {getEvaluate} from "../../handlers/actions/getEvaluate";
import {submitEvaluate} from "../../handlers/actions/submitEvaluate";

export default establishNextApi("POST", [getAllAttendanceData.init(getAllAttendance, checkPanel), getEvaluationData.init(getEvaluate, checkPanel), submitEval.init(submitEvaluate, checkPanel)])
