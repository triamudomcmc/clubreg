import FingerprintJS from "@fingerprintjs/fingerprintjs"

export const request = async (
  path: string,
  action: string,
  data: {}
): Promise<{ status: boolean; report: string; data: any }> => {
  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get()

  const reqData = {
    action: action,
    fp: fingerPrint.visitorId,
    ...data,
  }

  try {
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
      credentials: "include",
    })

    return await res.json()
  } catch (e) {
    return { status: false, report: "unexpected_error", data: null }
  }
}
