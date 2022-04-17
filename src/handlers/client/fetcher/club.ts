import { request } from "@client/utilities/request"

export const fetchClub = async (): Promise<{}> => {
  return await request("database/fetchClub", "fetchClub", {})
}

export const fetchAClub = async (clubID: string): Promise<{}> => {
  return await request("database/fetchClub", "fetchAClub", { clubID: clubID })
}

export const fetchClubDisplay = async (clubID: string): Promise<{}> => {
  return await request("database/fetchClub", "fetchClubDisplay", { clubID: clubID })
}
