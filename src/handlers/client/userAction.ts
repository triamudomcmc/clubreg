import { request } from "@client/utilities/request"

export const regClub = async (phone: string, password: string, clubID: string, oldClubConfirm: boolean) => {
  return await request("database/club", "regClub", {
    clubID: clubID,
    phone: phone,
    password: password,
    oldClubConfirm: oldClubConfirm,
  })
}

export const confirmClub = async (phone: string, password: string, clubID: string) => {
  return await request("database/club", "confirmClub", { clubID: clubID, phone: phone, password: password })
}

export const rejectClub = async (password: string, clubID: string) => {
  return await request("database/club", "rejectClub", { action: "rejectClub", clubID: clubID, password: password })
}
