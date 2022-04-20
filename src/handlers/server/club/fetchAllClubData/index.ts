import { executeWithPermission } from "@server/panel/sharedFunctions"
import { updateUserAction } from "@server/panel/updateUser/mainFunction"
import { editDataTime } from "@config/time"
import { fetchAllClubDataAction } from "./mainFunction"
import { ClubDisplay } from "@interfaces/clubDisplay"
import { ClubData } from "@interfaces/clubData"

export const fetchAllClubData = async (req, res): Promise<{ status: boolean; report?: string; data?: ClubData[] }> => {
  // if (new Date().getTime() >= editDataTime) return { status: false, report: "exceeded_time_limit" }

  return await fetchAllClubDataAction(req, res)
}
