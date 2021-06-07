import PageContainer from "@components/common/PageContainer";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {useEffect, useRef, useState} from "react";
import {fetchUserCred} from "@client/fetcher/user";
import {useToast} from "@components/common/Toast/ToastContext";
import {ClipboardCheckIcon, ExclamationCircleIcon, LockClosedIcon, LockOpenIcon, PencilIcon, XIcon} from "@heroicons/react/solid";
import {Input} from "@components/auth/Input";
import {Button} from "@components/common/Inputs/Button";
import classnames from "classnames"
import {Switch} from '@headlessui/react'
import css from "@components/panel/element/bubble.module.css";
import Modal from "@components/common/Modals";
import {addBrowser, removeBrowser, toggleSafeMode} from "@client/accManagement";
import {clubMap} from "../config/clubMap";
import {isEmpty} from "@utilities/object";

const fetchCred = async (setUserCred, errHandler) => {
  const res = await fetchUserCred()
  if (res.status) return setUserCred(res.data)
  errHandler(res.report)
}


const Account = () => {

  const {onReady, reFetch} = useAuth()
  const [userCred, setUserCred] = useState({email: "", phone: "", authorised: [], safeMode: false})
  const [oldPass, setOldPass] = useState("")
  const [whitelistMode, setWhitelistMode] = useState(false)
  const auTrigger = useRef(null)

  const {addToast} = useToast()

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")
    return userData
  })

  const commonError = (report) => {
    switch (report) {
      case "sessionError" :
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
          crossPage: true
        })
        reFetch()
        break
      case "browserExisted" :
        addToast({
          theme: "modern",
          icon: "cross",
          title: "มีเบราว์เซอร์นี้อยู่แล้วในระบบ",
          text: "เบราว์เซอร์นี้อยู่ในรายการเบราว์เซอร์ที่ปลอดภัยอยู่แล้ว"
        })
        break
      case "dataError" :
        addToast({
          theme: "modern",
          icon: "cross",
          title: "ข้อมูลไม่ถูกต้อง",
          text: "กรุณาลองส่งข้อมูลใหม่อีกครั้ง"
        })
        break
    }
  }

  const reFetchCred = () => {
    fetchCred(setUserCred, commonError)
  }

  useEffect(() => {
    reFetchCred()
  }, [])

  const addBrow = async () => {
    const res = await addBrowser()
    if (res.status) {
      reFetchCred()
    } else {
      commonError(res.report)
    }
  }

  useEffect(() => {
    if (userCred.email === "") return
    if (userCred.safeMode) {
      setWhitelistMode(userCred.safeMode)
    }
    if (userCred.authorised.length <= 0){
      setWhitelistMode(false)
    }
  }, [userCred])

  useEffect(() => {
    if (userCred.email === "") return
    if (("safeMode" in userCred) && userCred.safeMode === whitelistMode) return
    toggleWhitelistMode()
  }, [whitelistMode])

  const toggleWhitelistMode = async () => {
    const res = await toggleSafeMode(whitelistMode)
    if (res.status) {
      reFetchCred()
    } else {
      commonError(res.report)
    }
  }

  const removeBrows = async (browserID) => {
    const res = await removeBrowser(browserID)
    if (res.status) {
      reFetchCred()
    } else {
      commonError(res.report)
    }
  }

  return (
    <PageContainer>
      <div className="relative pt-10 pb-14 bg-TUCMC-gray-100">
        <h1 className="text-2xl text-center font-medium">จัดการบัญชีผู้ใช้</h1>
        <div className="absolute w-full px-4 -bottom-5">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-[0.54rem] border border-gray-300 flex justify-center"><span
            className="text-TUCMC-gray-600">{userData && (userData.club !== "" ? clubMap[userData.club] : "ยังไม่มีชมรม")}</span></div>
        </div>
      </div>
      <div className="pt-8 pb-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col mt-14 space-y-14 px-2 md:px-4">
          <div>
            <h1 className="text-xl border-b border-gray-200 pb-4">ข้อมูลผู้ใช้งาน</h1>
            <div className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-y-0 md:space-x-52">
              <h1 className="text-TUCMC-gray-500">ชื่อ นามสกุล</h1>
              <h1>{userData.title}{userData.firstname} {userData.lastname}</h1>
            </div>
            <div
              className="flex items-center border-b border-gray-200 py-4 md:py-6 space-x-8 md:flex-col md:items-start md:space-x-0 md:space-y-1">
              <div className="space-y-1 md:flex md:items-center md:space-y-0 md:space-x-52">
                <h1 className="text-TUCMC-gray-500">รหัสนักเรียน</h1>
                <h1>{userData.student_id}</h1>
              </div>
              <div className="space-y-1 md:flex md:items-center md:space-y-0 md:space-x-64">
                <h1 className="text-TUCMC-gray-500">เลขที่</h1>
                <h1>{userData.number}</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center border-b border-gray-200 py-4 md:py-6 space-x-[3.8rem]">
              <div className="flex items-center space-x-48">
                <h1 className="text-TUCMC-gray-500">ระดับชั้น / ห้อง</h1>
                <h1>ม.{userData.level} / {userData.room}</h1>
              </div>
            </div>
            <div className="flex md:hidden items-center border-b border-gray-200 py-4 md:py-6 space-x-[3.8rem]">
              <div className="space-y-1">
                <h1 className="text-TUCMC-gray-500">ระดับชั้น</h1>
                <h1>ม.{userData.level}</h1>
              </div>
              <div className="space-y-1">
                <h1 className="text-TUCMC-gray-500">ห้อง</h1>
                <h1>{userData.room}</h1>
              </div>
            </div>
            <div className="border-b border-gray-200 py-4 space-y-1 md:flex md:space-y-0 md:py-6 md:space-x-[11.5rem]">
              <h1 className="text-TUCMC-gray-500 flex-shrink-0">Email address</h1>
              <div className="flex justify-start w-full">
                <h1>{userCred.email}</h1>
              </div>
            </div>
            <div className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:space-y-0 md:space-x-[12.2rem]">
              <h1 className="text-TUCMC-gray-500">เบอร์โทรศัพท์</h1>
              <h1><span
                className="text-TUCMC-gray-700">+66 </span>{userCred.phone.charAt(0) === "0" ? userCred.phone.slice(1, userCred.phone.length) : userCred.phone}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Account