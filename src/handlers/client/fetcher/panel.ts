import LooseTypeObject from "../../../interfaces/LooseTypeObject";
import {request} from "@client/utilities/request";

export const fetchMembers = async (panelID): Promise<{status: boolean, report: string, data: Array<LooseTypeObject<any>>}> => {
  return await request("database/panel", "fetchMembers", {panelID: panelID})
}

export const submitPending = async (panelID, tasks): Promise<{status: boolean, report: string}> => {
  return await request("database/panel", "submitPending", {panelID: panelID,tasks: tasks})
}

export const updateUser = async (panelID, objectRefID, action): Promise<{status: boolean, report: string}> => {
  return await request("database/panel", "updateUser",{panelID: panelID,objectRefID: objectRefID,task: action})
}

export const updatePosition = async (panelID, tasks): Promise<{status: boolean, report: string}> => {
  return await request("database/panel", "updatePosition", {panelID: panelID,tasks: tasks})
}

export const fetchClub = async (clubID: string): Promise<{}> => {
  return await request("database/panel", "fetchAClub", {clubID: clubID})
}