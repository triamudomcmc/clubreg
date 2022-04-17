import initialisedDB from "@server/firebase-admin"
import { isEmpty } from "@utilities/object"

export const fetchClubCommitteeAction = async (req, res, ID) => {
  try {
    const clubDoc = initialisedDB.collection("clubs").doc("mainData")
    const clubOut = await clubDoc.get()

    const clubData = clubOut.get(req.body.panelID)

    if (isEmpty(clubData)) {
      return { status: false, report: "club_not_found" }
    }

    if (clubData.hasOwnProperty("committees")) {
      let notFound = false

      const committeeData = await clubData.committees.map(async (stdID) => {
        const studentDoc = initialisedDB.collection("data").where("student_id", "==", stdID)
        const out = await studentDoc.get()

        if (out.empty || out.size === 0) {
          notFound = true
        } else if (out.size > 0) {
          const data = await out.docs[0].data()
          return data
        }
      })

      if (notFound) return { status: false, report: "student_not_found" }
      else {
        const res = await Promise.all(committeeData)
        return { status: true, report: "success", data: res }
      }
    } else {
      return { status: true, report: "success", data: [] }
    }
  } catch (e: any) {
    console.error(e, e?.error)
    return { status: false, report: e }
  }
}
