import PageContainer from "@components/common/PageContainer";
import {useAuth} from "@client/auth";
import Router from "next/router";
import Link from "next/link"
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {fetchUserCred} from "@client/fetcher/user";
import {useToast} from "@components/common/Toast/ToastContext";
import {
  ChevronDownIcon, ChevronUpIcon,
  ClipboardCheckIcon, DownloadIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  LockOpenIcon, MailOpenIcon,
  PencilIcon, PlusCircleIcon, UserGroupIcon,
  XIcon
} from "@heroicons/react/solid";
import {Input} from "@components/auth/Input";
import {Button} from "@components/common/Inputs/Button";
import classnames from "classnames"
import {Switch} from '@headlessui/react'
import css from "@components/panel/element/bubble.module.css";
import Modal from "@components/common/Modals";
import {addBrowser, removeBrowser, toggleSafeMode} from "@client/accManagement";
import {clubMap} from "@config/clubMap";
import {isEmpty} from "@utilities/object";
import {fetchClub} from "@client/fetcher/panel";
import {useWindowDimensions} from "@utilities/document";
import {GetStaticProps} from "next";
import fs from "fs";
import {CatLoader} from "@components/common/CatLoader";
import {AnimatePresence, motion} from "framer-motion";
import {WaitingScreen} from "@components/common/WaitingScreen";
import {request} from "@client/utilities/request";

const fetchClubData = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>, setInitClub) => {
  const data = await fetchClub(clubID)
  setClubData(data)
  setInitClub(true)
}

const Account = () => {

  const {onReady, reFetch} = useAuth()
  const [userCred, setUserCred] = useState({email: "", phone: "", authorised: [], safeMode: false})
  const [oldPass, setOldPass] = useState("")
  const [whitelistMode, setWhitelistMode] = useState(false)
  const [clubData, setClubData] = useState({
    new_count: 0, new_count_limit: 0, place: "", audition: false, message: "", contact: {type: "", context: ""},
    contact2: {type: "", context: ""}, contact3: {type: "", context: ""}
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

  const {width} = useWindowDimensions()

  const {addToast} = useToast()

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")

    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/select");
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
    const response = await request("uploader", "getFile", {id: currPanel})

    if (response.status) {
      a.href = response.data.url
      a.download = `${currPanel}.pdf`
      document.body.append(a)
      a.click()
      a.remove()
    }
  }

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const currentID = userData.student_id
    const res = await request("uploader","uploadDoc", {id: currentID, file: filename})

    const { url, fields } = res.data
    const formData = new FormData();


    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      mode: "cors",
      method: 'POST',
      body: formData,
    });


    if (upload.ok) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "อัปโหลดเอกสารสำเร็จ",
        text: "การอัปโหลดเอกสารสำเร็จแล้ว"
      })
      localStorage.setItem("submitted", "true")
      setDisplay(false)
    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดของเซสชั่น",
        text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
        crossPage: true
      })
      setTimeout(() => {
        reFetch()
      }, 2000)
      console.error('Upload failed.');
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData.student_id){
        if (userData.student_id.includes("ก") && !userData.student_id.includes("-")) {
          const summited = localStorage.getItem("submitted")
          setT(true)
          if (summited === "true") return
          setDisplay(true)
        }
      }
    }
  }, [userData])


  return (
    (new Date().getTime() > 162418320000) ? <PageContainer hide={!initClub}>
      {t && (!display && <motion.div animate={{scale: [0.5, 1]}} transition={{duration: 0.2}} whileHover={{scale: 1.1}} onClick={() => {setDisplay(true)}} className="flex items-center justify-center w-10 h-10 fixed top-1 right-1 z-[99] bg-white rounded-full shadow-md">
        <MailOpenIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-500"/>
      </motion.div>)}
      {display && <div className="flex justify-center items-center fixed w-full min-h-screen top-0 relative z-[99] bg-gray-700 bg-opacity-20">
        <div className="bg-white py-4 px-6 rounded-md relative">
          <XIcon onClick={() => {setDisplay(false)}} className="absolute w-5 h-5 top-5 right-6 text-gray-700 cursor-pointer hover:text-TUCMC-red-500"/>
          <h1 className="font-medium text-xl mb-4 text-gray-800">เอกสารสรุปผลการประเมินชมรม</h1>
          <div className="flex flex-col">
            <div className="">
              <a onClick={downloadFile}
                 className="flex items-center justify-center space-x-2 bg-pink-50 py-2 rounded-md px-4 text-gray-700 hover:text-TUCMC-pink-500 hover:underline cursor-pointer">
                <DownloadIcon className="w-5 h-5"/><span>ดาวน์โหลดแบบสรุปผลการประเมินกิจกรรม</span>
              </a>
            </div>
            <div className="text-gray-800 text-center mt-4 mb-4">
              <p>ดาวน์โหลดเอกสารจากข้อความด้านบนเพื่อนำไปลงลายมือชื่อ</p>
              <p>จากนั้นเซฟเป็นไฟล์ pdf และส่งที่ช่องด้านล่างข้อความนี้</p>
            </div>
            <input
              className="hidden"
              ref={uploader}
              onChange={uploadPhoto}
              type="file"
              accept="application/pdf"
            />
            <Button onClick={() => {
              uploader.current.click()
            }}
                    className="flex items-center justify-center border border-gray-400 bg-TUCMC-white rounded-lg shadow-sm px-4 py-3.5 text-TUCMC-gray-600 space-x-2 shadow-md cursor-pointer">
              <PlusCircleIcon className="w-[1.1rem] h-[1.1rem]"/>
              <span>ส่งเอกสารของชมรมนี้</span>
            </Button>
          </div>
        </div>
      </div>}
      <AnimatePresence>
      <div className={classnames("min-h-screen", !initClub && "opacity-0")}>
        <div className="relative pt-10 pb-14 bg-TUCMC-gray-100">
          <h1 className="text-2xl text-center font-medium">แผงควบคุม</h1>
          <div className="absolute w-full px-4 -bottom-5">
            <div ref={box}
                 className="relative max-w-xl mx-auto rounded-lg bg-white shadow-sm border border-gray-300 flex justify-center">
              <div className="flex justify-end w-full h-full">
                <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                    <span
                      className="text-TUCMC-gray-600 whitespace-nowrap">{userData && ("panelID" in userData && clubMap[localStorage.getItem("currentPanel")])}</span>
                </div>
                <div ref={clubsTrigger}
                     className={classnames("flex justify-center items-center border-l border-gray-300 w-12 cursor-pointer", !(userData.panelID && userData.panelID.length > 1) && "hidden")}>
                  <ChevronDownIcon className="w-6 h-6 text-gray-500"/>
                </div>
              </div>
              <Modal TriggerRef={clubsTrigger}
                     CloseDep={{
                       dep: closeBox, revert: () => {
                         setCloseBox(false)
                       }
                     }}
                     className="shadow-md rounded-lg absolute mx-auto mt-1 z-10 left-[-1px] top-[-5px] border border-gray-300">
                <div
                  className="flex justify-end rounded-t-lg bg-white h-full">
                  <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                      <span
                        className="text-TUCMC-gray-600 whitespace-nowrap">{userData && ("panelID" in userData && clubMap[localStorage.getItem("currentPanel")])}</span>
                  </div>
                  <div id="clubsClose" className="flex justify-center items-center border-l border-gray-300 w-12 cursor-pointer">
                    <ChevronUpIcon className="w-6 h-6 text-gray-500"/>
                  </div>
                </div>
                <div style={{width: `${boxSize}px`}} className="bg-white w-full rounded-b-lg pb-1">
                  {
                    adArr && adArr
                      .map((val) => {
                        return <h1 key={val}
                                   onClick={() => {
                                     setCurrentPanel(val)
                                   }}
                                   className="py-[0.54rem] text-center text-TUCMC-gray-600 hover:bg-gray-100 cursor-pointer whitespace-nowrap border-t truncate px-4">{clubMap[val]}</h1>
                      })
                  }
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="pt-8 pb-20 px-4 max-w-6xl mx-auto">
          <div className="flex space-x-1 max-w-xl mx-auto">
              <div className="relative w-1/2">
                <Button disabled={true} type="div" href="#"
                        className="flex items-center justify-center bg-TUCMC-pink-400 rounded-lg shadow-sm px-4 py-3.5 text-white space-x-2">
                  <ClipboardCheckIcon className="w-5 h-5"/><span>รายงานการเข้าเรียน</span>
                </Button>
              </div>
              <Button href="/panel/report" type="div"
                      className="flex items-center justify-center bg-TUCMC-white rounded-lg shadow-sm px-4 py-3.5 w-1/2 text-TUCMC-gray-600 space-x-2 shadow-md cursor-pointer">
                <UserGroupIcon className="w-6 h-6"/><span>รายชื่อสมาชิก</span></Button>
            </div>
          <div className="flex flex-col mt-20 space-y-14 px-2 md:px-4">
            <div>
              <h1 className="text-xl border-b border-gray-200 pb-4">ข้อมูลชมรม</h1>
              <div className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-y-0 md:space-x-52">
                <h1 className="text-TUCMC-gray-500">ประเภทการรับสมัคร</h1>
                <h1>{clubData.audition ? "" : "ไม่"} Audition</h1>
              </div>
              <div
                className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-y-0 md:space-x-[183px]">
                <h1 className="text-TUCMC-gray-500">ข้อความถึงสมาชิกชมรม</h1>
                <h1>{clubData.message}</h1>
              </div>
              <div
                className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-y-0 md:space-x-[184px]">
                <h1 className="text-TUCMC-gray-500">ช่องทางการติดต่อชมรม</h1>
                <div>
                  <p
                    className={classnames(isEmpty(clubData.contact) ? "hidden" : "block")}>{clubData.contact?.type} : {clubData.contact?.context}</p>
                  <p
                    className={classnames(isEmpty(clubData.contact2) ? "hidden" : "block")}>{clubData.contact2?.type} : {clubData.contact2?.context}</p>
                  <p
                    className={classnames(isEmpty(clubData.contact3) ? "hidden" : "block")}>{clubData.contact3?.type} : {clubData.contact3?.context}</p>
                </div>
              </div>
              <div
                className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-y-0 md:space-x-[165px]">
                <h1 className="text-TUCMC-gray-500">สถานที่ทำการเรียนการสอน</h1>
                <h1>{clubData.place}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
        {!initClub && <CatLoader key="cat"/>}
      </AnimatePresence>
    </PageContainer> : <WaitingScreen target={162418320000}/>
  )
}

export default Account
