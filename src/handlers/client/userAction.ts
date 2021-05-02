import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const regClub = async (phone: string, password: string, clubID: string) => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const reqData = {
    action: "regClub",
    clubID: clubID,
    phone: phone,
    password: password,
    fingerPrint: fingerPrint.visitorId
  }

  const data = await fetch(`/api/database/club`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
    credentials: 'include'
  })

  return await data.json()
}