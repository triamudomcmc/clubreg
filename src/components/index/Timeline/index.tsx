import TimelineTag from "@components/index/Timeline/TimelineTag"
import {
  ClipboardCopyIcon,
  StarIcon,
  UserGroupIcon,
  UserIcon
} from "@heroicons/react/solid"
import { useWindowDimensions } from "@utilities/document"
import classnames from "classnames"
import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

const selectionBarVariant = {
  initial: {
    clipPath: "inset(0% 0% 0% 0%)"
  },
  animate: {
    clipPath: "inset(0% 0% 0% 100%)"
  },
  revinitial: {
    clipPath: "inset(0% 0% 0% 0%)"
  },
  revanimate: {
    clipPath: "inset(0% 100% 0% 0%)"
  }
}

const Timeline = () => {
  const [section, setSection] = useState("notAu")
  const [isReverse, setReverse] = useState(false)
  const [preferredHeight, setPreferredHeight] = useState(500)

  const notAuditionContainerRef = useRef(null)
  const auditionContainerRef = useRef(null)

  const { width } = useWindowDimensions()

  const timelineContainerVariant = {
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: width >= 768 ? 1 : 0,
      x: 24 * (isReverse ? -1 : 1)
    }
  }

  useEffect(() => {
    if (!notAuditionContainerRef.current) return
    // register preferred height from the longest element
    setPreferredHeight(notAuditionContainerRef.current.clientHeight)
  }, [notAuditionContainerRef, width])

  return (
    <div className="md:flex md:justify-center">
      <div className="mx-8 py-14 md:w-full md:max-w-6xl md:py-32">
        <h1 className="text-2xl font-bold text-center">Timeline</h1>
        <div className="flex flex-row w-full mt-12 tracking-tight md:hidden">
          <div
            onClick={() => {
              setSection("notAu")
            }}
            className="relative w-1/2 cursor-pointer"
          >
            <motion.span
              variants={selectionBarVariant}
              transition={{ duration: 0.5 }}
              animate={section === "notAu" ? "initial" : "animate"}
              className={classnames(
                "absolute flex w-full items-center justify-center border-b border-TUCMC-red-400 text-TUCMC-red-400"
              )}
            >
              <StarIcon className="w-5 h-5" />
              <span className="pl-1">มีการ Audition</span>
            </motion.span>
            <span className="flex items-center justify-center border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
              <StarIcon className="w-5 h-5" />
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
              variants={selectionBarVariant}
              transition={{ duration: 0.5 }}
              animate={section === "au" ? "revinitial" : "revanimate"}
              className={classnames(
                "absolute flex w-full items-center justify-center border-b border-TUCMC-blue-400 text-TUCMC-blue-400"
              )}
            >
              <ClipboardCopyIcon className="w-5 h-5" />
              <span className="pl-1">ไม่มีการ Audition</span>
            </motion.span>
            <span className="flex items-center justify-center border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
              <ClipboardCopyIcon className="w-5 h-5" />
              <span className="pl-1">ไม่มีการ Audition</span>
            </span>
          </div>
        </div>
        <motion.div
          style={
            width < 768 && {
              height:
                section === "notAu"
                  ? preferredHeight
                  : auditionContainerRef.current?.clientHeight
            }
          }
          className="relative md:mt-12 md:flex md:flex-row md:justify-between md:space-x-16"
        >
          <motion.div
            ref={notAuditionContainerRef}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setReverse(false)
            }}
            variants={timelineContainerVariant}
            initial={false}
            animate={section === "notAu" ? "animate" : "exit"}
            className={classnames(
              "absolute bg-white md:relative md:w-1/2 md:max-w-xl"
            )}
          >
            <div className="flex flex-row items-end px-5 my-12 space-x-4">
              <UserGroupIcon className="w-14 shrink-0" />
              <div className="tracking-tight">
                <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่มีการ Audition</p>
              </div>
            </div>
            <div className="space-y-8">
              <TimelineTag
                date="17 พ.ค. 67"
                time="12.00 น."
                title="สมัครและ Audition"
                subTitle="เข้าสู่ระบบ หรือสร้างบัญชี (เฉพาะ ม.4) แล้วลงชื่อ Audition ชมรมที่ต้องการ"
              >
                <TimelineTag.Desc>
                  ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ
                  กำหนดโดยติดตามรายละเอียด การ Audition จากช่องทางประชาสัมพันธ์
                  ของชมรมนั้นโดยตรง
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>
                  ภายในวันที่ 24 พ.ค. 67 เวลา 23.59 น.
                </TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag
                date="24 พ.ค. 67"
                time="23.59 น."
                title="สิ้นสุดการสมัครและ Audition"
              >
                <TimelineTag.Desc>
                  หากไม่ดำเนินการลงชื่อชมรมใด ๆ เลยภายในระยะเวลาการสมัคร และ
                  Audition ระบบจะทำการสุ่มชมรมให้อัตโนมัติ
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag
                date="27 พ.ค. 67"
                time="08.00 น."
                title="ประกาศผลการ Audition"
              >
                <TimelineTag.Desc>
                  นักเรียนที่ผ่านการ Audition เลือกกดยืนยันสิทธิ์หรือสละสิทธิ์
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="28 พ.ค. 67" time="08.00 น.">
                <TimelineTag.Desc>เรียกลำดับสำรอง รอบที่ 1</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="29 พ.ค. 67" time="08.00 น.">
                <TimelineTag.Desc>เรียกลำดับสำรอง รอบที่ 2</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag
                date="30 พ.ค. 67"
                time="08.00 น."
                subTitle="(เฉพาะนักเรียนที่ Audition ไม่ผ่าน)"
              >
                <TimelineTag.Desc>
                  เลือกเข้าชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag
                date="10 มิ.ย. 67"
                last={true}
                title="เริ่มเรียนชมรมคาบแรก"
              >
                <TimelineTag.Desc>{""}</TimelineTag.Desc>
              </TimelineTag>
            </div>
          </motion.div>
          <motion.div
            ref={auditionContainerRef}
            transition={{ duration: 0.5 }}
            variants={timelineContainerVariant}
            initial={false}
            animate={section === "au" ? "animate" : "exit"}
            className={classnames(
              "absolute flex-col bg-white md:relative md:flex md:w-1/2 md:max-w-xl"
            )}
          >
            <div className="flex flex-row items-end px-5 my-12 space-x-4">
              <UserIcon className="w-14 shrink-0" />
              <div className="tracking-tight">
                <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่ไม่มีการ Audition</p>
              </div>
            </div>
            <div className="flex h-[600px] flex-col justify-between md:h-full">
              <TimelineTag
                date="17 พ.ค. 67"
                time="12.00 น."
                title="เลือกชมรมที่ต้องการ"
                color="bg-TUCMC-blue-400"
                className="h-full"
                padding="items-start h-2/5 md:h-3/5"
              >
                <TimelineTag.Desc>
                  เข้าสู่ระบบ หรือสร้างบัญชี (เฉพาะ ม.4) แล้วลงทะเบียน
                  ชมรมที่ไม่มีการ Audition
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>
                  ภายในวันที่ 24 พ.ค. 67 เวลา 23.59 น.
                </TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag
                date="24 พ.ค. 67"
                time="23.59 น."
                title="สิ้นสุดการลงทะเบียน"
                color="bg-TUCMC-blue-400"
                className="h-full"
                padding="items-start h-2/5 md:h-1/4"
              >
                <TimelineTag.Desc>
                  นักเรียนที่ไม่ได้เข้ามาเลือก ลงทะเบียนชมรมใดในช่วงเวลานี้ เลย
                  จะถูกสุ่มชมรมให้อัตโนมัติ
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag
                date="10 มิ.ย. 67"
                last={true}
                title="เริ่มเรียนชมรมคาบแรก"
              >
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
