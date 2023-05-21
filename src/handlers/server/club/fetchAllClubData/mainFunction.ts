import { ClubData } from "@interfaces/clubData"
import { ClubDisplay } from "@interfaces/clubDisplay"
import initialisedDB from "@server/firebase-admin"

export const fetchAllClubDataAction = async (
  req,
  res
): Promise<{ status: boolean; report?: string; data?: any }> => {
  try {
    const clubDataDocs = await initialisedDB.collection("clubs").get()

    const parsedData = clubDataDocs.docs.map((doc) => {
      return { clubID: doc.id, ...doc.data() }
    })

    return { status: true, report: "success", data: parsedData }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
