import PageContainer from "@components/common/PageContainer"
import { useAuth } from "@client/auth"
import Router from "next/router"
import Link from "next/link"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { fetchUserCred } from "@client/fetcher/user"
import { useToast } from "@components/common/Toast/ToastContext"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardCheckIcon,
  DownloadIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  MailOpenIcon,
  PencilIcon,
  PlusCircleIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/solid"
import { Input } from "@components/auth/Input"
import { Button } from "@components/common/Inputs/Button"
import classnames from "classnames"
import { Switch } from "@headlessui/react"
import css from "@components/panel/element/bubble.module.css"
import Modal from "@components/common/Modals"
import { addBrowser, removeBrowser, toggleSafeMode } from "@client/accManagement"
import { clubMap } from "@config/clubMap"
import { isEmpty } from "@utilities/object"
import { fetchClub } from "@client/fetcher/panel"
import { useWindowDimensions } from "@utilities/document"
import { GetStaticProps } from "next"
import fs from "fs"
import { CatLoader } from "@components/common/CatLoader"
import { AnimatePresence, motion } from "framer-motion"
import { WaitingScreen } from "@components/common/WaitingScreen"
import { request } from "@client/utilities/request"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"
import { PencilAltIcon } from "@heroicons/react/outline"

const fetchClubData = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>, setInitClub) => {
  const data = await fetchClub(clubID)
  setClubData(data)
  setInitClub(true)
}

const Account = () => {
  const { onReady, reFetch } = useAuth()
  const [userCred, setUserCred] = useState({ email: "", phone: "", authorised: [], safeMode: false })
  const [oldPass, setOldPass] = useState("")
  const [whitelistMode, setWhitelistMode] = useState(false)
  const [clubData, setClubData] = useState({
    new_count: 0,
    new_count_limit: 0,
    place: "",
    audition: false,
    message: "",
    contact: { type: "", context: "" },
    contact2: { type: "", context: "" },
    contact3: { type: "", context: "" },
  })
  const uploader = useRef(null)
  const [boxSize, setBoxSize] = useState(0)
  const auTrigger = useRef(null)
  const [adArr, setAdArr] = useState([])
  const clubsTrigger = useRef(null)
  const box = useRef(null)
  const [closeBox, setCloseBox] = useState(false)
  const [initClub, setInitClub] = useState(false)
  const [display, setDisplay] = useState(false)
  const [t, setT] = useState(false)
  const [uploading, setUploading] = useState(false)

  const { width } = useWindowDimensions()

  const { addToast } = useToast()

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")

    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/select")
    }

    return userData
  })

  const reFetchCred = () => {
    let currPanel = localStorage.getItem("currentPanel")

    if (userData.panelID && (!currPanel || currPanel === "")) {
      currPanel = userData.panelID[0]
      localStorage.setItem("currentPanel", currPanel)
    }

    fetchClubData(currPanel, setClubData, setInitClub)
  }

  useEffect(() => {
    reFetchCred()
  }, [userData])

  useEffect(() => {
    if (box.current) {
      setBoxSize(box.current?.clientWidth)
    }
  }, [box, width])

  useEffect(() => {
    if ("panelID" in userData) {
      const i = [...userData.panelID]
      const index = userData.panelID.indexOf(localStorage.getItem("currentPanel"))
      if (index > -1) {
        i.splice(index, 1)
      }
      setAdArr(i)
    }
  }, [clubData, userData])

  const setCurrentPanel = (id) => {
    localStorage.setItem("currentPanel", id)
    reFetchCred()
    setCloseBox(true)
  }

  const downloadFile = async () => {
    const a = document.createElement("a")
    let currPanel = userData.student_id
    const response = await request("uploader", "getFile", { id: currPanel })

    if (response.status) {
      a.href = response.data.url
      a.download = `${currPanel}.pdf`
      document.body.append(a)
      a.click()
      a.remove()
    }
  }

  const uploadFile = async (e) => {
    const file = e.target.files[0]
    const filename = encodeURIComponent(file.name)
    const currentID = userData.student_id
    setUploading(true)
    const res = await request("uploader", "uploadDoc", { id: currentID, file: filename })

    const { url, fields } = res.data
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value)
    })

    const upload = await fetch(url, {
      mode: "cors",
      method: "POST",
      body: formData,
    })

    if (upload.ok) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "อัปโหลดเอกสารสำเร็จ",
        text: "การอัปโหลดเอกสารสำเร็จแล้ว",
      })
      localStorage.setItem("submitted2", "true")
      setDisplay(false)
    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดของเซสชั่น",
        text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
        crossPage: true,
      })
      setTimeout(() => {
        reFetch()
      }, 2000)
      console.error("Upload failed.")
    }

    setUploading(false)
  }

  useEffect(() => {
    if (userData) {
      if (userData.student_id) {
        if (userData.student_id.includes("ก") && !userData.student_id.includes("-")) {
          const summited = localStorage.getItem("submitted2")
          setT(true)
          if (summited === "true") return
          setDisplay(true)
        }
      }
    }
  }, [userData])

  return new Date().getTime() > 162418320000 ? (
    <PageContainer hide={!initClub}>
      {t && !display && (
        <motion.div
          animate={{ scale: [0.5, 1] }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setDisplay(true)
          }}
          className="fixed top-1 right-1 z-[99] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
        >
          <MailOpenIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-blue-500" />
        </motion.div>
      )}
      {display && (
        <div className="fixed relative top-0 z-[99] flex min-h-screen w-full items-center justify-center bg-gray-700 bg-opacity-20">
          <div className="relative rounded-md bg-white py-4 px-6">
            <XIcon
              onClick={() => {
                setDisplay(false)
              }}
              className="absolute top-5 right-6 h-5 w-5 cursor-pointer text-gray-700 hover:text-TUCMC-red-500"
            />
            <h1 className="mb-4 text-xl font-medium text-gray-800">เอกสารสรุปผลการประเมินชมรม 2/2564</h1>
            <div className="flex flex-col">
              <div className="">
                <a
                  onClick={downloadFile}
                  className="flex cursor-pointer items-center justify-center space-x-2 rounded-md bg-pink-50 py-2 px-4 text-gray-700 hover:text-TUCMC-pink-500 hover:underline"
                >
                  <DownloadIcon className="h-5 w-5" />
                  <span>ดาวน์โหลดแบบสรุปผลการประเมินกิจกรรม</span>
                </a>
              </div>
              <div className="mt-4 mb-4 text-center text-gray-800">
                <p>ดาวน์โหลดเอกสารจากข้อความด้านบนเพื่อนำไปลงลายมือชื่อ</p>
                <p>จากนั้นเซฟเป็นไฟล์ pdf และส่งที่ช่องด้านล่างข้อความนี้</p>
              </div>
              <input className="hidden" ref={uploader} onChange={uploadFile} type="file" accept="application/pdf" />
              <Button
                onClick={() => {
                  uploader.current.click()
                }}
                className={classnames(
                  "bg-TUCMC-white flex cursor-pointer items-center justify-center space-x-2 rounded-lg border border-gray-400 px-4 text-TUCMC-gray-600 shadow-sm shadow-md",
                  !uploading ? "py-3.5" : "py-1.5"
                )}
              >
                {!uploading ? (
                  <>
                    <PlusCircleIcon className="h-[1.1rem] w-[1.1rem]" />
                    <span>ส่งเอกสารของชมรมนี้</span>
                  </>
                ) : (
                  <Ellipsis inverted={true} className="h-10 w-20" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        <div className={classnames("min-h-screen", !initClub && "opacity-0")}>
          <div className="relative bg-TUCMC-gray-100 pt-10 pb-14">
            <h1 className="text-center text-2xl font-medium">แผงควบคุม</h1>
            <div className="absolute -bottom-5 w-full px-4">
              <div
                ref={box}
                className="relative mx-auto flex max-w-xl justify-center rounded-lg border border-gray-300 bg-white shadow-sm"
              >
                <div className="flex h-full w-full justify-end">
                  <div className="flex w-full justify-center overflow-hidden overflow-clip py-[0.54rem]">
                    <span className="whitespace-nowrap text-TUCMC-gray-600">
                      {userData && "panelID" in userData && clubMap[localStorage.getItem("currentPanel")]}
                    </span>
                  </div>
                  <div
                    ref={clubsTrigger}
                    className={classnames(
                      "flex w-12 cursor-pointer items-center justify-center border-l border-gray-300",
                      !(userData.panelID && userData.panelID.length > 1) && "hidden"
                    )}
                  >
                    <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <Modal
                  TriggerRef={clubsTrigger}
                  CloseDep={{
                    dep: closeBox,
                    revert: () => {
                      setCloseBox(false)
                    },
                  }}
                  className="absolute left-[-1px] top-[-5px] z-10 mx-auto mt-1 rounded-lg border border-gray-300 shadow-md"
                >
                  <div className="flex h-full justify-end rounded-t-lg bg-white">
                    <div className="flex w-full justify-center overflow-hidden overflow-clip py-[0.54rem]">
                      <span className="whitespace-nowrap text-TUCMC-gray-600">
                        {userData && "panelID" in userData && clubMap[localStorage.getItem("currentPanel")]}
                      </span>
                    </div>
                    <div
                      id="clubsClose"
                      className="flex w-12 cursor-pointer items-center justify-center border-l border-gray-300"
                    >
                      <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  <div style={{ width: `${boxSize}px` }} className="w-full rounded-b-lg bg-white pb-1">
                    {adArr &&
                      adArr.map((val) => {
                        return (
                          <h1
                            key={val}
                            onClick={() => {
                              setCurrentPanel(val)
                            }}
                            className="cursor-pointer truncate whitespace-nowrap border-t py-[0.54rem] px-4 text-center text-TUCMC-gray-600 hover:bg-gray-100"
                          >
                            {clubMap[val]}
                          </h1>
                        )
                      })}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-4 pt-8 pb-20">
            <div className="mx-auto flex max-w-xl space-x-1">
              <div className="relative w-1/2">
                <Button
                  type="div"
                  href="/panel/attendance"
                  className="flex items-center justify-center space-x-2 rounded-lg bg-TUCMC-pink-400 px-4 py-3.5 text-white shadow-sm"
                >
                  <ClipboardCheckIcon className="h-5 w-5" />
                  <span>รายงานการเข้าเรียน</span>
                </Button>
              </div>
              <Button
                href="/panel/report"
                type="div"
                className="bg-TUCMC-white flex w-1/2 cursor-pointer items-center justify-center space-x-2 rounded-lg px-4 py-3.5 text-TUCMC-gray-600 shadow-sm shadow-md"
              >
                <UserGroupIcon className="h-6 w-6" />
                <span>รายชื่อสมาชิก</span>
              </Button>
            </div>
            <div className="mt-20 flex flex-col space-y-14 px-2 md:px-4">
              <div>
                <h1 className="border-b border-gray-200 pb-4 text-xl">ข้อมูลชมรม</h1>
                <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:items-center md:space-y-0 md:space-x-52 md:py-6">
                  <h1 className="text-TUCMC-gray-500">ประเภทการรับสมัคร</h1>
                  <div className="flex space-x-2">
                    <p>{clubData.audition ? "" : "ไม่"} Audition</p>
                    {/* <button>
                      <PencilIcon className="h-5 w-5" />
                    </button> */}
                  </div>
                </div>
                <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:items-center md:space-y-0 md:space-x-[183px] md:py-6">
                  <h1 className="text-TUCMC-gray-500">ข้อความถึงสมาชิกชมรม</h1>
                  <h1>{clubData.message}</h1>
                </div>
                <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:items-center md:space-y-0 md:space-x-[184px] md:py-6">
                  <h1 className="text-TUCMC-gray-500">ช่องทางการติดต่อชมรม</h1>
                  <div>
                    <p className={classnames(isEmpty(clubData.contact) ? "hidden" : "block")}>
                      {clubData.contact?.type} : {clubData.contact?.context}
                    </p>
                    <p className={classnames(isEmpty(clubData.contact2) ? "hidden" : "block")}>
                      {clubData.contact2?.type} : {clubData.contact2?.context}
                    </p>
                    <p className={classnames(isEmpty(clubData.contact3) ? "hidden" : "block")}>
                      {clubData.contact3?.type} : {clubData.contact3?.context}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:items-center md:space-y-0 md:space-x-[165px] md:py-6">
                  <h1 className="text-TUCMC-gray-500">สถานที่ทำการเรียนการสอน</h1>
                  <h1>{clubData.place}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!initClub && <CatLoader key="cat" />}
      </AnimatePresence>
    </PageContainer>
  ) : (
    <WaitingScreen target={162418320000} />
  )
}

export default Account
