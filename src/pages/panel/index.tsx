import PageContainer from "@components/common/PageContainer";
import {useAuth} from "@client/auth";
import Router from "next/router";
import Link from "next/link"
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {fetchUserCred} from "@client/fetcher/user";
import {useToast} from "@components/common/Toast/ToastContext";
import {
  ChevronDownIcon, ChevronUpIcon,
  ClipboardCheckIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon, UserGroupIcon,
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
  const [boxSize, setBoxSize] = useState(0)
  const auTrigger = useRef(null)
  const [adArr, setAdArr] = useState([])
  const clubsTrigger = useRef(null)
  const box = useRef(null)
  const [closeBox, setCloseBox] = useState(false)
  const [initClub, setInitClub] = useState(false)

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
      setTimeout(() => {
        setBoxSize(box.current?.clientWidth)
      }, 200)
    }
  }, [userData])

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

  return (
    <PageContainer hide={!initClub}>
      <AnimatePresence>
      {initClub ? <div className="min-h-screen">
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
          {clubData.audition ? <div className="flex space-x-1 max-w-xl mx-auto">
              <div className="relative w-1/2">
                <Button type="div" href="/panel/audition"
                        className="flex items-center justify-center bg-TUCMC-pink-400 rounded-lg shadow-sm px-4 py-3.5 text-white space-x-2">
                  <ClipboardCheckIcon className="w-5 h-5"/><span>ผลการ Audition</span>
                </Button>
              </div>
              <Button href="/panel/report" type="div"
                      className="flex items-center justify-center bg-TUCMC-white rounded-lg shadow-sm px-4 py-3.5 w-1/2 text-TUCMC-gray-600 space-x-2 shadow-md cursor-pointer">
                <UserGroupIcon className="w-6 h-6"/><span>รายชื่อสมาชิก</span></Button>
            </div> :
            <Button href="/panel/report" type="div" className="max-w-xl mx-auto">
              <div
                className="flex items-center justify-center bg-TUCMC-white rounded-lg shadow-sm px-4 py-3.5 text-TUCMC-gray-600 space-x-2 shadow-md cursor-pointer">
                <UserGroupIcon className="w-6 h-6"/><span>รายชื่อสมาชิก</span></div>
            </Button>
          }
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
      </div> : <CatLoader key="cat"/>}
      </AnimatePresence>
    </PageContainer>
  )
}

export default Account