import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import Image from "next/image"
import LinesEllipsis from 'react-lines-ellipsis'
import {motion} from "framer-motion"
import Link from "next/link"
import Router from "next/router";
import {Tracker} from "@client/tracker/track";
import {useEffect} from "react";
import {useTracker} from "@client/tracker/context";

export const ClubCard = ({data, imageLoadAction = null, index = 0}) => {

  const minLoad = 10

  const {tracker} = useTracker()

  const click = () => {
    tracker.push("click",imageLoadAction ? `mainVisit->${data.clubID}` : `suggestedVisit->${data.clubID}`)
    Router.push(`/clubs/${data.clubID}`)
  }

  return (
    <motion.div onClick={click} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}
                className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px cursor-pointer">
      {imageLoadAction ?
        <Image priority={index < minLoad} onLoad={imageLoadAction} className="object-cover rounded-t-lg w-full" width="185"
               height="102" src={`/assets/thumbnails/${data.clubID}.jpg`}/> :
        <Image className="object-cover rounded-t-lg w-full" width="185" height="102" src={`/assets/thumbnails/${data.clubID}.jpg`}/>}
      <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
        <div className="h-[40px]">
          <LinesEllipsis text={`ชมรม${data.name}`}
                         maxLine='2'
                         ellipsis='...'
                         trimRight
                         className="text-sm tracking-tight"
                         basedOn='letters'
          />
        </div>
        {data.audition ? <div className="flex text-xs text-TUCMC-pink-400 space-x-1"><StarIcon
            className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div> :
          <div className="flex text-xs text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
            className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
      </div>
    </motion.div>
  )
}