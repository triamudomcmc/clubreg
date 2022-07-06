import LooseTypeObject from "../../../interfaces/LooseTypeObject"
import { request } from "@client/utilities/request"
import UserData from "@interfaces/userData"
import { AtSymbolIcon } from "@heroicons/react/outline"

export const fetchMembers = async (
  panelID,
  audition = true
): Promise<{ status: boolean; report: string; data: Array<LooseTypeObject<any>> }> => {
  return await request("database/panel", "fetchMembers", { panelID: panelID, audition: audition })
}

export const fetchAllMembers = async (
  panelID
): Promise<{ status: boolean; report: string; data: Array<LooseTypeObject<any>> }> => {
  return await request("database/panel", "fetchAllMembers", { panelID: panelID })
}

export const submitPending = async (panelID, tasks): Promise<{ status: boolean; report: string }> => {
  return await request("database/panel", "submitPending", { panelID: panelID, tasks: tasks })
}

export const updateUser = async (
  panelID,
  objectRefID,
  action,
  section,
  sectionUpdate
): Promise<{ status: boolean; report: string }> => {
  return await request("database/panel", "updateUser", {
    panelID: panelID,
    objectRefID: objectRefID,
    task: action,
    section: section,
    sectionUpdate: sectionUpdate,
  })
}

export const updatePosition = async (panelID, tasks): Promise<{ status: boolean; report: string }> => {
  return await request("database/panel", "updatePosition", { panelID: panelID, tasks: tasks })
}

export const fetchClub = async (clubID: string): Promise<any> => {
  return await request("database/panel", "fetchAClub", { clubID: clubID })
}

export const updateClubField = async (
  panelID: string,
  field: string,
  data
): Promise<{ status: boolean; report: string }> => {
  return await request("database/panel", "updateClubField", { panelID, field, data })
}

export const fetchStudentID = async (
  panelID: string,
  studentID: string
): Promise<{ status: boolean; report: string; data?: UserData }> => {
  return await request("database/panel", "fetchStudentID", { studentID, panelID })
}

export const addClubCommittee = async (
  panelID: string,
  studentID: string,
  password: string
): Promise<{ status: boolean; report: string }> => {
  return await request("database/panel", "addClubCommittee", { studentID, panelID, password })
}

export const fetchClubCommittee = async (
  panelID: string
): Promise<{ status: boolean; report: string; data: UserData[] }> => {
  return await request("database/panel", "fetchClubCommittee", { panelID })
}

export const removeClubCommittee = async (
  panelID: string,
  studentID: string,
  password: string
): Promise<{ status: boolean; report: string }> => {
  return await request("database/panel", "removeClubCommittee", { studentID, panelID, password })
}
