import { useAuth } from "@client/auth"
import {
  beforeOldClub,
  endOldClub,
  endRegClubTime,
  openTime,
  startOldClub
} from "@config/time"
import type { IndexPageRenderingType } from "@interfaces/index/IndexPageRenderingType"
import Router from "next/router"

export const useRenderingType = () => {
  const { onReady } = useAuth()

  const renderType: IndexPageRenderingType = onReady((logged, userData) => {
    if (!logged) {
      // user not logged in
      return "no_login"
    }

    if (userData.club === "") {
      // when user has no club

      if (
        new Date().getTime() < endOldClub &&
        new Date().getTime() > startOldClub
      ) {
        // when user has no club, and it is an old club confirming period.
        return "old_club"
      }

      if (
        new Date().getTime() < endRegClubTime &&
        new Date().getTime() > openTime
      ) {
        // when user has no club, and it is club registration period.
        Router.push("/select")
        return "no_club"
      }

      if (new Date().getTime() > beforeOldClub) {
        // when user has no club, and it is before an old club confirming period.
        return "before_old_club"
      }
    } else {
      // when user already being in a club.
      return "club"
    }

    return ""
  })

  return renderType
}
