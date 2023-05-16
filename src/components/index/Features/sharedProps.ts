import type { ReactNode } from "react"

export interface FeatureBoxProps {
  url: string
  content: string | ReactNode
  image: string
  smallImage?: string
  customClassName?: string
}
