import initialisedDB from "@server/firebase-admin"

export const fetchClubDisplayAction = async (req, res, ID) => {
  try {
    const clubDisplayDoc = initialisedDB.collection("clubDisplay").doc(req.body.clubID)
    const out = await clubDisplayDoc.get()

    if (!out.exists) {
      return { status: false, report: "club_not_found" }
    }

    const clubData = out.data()
    return { status: true, report: "success", data: clubData }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
