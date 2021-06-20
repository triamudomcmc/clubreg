import {request} from "@client/utilities/request";

export const fetchChecks = async (panelID): Promise<{status: boolean, report: string, data: any}> => {
  return await request("database/fetchCheck","fetchChecks",{panelID: panelID})
}

export const submitChecks = async (panelID, data): Promise<{status: boolean, report: string}> => {
  return await request("database/fetchCheck","submitChecks",{panelID: panelID, data: data})
}