import {request} from "@client/utilities/request";

export const query = async (query): Promise<{status: boolean, report: string, data: any}> => {
  return await request("database/admin","query", {query})
}

export const fieldUpdate = async (data) => {
  return await request("database/admin", "updateField", {data})
}

export const rollback = async (cacheID) => {
  return await request("database/admin", "rollback", {cacheID})
}

export const getReport = async (ts) => {
  return await request("database/admin", "getReport", {ts})
}

export const getTrackingHistory = async (id) => {
  return await request("database/admin", "getTrackingHistory", {id})
}

export const getUserIDfromCardID = async (id) => {
  return await request("database/admin", "getUserIDfromCardID", {id})
}