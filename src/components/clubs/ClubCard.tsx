import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import Image from "next/image"
import LinesEllipsis from 'react-lines-ellipsis'
import {motion} from "framer-motion"
import Link from "next/link"

export const ClubCard = ({ data, imageLoadAction = null }) => {
  return(
    <Link href={`/clubs/${data.clubID}`}>
      <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className="flex flex-col rounded-lg mx-1 marg:mx-[0.35rem] my-[0.35rem] mx-10 shadow-lg w-full max-w-[260px] minClubs2:w-175px minClubs:w-185px cursor-pointer">
        {imageLoadAction ? <Image priority={false} onLoad={imageLoadAction} className="object-cover rounded-t-lg w-full" width="260" height="143" src={`/assets/thumbnails/${data.clubID}.jpg`}/>: <Image className="object-cover rounded-t-lg w-full" width="185" height="102" src={`/assets/thumbnails/${data.clubID}.jpg`}/>}
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
            className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div>:<div className="flex text-xs text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
            className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
        </div>
      </motion.div>
    </Link>
  )
}