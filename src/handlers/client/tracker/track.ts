import FingerprintJS from "@fingerprintjs/fingerprintjs"

export class Tracker {
  private userID
  private fingerPrint

  public setUserID(userID) {
    this.userID = userID
    return this
  }

  public async init() {
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get()
    this.fingerPrint = fingerPrint.visitorId
    return this
  }

  public async push(type: "click" | "system", context: string) {
    await fetch(`/api/tracker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "push", type: type, context: context, fp: this.fingerPrint, userID: this.userID }),
      credentials: "include",
    })
  }
}
