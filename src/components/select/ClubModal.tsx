import {
  CheckCircleIcon,
  ClipboardCopyIcon,
  GlobeAltIcon,
  ReplyIcon, SortAscendingIcon, SortDescendingIcon,
  StarIcon
} from "@heroicons/react/solid";
import {DefaultCard} from "@components/common/Cards";
import {motion} from "framer-motion"
import classnames from "classnames"
import {useEffect, useRef, useState} from "react";
import {isEmpty} from "@utilities/object";

const ClubModal = ({state, userData, closeAction, action}) => {

  const ref = useRef(null)
  const [hidden, setHidden] = useState(true)
  const [dataState, setDataState] = useState(state.data)

  const userClubData = (userData && userData.audition && !isEmpty(userData.audition)) ? userData.audition : {}

  useEffect(() => {
    if (hidden) {
      setDataState(state.data)
    }
  }, [state.data])

  const variants = {
    show: {opacity: 1},
    hide: {opacity: 0}
  }

  useEffect(() => {
    if (state.open) {
      setHidden(false)
      ref.current && ref.current.scrollTo(0, 0);
    }
  }, [ref, state.open])

  const notAuditionDesc = <p className="font-normal">ชมรมนี้ไม่มีการ Audition
    สามารถกดปุ่มลงทะเบียนด้านล่างเพื่อเข้าร่วมชมรมได้ทันที</p>

  let auditionDesc = <p className="font-normal">เมื่อลงชื่อ Audition ชมรมนี้แล้ว
    ให้ไป Audition ตามวันและเวลา
    ที่ชมรมนี้กำหนด</p>

  let auditionActionButt = <div onClick={action}
                                className="flex justify-center cursor-pointer items-center space-x-2 text-lg bg-TUCMC-pink-400 text-white py-4 rounded-lg">
    <SortDescendingIcon className="w-5 h-5"/>
    <span>ลงชื่อ Audition</span>
  </div>

  if (dataState.clubID in userClubData) {
    auditionActionButt = <div
      className="flex justify-center cursor-not-allowed items-center space-x-2 text-lg bg-TUCMC-gray-200 text-TUCMC-gray-600 py-4 rounded-lg">
      <SortDescendingIcon className="w-5 h-5"/>
      <span>ลงชื่อแล้ว</span>
    </div>
    auditionDesc = <p className="font-normal">หลังจากลงชื่อแล้ว ให้ติดตามรายละเอียดการ Audition จากช่องทางการประชาสัมพันธ์
      ของชมรมนี้และไปทำการ Audition ตามวันและเวลาที่ชมรมนี้กำหนด</p>
  }

  return (
    <div
      className={classnames("flex flex-col items-center justify-center fixed top-0 z-50 w-full py-10 px-6 min-h-screen max-h-screen", hidden && "hidden")}>
      <motion.div onAnimationComplete={() => {
        !state.open && setHidden(true)
      }} animate={state.open ? "show" : "hide"} variants={variants} ref={ref}
                  className="flex flex-col w-full max-w-md rounded-xl overflow-y-auto shadow-md">
        <div>
          {
            !dataState.audition && (dataState.new_count < dataState.new_count_limit ? <div
              className="flex justify-center text-sm font-medium rounded-t-lg bg-TUCMC-green-400 text-white py-4">
              <span>มีที่นั่งว่าง</span>
            </div> : <div
              className="flex justify-center text-sm font-medium rounded-t-lg bg-TUCMC-red-400 text-white py-4">
              <span>ไม่มีที่นั่งว่าง</span>
            </div>)
          }
          <div className="flex flex-col w-full bg-white">
            <img className="object-cover w-full" width="296" height="175"
                 src="/assets/images/placeholder/thumb1.png"/>
          </div>
          <div className="px-6 py-6 tracking-tight bg-white space-y-2 text-gray-700">
            <h1 className="text-xl">ชมรม{dataState.title}</h1>
            {dataState.audition ? <div className="flex text-TUCMC-red-400 space-x-1">
              <StarIcon className="w-5 h-5 flex-shrink-0"/>
              <span className="leading-6">มีการ Audition</span>
            </div> : <div className="flex text-TUCMC-blue-400 space-x-1">
              <ClipboardCopyIcon className="w-5 h-5 flex-shrink-0"/>
              <span className="leading-6">ไม่มีการ Audition</span>
            </div>}
            <div className="flex text-TUCMC-gray-600 space-x-1 "><GlobeAltIcon
              className="w-5 h-5 flex-shrink-0"/><span className="leading-6">FB : Triam Udom Model United Nations, IG : @triammun</span>
            </div>
          </div>
          <div className="bg-TUCMC-gray-100 text-TUCMC-gray-600 px-6 py-3">
            <h1>ดูรายละเอียดชมรม →</h1>
          </div>
          <div className="px-6 py-8 bg-white space-y-4">
            {dataState.new_count < dataState.new_count_limit && <DefaultCard>
              {
                dataState.audition ? auditionDesc : notAuditionDesc
              }
            </DefaultCard>}
            {dataState.audition ? auditionActionButt : dataState.new_count < dataState.new_count_limit && <div onClick={action}
                                                            className="flex justify-center cursor-pointer items-center space-x-2 text-lg bg-TUCMC-green-400 text-white py-4 rounded-lg">
              <CheckCircleIcon className="w-5 h-5"/>
              <span>ลงทะเบียน</span>
            </div>}
            <div onClick={closeAction}
                 className="flex cursor-pointer justify-center items-center border-3/2 border-gray-300 space-x-2 text-lg bg-white text-TUCMC-gray-600 py-4 rounded-lg">
              <ReplyIcon className="w-5 h-5"/>
              <span>ย้อนกลับ</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClubModal