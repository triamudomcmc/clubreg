import { request } from "@client/utilities/request"

export const fetchChecks = async (
  panelID,
  accessId?: string
): Promise<{ status: boolean; report: string; data: any }> => {
  return await request("database/fetchCheck", "fetchChecks", { panelID: panelID, accessId })
}

export const submitChecks = async (panelID, data, accessId?: string): Promise<{ status: boolean; report: string }> => {
  return await request("database/fetchCheck", "submitChecks", { panelID: panelID, data: data, accessId })
}
