import { executeWithPermission } from "@server/panel/sharedFunctions"
import { updateUserAction } from "@server/panel/updateUser/mainFunction"
import { editDataTime } from "@config/time"
import { fetchClubDisplayAction } from "./mainFunction"
import { ClubDisplay } from "@interfaces/clubDisplay"

export const fetchClubDisplay = async (req, res): Promise<{ status: boolean; report?: string; data?: ClubDisplay }> => {
  // if (new Date().getTime() >= editDataTime) return { status: false, report: "exceeded_time_limit" }

  return await fetchClubDisplayAction(req, res)
}
