import {ActionContext, createActionContext} from "@lib/action/createAction";

export const deleteFileContext: ActionContext<{ id: string }> = createActionContext("deleteFile", "attendance")
export const fetchFilesContext: ActionContext<{ panelID: string, accessId?: string }> = createActionContext("fetchFiles", "attendance")
export const getFileContext: ActionContext<{ fileID: string }> = createActionContext("getFile", "attendance")
export const uploadFileContext: ActionContext<{ panelID: string, file: string }> = createActionContext("uploadFile", "attendance")

export interface attendanceData {
  [student_id: string]: { action: string }
}

export const fetchChecksContext: ActionContext<{panelID: string, accessId?: string}> = createActionContext("fetchChecks", "attendance")
export const sendDataContext: ActionContext<{panelID: string, data: attendanceData, accessId?: string}> = createActionContext("sendData", "attendance")
