import type { IndexPageRenderingType } from "@interfaces/index/IndexPageRenderingType"
import type { Timer } from "@utilities/timers"

export interface StateAwareComponentProps {
  timer: Timer
  pageRenderingType: IndexPageRenderingType
}
