import React from "react";
import {Line} from "@components/index/timeline/Line";

const TimelineTag = ({children, title = "", subTitle = "", date, time = "", last = false}) => {
  const description = React.Children.map(children, child =>
    child.type.displayName === 'Desc' ? child : null
  )
  const exdes = React.Children.map(children, child =>
    child.type.displayName === 'ExtraDescription' ? child : null
  )

  let cname
  if(description !== "" && title == "" && subTitle == ""){
    cname = "rounded-lg border border-opacity-40 border-TUCMC-gray-700 mt-4 mb-3 px-6 w-full"
  }else{
    cname = "rounded-lg border border-opacity-40 border-TUCMC-gray-700 px-6 w-full"
  }

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex-shrink-0">
        <div className="flex flex-col items-center bg-white mt-2 pt-3">
          <p className="text-sm leading-4">{date}</p>
          <p className="text-xs">{time}</p>
        </div>
        {!last && <Line length="h-full"/>}
      </div>
      <div className={cname}>
        {title !== "" && <h1 className="font-bold tracking-tight pt-4">{title}</h1>}
        {subTitle !== "" && <p className={title !== "" ? "text-TUCMC-gray-900 tracking-tight": "text-TUCMC-gray-900 tracking-tight pt-4"}>{subTitle}</p>}
        <p className={subTitle !== "" ? "mt-4 text-TUCMC-gray-700 tracking-tight" : "mt-2 text-TUCMC-gray-700 tracking-tight"}>{description}</p>
        {((exdes !== null && exdes !== undefined && exdes.length !== 0) || title !== "" || subTitle !== "") && <p className="text-sm my-4 text-TUCMC-gray-700 tracking-tight">{exdes}</p>}
      </div>
    </div>
  )
}

const Description = ({ children }) => children
Description.displayName = 'Desc'
TimelineTag.Desc = Description
const ExtraDescription = ({ children }) => children
ExtraDescription.displayName = 'ExtraDescription'
TimelineTag.ExtraDescription = ExtraDescription

export default TimelineTag