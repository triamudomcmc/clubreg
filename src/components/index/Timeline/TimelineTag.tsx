import { Line } from "@components/index/Timeline/Line"
import { THAI_MONTH_INITIALS } from "@config/time"
import React from "react"

const TimelineTag = ({
  children,
  title = "",
  subTitle = "",
  date,
  last = false,
  color = "bg-TUCMC-red-400",
  padding = "",
  className = "",
}) => {
  const description = React.Children.map(children, (child) => (child.type.displayName === "Desc" ? child : null))
  const exdes = React.Children.map(children, (child) => (child.type.displayName === "ExtraDescription" ? child : null))
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(THAI_MONTH_INITIALS[date.getMonth()]);
  const year = String(date.getFullYear() +43).slice(-2);
  const Time = String( date.getHours().toString().padStart(2, "0") + "." + date.getMinutes().toString().padStart(2, "0") + " น.")

  let cname
  if (description !== "" && title === "" && subTitle === "") {
    cname = "rounded-lg border border-opacity-40 border-TUCMC-gray-700 mt-4 mb-3 px-6 w-full"
  } else {
    cname = "rounded-lg border border-opacity-40 border-TUCMC-gray-700 px-6 w-full"
  }

  return (
    <div className={`flex flex-row space-x-4 ${padding}`}>
      <div className={`shrink-0 ${className}`}>
        <div className="mt-2 flex flex-col items-center bg-white pt-3 text-center">
          <p className="w-20 text-sm leading-4">
            {day} {month} {year}
          </p>
          {!last &&<p className="text-xs">{Time}</p>}
        </div>
        {!last && <Line length="h-full" color={color} />}
      </div>
      <div className={cname}>
        {title !== "" && <h1 className="pt-4 font-bold tracking-tight">{title}</h1>}
        {subTitle !== "" && (
          <p
            className={title !== "" ? "tracking-tight text-TUCMC-gray-900" : "pt-4 tracking-tight text-TUCMC-gray-900"}
          >
            {subTitle}
          </p>
        )}
        <p
          className={
            subTitle !== "" ? "mt-4 tracking-tight text-TUCMC-gray-700" : "mt-2 tracking-tight text-TUCMC-gray-700"
          }
        >
          {description}
        </p>
        {((exdes !== null && exdes !== undefined && exdes.length !== 0) || title !== "" || subTitle !== "") && (
          <p className="my-4 text-sm tracking-tight text-TUCMC-gray-700">{exdes}</p>
        )}
      </div>
    </div>
  )
}

const Description = ({ children }) => children
Description.displayName = "Desc"
TimelineTag.Desc = Description
const ExtraDescription = ({ children }) => children
ExtraDescription.displayName = "ExtraDescription"
TimelineTag.ExtraDescription = ExtraDescription

export default TimelineTag
