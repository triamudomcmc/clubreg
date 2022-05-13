import {
  CheckCircleIcon,
  ClipboardCopyIcon,
  GlobeAltIcon,
  ReplyIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  StarIcon,
} from "@heroicons/react/solid"
import { DefaultCard } from "@components/common/Cards"
import { motion } from "framer-motion"
import classnames from "classnames"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "@utilities/object"
import Image from "next/image"
import { IClubListData } from "pages/select"

const ClubModal = ({ state, userData, closeAction, action, clubList, confirmOldClub }) => {
  const ref = useRef(null)
  const [hidden, setHidden] = useState(true)
  const [dataState, setDataState] = useState(state.data)

  const userClubData = userData && userData.audition && !isEmpty(userData.audition) ? userData.audition : {}

  useEffect(() => {
    if (hidden) {
      setDataState(state.data)
    }
  }, [state.data])

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      // @ts-ignore
      if (event.target.id === "lower-overlay") {
        closeAction()
      }
    })
  }, [])

  const variants = {
    show: { opacity: 1 },
    hide: { opacity: 0 },
  }

  useEffect(() => {
    if (state.open) {
      setHidden(false)
      ref.current && ref.current.scrollTo(0, 0)
    }
  }, [ref, state.open])

  const notAuditionDesc = (
    <p className="font-normal">ชมรมนี้ไม่มีการ Audition สามารถกดปุ่มลงทะเบียนด้านล่างเพื่อเข้าร่วมชมรมได้ทันที</p>
  )

  let auditionDesc = (
    <p className="font-normal">เมื่อลงชื่อ Audition ชมรมนี้แล้ว ให้ไป Audition ตามวันและเวลา ที่ชมรมนี้กำหนด</p>
  )

  let auditionActionButt = (
    <div
      onClick={action}
      className="flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-TUCMC-pink-400 py-4 text-lg text-white"
    >
      <SortDescendingIcon className="h-5 w-5" />
      <span>ลงชื่อ Audition</span>
    </div>
  )

  if (dataState.clubID in userClubData) {
    auditionActionButt = (
      <div className="flex cursor-not-allowed items-center justify-center space-x-2 rounded-lg bg-TUCMC-gray-200 py-4 text-lg text-TUCMC-gray-600">
        <SortDescendingIcon className="h-5 w-5" />
        <span>ลงชื่อแล้ว</span>
      </div>
    )
    auditionDesc = (
      <p className="font-normal">
        หลังจากลงชื่อแล้ว ให้ติดตามรายละเอียดการ Audition จากช่องทางการประชาสัมพันธ์ ของชมรมนี้และไปทำการ Audition
        ตามวันและเวลาที่ชมรมนี้กำหนด
      </p>
    )
  }

  let notAuButt = (
    <div
      onClick={action}
      className="flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-TUCMC-green-400 py-4 text-lg text-white"
    >
      <CheckCircleIcon className="h-5 w-5" />
      <span>ลงทะเบียน</span>
    </div>
  )

  if (userData && userData.old_club === dataState.clubID && dataState.old_count < dataState.old_count_limit) {
    notAuButt = (
      <div
        onClick={confirmOldClub}
        className="flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-TUCMC-green-400 py-4 text-lg text-white"
      >
        <CheckCircleIcon className="h-5 w-5" />
        <span>ยืนยันสิทธิ์ชมรมเดิม</span>
      </div>
    )
  }

  const imageID =
    dataState.clubID && (dataState.clubID.includes("_") ? `${dataState.clubID.split("_")[0]}` : `${dataState.clubID}`)

  const dataURL =
    dataState.clubID &&
    (!dataState.clubID.includes("ก30920") && dataState.clubID !== "ก30920-8"
      ? dataState.clubID.split("_")[0]
      : "ก30920")

  return (
    <div
      key="lower-overlay"
      id="lower-overlay"
      className={classnames(
        "fixed top-0 z-50 flex max-h-screen min-h-screen w-full flex-col items-center justify-center bg-gray-500 bg-opacity-50 py-10 px-6",
        hidden && "hidden"
      )}
    >
      <motion.div
        onAnimationComplete={() => {
          !state.open && setHidden(true)
        }}
        animate={state.open ? "show" : "hide"}
        variants={variants}
        ref={ref}
        className="flex w-full max-w-md flex-col overflow-y-auto rounded-xl shadow-md"
      >
        <div>
          {!dataState.audition &&
            (dataState.new_count < dataState.new_count_limit ? (
              <div className="flex justify-center rounded-t-lg bg-TUCMC-green-400 py-4 text-sm font-medium text-white">
                <span>มีที่นั่งว่าง</span>
              </div>
            ) : (
              <div className="flex justify-center rounded-t-lg bg-TUCMC-red-400 py-4 text-sm font-medium text-white">
                <span>ไม่มีที่นั่งว่าง</span>
              </div>
            ))}
          <div className="flex w-full flex-col bg-white">
            {
              //preload thumbnails with Image tag
              (clubList as IClubListData[]).map((val) => {
                return (
                  <div key={`div${val}`} className={classnames(imageID === val.clubID ? "block" : "hidden")}>
                    <Image
                      priority={true}
                      key={val.clubID}
                      className="w-full object-cover"
                      width="448"
                      height="252"
                      src={val.imageURL}
                      placeholder="blur"
                      blurDataURL={val.imageURL}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="space-y-2 bg-white px-6 py-6 tracking-tight text-gray-700">
            <h1 className="text-xl">ชมรม{dataState.title}</h1>

            {dataState.audition ? (
              <div className="flex space-x-1 text-TUCMC-pink-400">
                <StarIcon className="h-5 w-5 flex-shrink-0" />
                <span className="leading-6">มีการ Audition</span>
              </div>
            ) : (
              <div className="flex space-x-1 text-TUCMC-blue-400">
                <ClipboardCopyIcon className="h-5 w-5 flex-shrink-0" />
                <span className="leading-6">ไม่มีการ Audition</span>
              </div>
            )}

            <div className="flex space-x-1 text-TUCMC-gray-600 ">
              <GlobeAltIcon className="h-5 w-5 flex-shrink-0" />
              <span className="leading-6">
                <p className={classnames(isEmpty(dataState.contact) ? "hidden" : "block")}>
                  {dataState.contact?.type} : {dataState.contact?.context}
                </p>
                <p className={classnames(isEmpty(dataState.contact2) ? "hidden" : "block")}>
                  {dataState.contact2?.type} : {dataState.contact2?.context}
                </p>
                <p className={classnames(isEmpty(dataState.contact3) ? "hidden" : "block")}>
                  {dataState.contact3?.type} : {dataState.contact3?.context}
                </p>
              </span>
            </div>
          </div>
          <div className="bg-TUCMC-gray-100 px-6 py-3 text-TUCMC-gray-600">
            <a target="_blank" href={`/clubs/${dataURL}`}>
              <h1>ดูรายละเอียดชมรม →</h1>
            </a>
          </div>
          <div className="space-y-4 bg-white px-6 py-8">
            {dataState.new_count < dataState.new_count_limit && (
              <DefaultCard>{dataState.audition ? auditionDesc : notAuditionDesc}</DefaultCard>
            )}

            {dataState.audition ? auditionActionButt : dataState.new_count < dataState.new_count_limit && notAuButt}

            <div
              onClick={closeAction}
              className="border-3/2 flex cursor-pointer items-center justify-center space-x-2 rounded-lg border-gray-300 bg-white py-4 text-lg text-TUCMC-gray-600"
            >
              <ReplyIcon className="h-5 w-5" />
              <span>ย้อนกลับ</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClubModal
