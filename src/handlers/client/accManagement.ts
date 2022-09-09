import { request } from "@client/utilities/request"

export const addBrowser = async () => {
  return await request("database/account", "addBrowser", {})
}

export const toggleSafeMode = async (safeMode) => {
  return await request("database/account", "toggleSafeMode", { safeMode: safeMode })
}


export const generate2FA = async () => {
  return await request("database/account", "generate2FA", { })
}

export const verify2FA = async (code) => {
  return await request("database/account", "verify2FA", { code })
}



export const toggleBeta = async (name) => {
  return await request("database/account", "toggleBeta", { name })
}

export const removeBrowser = async (browserID) => {
  return await request("database/account", "removeBrowser", { browserID: browserID })
}
