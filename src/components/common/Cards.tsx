import React from "react"
import { InformationCircleIcon } from "@heroicons/react/solid"

export const DefaultCard = ({ children }) => {
  return (
    <div className="flex flex-row space-x-4 rounded-lg bg-TUCMC-pink-100 p-4 text-TUCMC-pink-500">
      <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
      <div className="font-medium">{children}</div>
    </div>
  )
}
