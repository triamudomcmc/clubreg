import PageContainer from "@components/common/PageContainer"
import { Card } from "@components/Card"
import { useWindowDimensions } from "@utilities/document"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ArrowCircleDownIcon, ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { ExclamationIcon } from "@heroicons/react/solid"
import { useAuth } from "@client/auth"
import * as fs from "fs"
import { fetchAClub } from "@client/fetcher/club"
import Router from "next/router"
import { Button } from "@components/common/Inputs/Button"
import { GetStaticProps } from "next"
import classnames from "classnames"
import { endOldClub, getFullDate, openTime, startOldClub } from "@config/time"
import { ArrowLeftIcon } from "@heroicons/react/outline"
import { motion } from "framer-motion"
import Image from "next/image"
import { Tooltip } from "@components/dummy/common/Tooltip"
import {convertToStaticFileUri} from "@utilities/files";

export const getStaticProps: GetStaticProps = async () => {
  const data = fs.readFileSync("./_map/links.json")
  const links = JSON.parse(data.toString())

  return {
    props: {
      links: links,
    },
  }
}

const Page = ({ links }) => {
  const { width } = useWindowDimensions()
  const { onReady } = useAuth()
  const [enter, setEnter] = useState(true)
  const [clubData, setClubData] = useState({
    place: "ห้อง 111",
    contact: {
      type: "IG",
      context: "@tucmc_official",
    },
    contact2: {
      type: "FB",
      context: "TUCMC",
    },
    contact3: {},
    message: "ส่วนนี้เป็นข้อความที่ชมรมจะแจ้งสมาชิกใหม่ เพื่อให้รับทราบข้อมูลต่าง ๆ ไปจนถึงข้อความทักทาย",
  })
  const [reload, setReload] = useState(false)
  const [auditionList, setAuditionList] = useState(<></>)
  const [userData, setUserData] = useState<any>({})
  const [hideA, setHideA] = useState(false)
  const [completeHide, setCompHide] = useState(false)

  const [link, setLink] = useState("")

  const reFetch = () => {
    setReload(true)
  }

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem("dummyData") || "{}")
    const club = localStorage.getItem("dummyClub") || ""

    if (club === "") {
      Router.push("/dummy/select")
    }

    setUserData({ ...d, club: club, title: "ผู้ใช้ " })

    setReload(false)
  }, [reload])

  useEffect(() => {
    if (userData && userData.club) {
      setLink(links[userData.club] || "")
    }
  }, [userData])

  let cardWidth,
    padding = 18,
    maxWidth = 480

  if (width < maxWidth) {
    cardWidth = width - 2 * padding
  } else {
    cardWidth = maxWidth - 2 * padding
  }

  const imgUrl = `/api/renderCard?id=${userData.cardID}`

  const download = () => {
    const a = document.createElement("a")
    a.href = imgUrl
    a.download = "Card.png"
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <PageContainer>
      <div className={classnames("fixed top-0 z-[98] mx-auto flex w-full justify-center", completeHide && "hidden")}>
        <motion.div
          onClick={() => {
            setHideA(true)
          }}
          animate={hideA ? { y: -80 } : { y: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => {
            hideA &&
              setTimeout(() => {
                setCompHide(false)
                setHideA(false)
              }, 9000)
            setCompHide(hideA)
          }}
          className="flex items-center py-2 pl-4 pr-6 space-x-2 rounded-md shadow-md cursor-pointer bg-TUCMC-orange-500"
        >
          <ExclamationIcon className="w-10 h-10 mt-2 text-white animate-pulse" />
          <div>
            <div className="flex items-center space-x-2 font-medium text-white">
              <h1>คุณกำลังอยู่ในโหมดระบบจำลอง</h1>
            </div>
            <div className="flex justify-center text-sm text-white">
              <p>ทุกการกระทำในโหมดนี้จะไม่มีผลในระบบจริง</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        {/* <div className="flex flex-col max-w-md mx-auto mt-10 space-y-3 px-7">
          <Button
            disabled={link === ""}
            href={link}
            className={classnames(
              "flex cursor-pointer items-center justify-center space-x-2 rounded-md border bg-white p-5 ",
              link === "" ? "border-TUCMC-gray-500 text-TUCMC-gray-500" : "border-TUCMC-green-500 text-TUCMC-green-500"
            )}
          >
            <ClipboardCopyIcon className={classnames("h-5 w-5", link === "" && "hidden")} />
            <span>{link === "" ? "ไม่พบข้อมูลห้องเรียน" : "เข้าเรียนออนไลน์"}</span>
          </Button>
        </div> */}
        <div className="flex justify-center py-10">
          <Card
            width={cardWidth}
            userData={userData}
            clubData={clubData}
            customURL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </div>
        <motion.div
          initial={{ y: -200, x: 300 }}
          animate={enter ? { x: 40 } : { x: -width - 250, y: -300 }}
          transition={{ duration: 1, delay: enter ? 1 : 1 }}
          className="fixed bottom-0 right-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={enter ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: enter ? 2 : 0 }}
            onAnimationComplete={() => {
              enter &&
                setTimeout(() => {
                  setEnter(false)
                }, 15000)
            }}
          >
            <Tooltip type="right" className="top-[50px] left-[-250px]">
              เย่ ! ลงทะเบียนชมรมสำเร็จแล้ว <br /> แต่ว่านี
              <span className="font-bold">เป็นเพียงแค่การจำลองเท่านั้น</span> <br /> น้อง ๆ อย่าลืม ลงทะเบียนในวันจริง
              <br />
              วันที่ {getFullDate(openTime)} ด้วยนะ
            </Tooltip>
          </motion.div>
          <Image src={convertToStaticFileUri("/assets/dummy/duck.png")} width={108} height={144} />
        </motion.div>
        <div
          onClick={() => {
            Router.push("/dummy/select")
          }}
          className="fixed flex items-center px-6 py-2 space-x-2 font-semibold text-white rounded-full cursor-pointer left-4 bottom-4 bg-TUCMC-pink-400"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <h1>กลับสู่หน้าเลือกชมรมอีกครั้ง</h1>
        </div>
      </div>
    </PageContainer>
  )
}

export default Page
