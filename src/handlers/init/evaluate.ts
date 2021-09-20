import {BridgeContext, createBridgeContext} from "next-bridge";

export const getAllAttendanceData: BridgeContext<{panelID: string, fp: string}> = createBridgeContext("getAttendance", "evaluate")
export const getEvaluationData: BridgeContext<{panelID: string, fp: string}> = createBridgeContext("getEval", "evaluate")
export const submitEval: BridgeContext<{panelID: string, fp: string, data: {}}> = createBridgeContext("submitEval", "evaluate")
