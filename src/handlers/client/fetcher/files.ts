import { request } from "@client/utilities/request"

export const fetchFiles = async (panelID, accessId?: string): Promise<{}> => {
  return await request("database/files", "fetchFiles", { panelID: panelID, accessId })
}

export const getFileTempURL = async (fileID, panelID): Promise<{ status: boolean; report: string; data: any }> => {
  return await request("database/files", "getFileTempURL", { panelID: panelID, fileID: fileID })
}
