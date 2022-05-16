import Router from "next/router"
import { request } from "@client/utilities/request"

export const fetchUser = async (): Promise<{ userID: string; userData: {} }> => {
  const res = await request("database/user", "fetchUser", {})

  if (!res.status) {
    res.report !== "missingCookie" && localStorage.setItem("beforeExit", res.report)
    return { userID: null, userData: {} }
  }

  if (res.data.logged) {
    //auto fetching after expired
    setTimeout(() => {
      Router.reload()
    }, res.data.expires - new Date().getTime() + 1000)

    return { userID: res.data.userID, userData: res.data.userData }
  }

  return { userID: null, userData: {} }
}

export const fetchUserCred = async (): Promise<{ status: boolean; report: string; data?: {} }> => {
  return await request("database/account", "fetchUserCredentials", {})
}

export const logout = async (): Promise<{ status: boolean }> => {
  return await request("database/user", "logout", {})
}

export const forgot = async (email): Promise<{ status: boolean; report: string; data: { redirect: string } }> => {
  return await request("database/auth", "forgot", { email: email })
}

export const resetPassword = async (password, conPass, actionID): Promise<{ status: boolean; report: string }> => {
  return await request("database/auth", "reset", { password: password, conPassword: conPass, actionID: actionID })
}
