import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const addBrowser = async () => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const reqData = {
    action: "addBrowser",
    fingerPrint: fingerPrint.visitorId
  }

  const data = await fetch(`/api/database/account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
    credentials: 'include'
  })

  return await data.json()
}

export const toggleSafeMode = async (safeMode) => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const reqData = {
    action: "toggleSafeMode",
    fingerPrint: fingerPrint.visitorId,
    safeMode: safeMode
  }

  const data = await fetch(`/api/database/account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
    credentials: 'include'
  })

  return await data.json()
}

export const removeBrowser = async (browserID) => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const reqData = {
    action: "removeBrowser",
    fingerPrint: fingerPrint.visitorId,
    browserID: browserID
  }

  const data = await fetch(`/api/database/account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
    credentials: 'include'
  })

  return await data.json()
}