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
              <span className="pl-1">??????????????? Audition</span>
            </motion.span>
            <span className="flex items-center justify-center border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
              <StarIcon className="h-5 w-5" />
              <span className="pl-1">??????????????? Audition</span>
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
              <span className="pl-1">???????????????????????? Audition</span>
            </motion.span>
            <span className="flex items-center justify-center border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
              <ClipboardCopyIcon className="h-5 w-5" />
              <span className="pl-1">???????????????????????? Audition</span>
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
                <p>???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? Audition</p>
              </div>
            </div>
            <div className="space-y-8">
              <TimelineTag
                date="17 ???.???. 65"
                time="12.00 ???."
                title="???????????????????????? Audition"
                subTitle="????????????????????????????????? ?????????????????????????????????????????? (??????????????? ???.4) ?????????????????????????????? Audition ??????????????????????????????????????????"
              >
                <TimelineTag.Desc>
                  ?????????????????????????????? Audition ???????????????????????????????????????????????????????????????????????????????????? ??? ???????????????????????????????????????????????????????????????????????? ????????? audition
                  ????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>????????????????????????????????? 24 ???.???. 65 ???????????? 23.59 ???.</TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag date="24 ???.???. 65" time="23.59 ???." title="?????????????????????????????????????????????????????? Audition">
                <TimelineTag.Desc>
                  ????????????????????????????????????????????????????????????????????????????????? ??? ?????????????????????????????????????????????????????????????????????????????????????????? ????????? Audition ?????????????????????????????????????????????
                  ????????????????????????????????????????????????
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="25 ???.???. 65" time="07.30 ???." title="????????????????????????????????? Audition">
                <TimelineTag.Desc>?????????????????????????????????????????????????????? Audition ????????????????????????????????????????????????????????????????????????????????????????????????</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="26 ???.???. 65" time="07.30 ???.">
                <TimelineTag.Desc>????????????????????????????????????????????? ?????????????????? 1</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="27 ???.???. 65" time="07.30 ???.">
                <TimelineTag.Desc>????????????????????????????????????????????? ?????????????????? 2</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="28 ???.???. 65" time="12.00 ???." subTitle="(???????????????????????????????????????????????? Audition ?????????????????????)">
                <TimelineTag.Desc>???????????????????????????????????????????????????????????????????????? Audition ?????????????????????????????????????????????????????????????????????</TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="30 ???.???. 65" last={true} title="????????????????????????????????????????????????????????????">
                <TimelineTag.Desc>{""}</TimelineTag.Desc>
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
                <p>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? Audition</p>
              </div>
            </div>
            <div className="flex h-[600px] flex-col justify-between md:h-full">
              <TimelineTag
                date="17 ???.???. 65"
                time="12.00 ???."
                title="?????????????????????????????????????????????????????????"
                color="bg-TUCMC-blue-400"
                className="h-full"
                padding="items-start h-2/5 md:h-3/5"
              >
                <TimelineTag.Desc>
                  ????????????????????????????????? ?????????????????????????????????????????? (??????????????? ???.4) ??????????????????????????????????????? ????????????????????????????????????????????? audition
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>????????????????????????????????? 24 ???.???. 65 ???????????? 23.59 ???.</TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag
                date="24 ???.???. 65"
                time="23.59 ???."
                title="?????????????????????????????????????????????????????????"
                color="bg-TUCMC-blue-400"
                className="h-full"
                padding="items-start h-2/5 md:h-1/4"
              >
                <TimelineTag.Desc>
                  ???????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????? ????????? ???????????????????????????????????????????????????????????????????????????
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="30 ???.???. 65" last={true} title="????????????????????????????????????????????????????????????">
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
