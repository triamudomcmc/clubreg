import { ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import LinesEllipsis from "react-lines-ellipsis"
import { motion } from "framer-motion"
import Link from "next/link"

export const ClubCard = ({ data, imageLoadAction = null }) => {
  return (
    <Link href={`/clubs/${data.clubID}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="minClubs2:w-175px minClubs:w-185px mx-1 my-[0.35rem] mx-10 flex w-full max-w-[260px] cursor-pointer flex-col rounded-lg shadow-lg marg:mx-[0.35rem]"
      >
        {imageLoadAction ? (
          <Image
            priority={false}
            onLoad={imageLoadAction}
            className="w-full rounded-t-lg object-cover"
            width="260"
            height="143"
            quality={75}
            placeholder="blur"
            blurDataURL={`/assets/thumbnails/${data.clubID}.jpg`}
            src={`/assets/thumbnails/${data.clubID}.jpg`}
          />
        ) : (
          <Image
            className="w-full rounded-t-lg object-cover"
            width="185"
            height="102"
            quality={75}
            onLoad={imageLoadAction}
            placeholder="blur"
            blurDataURL={`/assets/thumbnails/${data.clubID}.jpg`}
            src={`/assets/thumbnails/${data.clubID}.jpg`}
          />
        )}
        <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
          <div className="h-[40px]">
            <LinesEllipsis
              text={`ชมรม${data.name}`}
              maxLine="2"
              ellipsis="..."
              trimRight
              className="text-sm tracking-tight"
              basedOn="letters"
            />
          </div>
          {data.audition ? (
            <div className="flex space-x-1 text-xs text-TUCMC-pink-400">
              <StarIcon className="mt-1 h-4 w-4" />
              <span className="leading-6">มีการ Audition</span>
            </div>
          ) : (
            <div className="flex space-x-1 text-xs text-TUCMC-blue-400">
              <ClipboardCopyIcon className="mt-1 h-4 w-4" />
              <span className="leading-6">ไม่มีการ Audition</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
