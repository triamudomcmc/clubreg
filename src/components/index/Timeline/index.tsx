import { ClipboardCopyIcon, StarIcon, UserGroupIcon, UserIcon } from "@heroicons/react/solid"
import TimelineTag from "@components/index/Timeline/TimelineTag"
import React, { useEffect, useRef, useState } from "react"
import classnames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import { useWindowDimensions } from "@utilities/document"

const Timeline = () => {
  const [section, setSection] = useState("notAu")
  const [isReverse, setReverse] = useState(false)
  const [conHeight, setConHeight] = useState(500)

  const ref1 = useRef(null)
  const ref2 = useRef(null)

  const { width } = useWindowDimensions()

  const variants = {
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: width >= 768 ? 1 : 0,
      x: 24 * (isReverse ? -1 : 1),
    },
  }

  const slide = {
    initial: {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    animate: {
      clipPath: "inset(0% 0% 0% 100%)",
    },
    revinitial: {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    revanimate: {
      clipPath: "inset(0% 100% 0% 0%)",
    },
  }

  useEffect(() => {
    if (!ref1.current) return

    setConHeight(ref1.current.clientHeight)
  }, [ref1, width])

  return (
    <div className="md:flex md:justify-center">
      <div className="mx-8 py-14 md:w-full md:max-w-6xl md:py-32">
        <h1 className="text-center text-2xl font-bold">Timeline</h1>
        <div className="mt-12 flex w-full flex-row tracking-tight md:hidden">
          <div
            onClick={() => {
              setSection("notAu")
            }}
            className="relative w-1/2 cursor-pointer"
          >
            <motion.span
              variants={slide}
              transition={{ duration: 0.5 }}
              animate={section === "notAu" ? "initial" : "animate"}
              className={classnames(
                "absolute flex w-full items-center justify-center border-b border-TUCMC-red-400 text-TUCMC-red-400"
              )}
            >
              <StarIcon className="h-5 w-5" />
              <span className="pl-1">มีการ Audition</span>
            </motion.span>
            <span className="flex items-center justify-center border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
              <StarIcon className="h-5 w-5" />
              <span className="pl-1">มีการ Audition</span>
            </span>
          </div>
          <div
            className="relative w-1/2 cursor-pointer"
            onClick={() => {
              setSection("au")
            }}
          >
            <motion.span
              variants={slide}
              transition={{ duration: 0.5 }}
              animate={section === "au" ? "revinitial" : "revanimate"}
              className={classnames(
                "absolute flex w-full items-center justify-center border-b border-TUCMC-blue-400 text-TUCMC-blue-400"
              )}
            >
              <ClipboardCopyIcon className="h-5 w-5" />
              <span className="pl-1">ไม่มีการ Audition</span>
            </motion.span>
            <span className="flex items-center justify-center border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
              <ClipboardCopyIcon className="h-5 w-5" />
              <span className="pl-1">ไม่มีการ Audition</span>
            </span>
          </div>
        </div>
        <motion.div
          style={width < 768 && { height: section === "notAu" ? conHeight : ref2.current?.clientHeight }}
          className="relative md:mt-12 md:flex md:flex-row md:justify-between md:space-x-16"
        >
          <motion.div
            ref={ref1}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setReverse(false)
            }}
            variants={variants}
            initial={false}
            animate={section == "notAu" ? "animate" : "exit"}
            className={classnames("absolute bg-white md:relative md:w-1/2 md:max-w-xl")}
          >
            <div className="my-12 flex flex-row items-end space-x-4 px-5">
              <UserGroupIcon className="w-14 flex-shrink-0" />
              <div className="tracking-tight">
                <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่มีการ Audition</p>
              </div>
            </div>
            <div className="space-y-8">
              <TimelineTag
                date="7 มิ.ย. 64"
                time="11.30 น."
                title="สมัครและ Audition"
                subTitle="สร้างบัญชีและลงชื่อ Audition ชมรมที่ต้องการ"
              >
                <TimelineTag.Desc>
                  ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนดโดยติดตามรายละเอียด การ audition
                  จากช่องทางประชาสัมพันธ์ ของชมรมนั้นโดยตรง
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>ภายในวันที่ 14 มิ.ย. 64 เวลา 23.59 น.</TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag date="14 มิ.ย. 64" time="23.59 น." title="สิ้นสุดการสมัครและ Audition">
                <TimelineTag.Desc>
                  หากไม่ดำเนินการลงชื่อชมรมใด ๆ เลยก่อนสิ้นสุดระยะเวลาการสมัคร และ Audition ระบบจะทำการสุ่ม
                  ชมรมให้อัตโนมัติ
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="15 มิ.ย. 64" time="07.30 น." title="ประกาศผลการ Audition">
                <TimelineTag.Desc>นักเรียนที่ผ่านการ Audition เลือกกดยืนยันสิทธิ์หรือสละสิทธิ์</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="16 มิ.ย. 64" time="07.30 น.">
                <TimelineTag.Desc>เรียกลำดับสำรอง รอบที่ 1</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="17 มิ.ย. 64" time="07.30 น.">
                <TimelineTag.Desc>เรียกลำดับสำรอง รอบที่ 2</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="18 มิ.ย. 64" subTitle="(เฉพาะนักเรียนที่ Audition ไม่ผ่าน)">
                <TimelineTag.Desc>เลือกเข้าชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="21 มิ.ย. 64" last={true} title="เริ่มเรียนชมรมคาบแรก">
                {""}
              </TimelineTag>
            </div>
          </motion.div>
          <motion.div
            ref={ref2}
            transition={{ duration: 0.5 }}
            variants={variants}
            initial={false}
            animate={section == "au" ? "animate" : "exit"}
            className={classnames("absolute flex-col bg-white md:relative md:flex md:w-1/2 md:max-w-xl")}
          >
            <div className="my-12 flex flex-row items-end space-x-4 px-5">
              <UserIcon className="w-14 flex-shrink-0" />
              <div className="tracking-tight">
                <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่ไม่มีการ Audition</p>
              </div>
            </div>
            <div className="flex h-[600px] flex-col justify-between md:h-full">
              <TimelineTag
                date="7 มิ.ย. 64"
                time="11.30 น."
                title="เลือกชมรมที่ต้องการ"
                color="bg-TUCMC-blue-400"
                className="h-full"
                padding="items-start h-2/5 md:h-3/5"
              >
                <TimelineTag.Desc>สร้างบัญชีและลงทะเบียน ชมรมที่ไม่มีการ audition</TimelineTag.Desc>
                <TimelineTag.ExtraDescription>ภายในวันที่ 14 มิ.ย. 64 เวลา 23.59 น.</TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag
                date="14 มิ.ย. 64"
                time="23.59 น."
                title="สิ้นสุดการลงทะเบียน"
                color="bg-TUCMC-blue-400"
                className="h-full"
                padding="items-start h-2/5 md:h-1/4"
              >
                <TimelineTag.Desc>
                  นักเรียนที่ไม่ได้เข้ามาเลือก ลงทะเบียนชมรมใดในช่วงเวลานี้เลย จะถูกสุ่มชมรมให้อัตโนมัติ
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="21 มิ.ย. 64" last={true} title="เริ่มเรียนชมรมคาบแรก">
                <TimelineTag.Desc>{""}</TimelineTag.Desc>
              </TimelineTag>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Timeline
