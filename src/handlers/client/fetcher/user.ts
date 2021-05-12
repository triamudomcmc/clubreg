import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Router from "next/router";

export const fetchUser = async (): Promise<{ userID: string, userData: {} }> => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const data = await fetch(`/api/database/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "fetchUser", fp: fingerPrint.visitorId}),
    credentials: 'include'
  })

  const res = await data.json()

  if (!res.status) { (res.report !== "missingCookie" && localStorage.setItem("beforeExit", res.report)); return {userID: null, userData: {}} }
  if (res.data.logged) {
    //auto fetching after expired
    setTimeout(() => {
      Router.reload()
    }, (res.data.expires - new Date().getTime()) + 1000)

    return {userID: res.data.userID, userData: res.data.userData}
  }

  return {userID: null, userData: {}}

}

export const fetchUserCred = async (): Promise<{ status: boolean, report: string, data?: {} }> => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const data = await fetch(`/api/database/account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "fetchUserCredentials", fingerPrint: fingerPrint.visitorId}),
    credentials: 'include'
  })

  const res = await data.json()

  return res

}

export const logout = async (): Promise<{ success: boolean }> => {

  const data = await fetch(`/api/database/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "logout"}),
    credentials: 'include'
  })

  const res = await data.json()

  if (res.status) return {success: true}
  return {success: false}

}