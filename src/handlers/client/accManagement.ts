import { request } from "@client/utilities/request"

export const addBrowser = async () => {
  return await request("database/account", "addBrowser", {})
}

export const toggleSafeMode = async (safeMode) => {
  return await request("database/account", "toggleSafeMode", { safeMode: safeMode })
}

export const toggleBeta = async (name) => {
  return await request("database/account", "toggleBeta", { name })
}

export const removeBrowser = async (browserID) => {
  return await request("database/account", "removeBrowser", { browserID: browserID })
}
