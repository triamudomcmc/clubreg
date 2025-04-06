import { request } from "@client/utilities/request"
import { ClubData } from "@interfaces/clubData"
import { ClubDisplay } from "@interfaces/clubDisplay"
import UserData from "@interfaces/userData"

export const fetchClub = async (): Promise<{}> => {
  return await request("database/fetchClub", "fetchClub", {})
}

export const fetchAClub = async (clubID: string): Promise<{}> => {
  return await request("database/fetchClub", "fetchAClub", { clubID: clubID })
}

export const fetchClubDisplay = async (
  clubID: string
): Promise<{ status: boolean; report?: string; data?: ClubDisplay }> => {
  return await request("database/fetchClub", "fetchClubDisplay", { clubID: clubID })
}

export const fetchAllClubData = async (
  clubID: string
): Promise<{ status: boolean; report?: string; data?: (ClubData & { clubID: string })[] }> => {
  return await request("database/fetchClub", "fetchAllClubData", { clubID: clubID })
}

export const changeClubDisplayStatus = async (
  clubID: string,
  password: string,
  status: "accepted" | "declined",
  newData: null | { description: string; reviews: any[] },
  reason?: string
): Promise<{ status: boolean; report?: string }> => {
  return await request("database/editWeb", "changeClubDisplayStatus", { clubID, status, reason, password, newData })
}

export const getClubTeacher = async (clubID: string): Promise<{ status: boolean; report?: string; data?: UserData[] }> => {
  return await request("database/club", "getClubTeacher", { clubID })
}
