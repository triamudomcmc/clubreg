import { request } from "@client/utilities/request"

export const fetchChecks = async (
  panelID,
  accessId?: string,
  targetTime?: string
): Promise<{ status: boolean; report: string; data: any }> => {
  return await request("database/fetchCheck", "fetchChecks", { panelID: panelID, accessId, targetTime })
}

export const submitChecks = async (
  panelID,
  data,
  accessId?: string,
  targetTime?: number
): Promise<{ status: boolean; report: string }> => {
  return await request("database/fetchCheck", "submitChecks", { panelID: panelID, data: data, accessId, targetTime })
}
