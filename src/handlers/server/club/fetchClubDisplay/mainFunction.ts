import { ClubDisplay } from "@interfaces/clubDisplay"
import initialisedDB from "@server/firebase-admin"

export const fetchClubDisplayAction = async (
  req,
  res
): Promise<{ status: boolean; report?: string; data?: ClubDisplay }> => {
  try {
    const clubDisplayDoc = initialisedDB.collection("clubDisplay").doc(req.body.clubID)
    const out = await clubDisplayDoc.get()

    if (!out.exists) {
      return { status: false, report: "club_not_found" }
    }

    const clubDisplayData = out.data()
    return { status: true, report: "success", data: clubDisplayData as ClubDisplay }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
