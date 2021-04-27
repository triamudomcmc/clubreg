import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const fetchUser = async (): Promise<{ logged: boolean, userData: {} }> => {

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

  if (res.logged) {
    return {logged: res.logged, userData: res.userData}
  } else {
    return {logged: false, userData: {}}
  }

}