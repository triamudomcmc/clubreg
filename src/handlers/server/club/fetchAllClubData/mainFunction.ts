import { ClubData } from "@interfaces/clubData"
import { ClubDisplay } from "@interfaces/clubDisplay"
import initialisedDB from "@server/firebase-admin"

export const fetchAllClubDataAction = async (
  req,
  res
): Promise<{ status: boolean; report?: string; data?: (ClubData & { clubID: string })[] }> => {
  try {
    const clubDataDocs = await initialisedDB.collection("clubs").doc("mainData").get()
    const allClubData = clubDataDocs.data()

    const parsedData = Object.keys(allClubData).map((clubID) => {
      return { clubID, ...allClubData[clubID] }
    })

    return { status: true, report: "success", data: parsedData }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
