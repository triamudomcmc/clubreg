import {request} from "@client/utilities/request";

export const fetchFiles = async (panelID): Promise<{}> => {
  return await request("database/files","fetchFiles",{panelID: panelID})
}