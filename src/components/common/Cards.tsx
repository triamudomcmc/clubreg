import React from "react";
import {InformationCircleIcon} from "@heroicons/react/solid";

export const DefaultCard = ({children}) => {
  return (
    <div
      className="flex flex-row bg-TUCMC-pink-100 space-x-4 text-TUCMC-pink-500 p-4 rounded-lg">
      <InformationCircleIcon className="flex-shrink-0 w-6 h-6"/>
      <div className="font-medium">
        {children}
      </div>
    </div>
  )
}