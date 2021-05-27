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
        <h1 className="text-2xl text-center font-medium">ข้อมูลบัญชีผู้ใช้</h1>
        <div className="absolute w-full px-4 -bottom-5">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-[0.54rem] border border-gray-300 flex justify-center"><span
            className="text-TUCMC-gray-600">{userData && (userData.club !== "" ? clubMap[userData.club] : "ยังไม่มีชมรม")}</span></div>
        </div>
      </div>
      <div className="pt-8 pb-20 px-4 max-w-6xl mx-auto">
        <div className="flex space-x-1 max-w-xl mx-auto">
          <div className="relative w-1/2">
            <div ref={auTrigger}
                 className="flex items-center justify-center bg-TUCMC-pink-400 rounded-lg shadow-sm px-4 py-3.5 text-white space-x-2">
              <ClipboardCheckIcon className="w-5 h-5"/><span>ชมรมที่ Audition</span></div>
            <Modal TriggerRef={auTrigger} CloseID="audiClose"
                   className="shadow-md rounded-lg absolute w-full mt-1 z-20">
              <div
                className="flex items-start rounded-t-lg text-sm justify-between bg-gray-50 text-gray-500 py-2 px-4">
                <h1 className="mt-1">รายชื่อชมรมที่ลงชื่อ Audition ไว้</h1>
                <XIcon id="audiClose"
                       className="w-7 h-7 cursor-pointer text-TUCMC-gray-400"/>
              </div>
              <div className="bg-white rounded-b-lg">
                {isEmpty(userData?.audition || {}) ? <h1
                  className="py-4 text-center text-sm text-TUCMC-gray-500">ยังไม่มีชมรมที่ออดิชั่น</h1> : Object.keys(userData.audition)
                                                                                                                .map((val) => {
                                                                                                                  return <h1 key={val}
                                                                                                                             className="py-4 px-4 border-t">{clubMap[val]}</h1>
                                                                                                                })}
              </div>
            </Modal>
          </div>
          <div
            className="flex items-center justify-center bg-TUCMC-white rounded-lg shadow-sm px-4 py-3.5 w-1/2 text-TUCMC-gray-600 space-x-2 border border-TUCMC-gray-400 cursor-not-allowed">
            <ClipboardCheckIcon className="w-5 h-5"/><span>ผลการ Audition</span></div>
        </div>
        <div className="flex flex-col mt-20 space-y-14 px-2 md:px-4">
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
              <div className="flex justify-between w-full">
                <h1>{userCred.email}</h1>
                <PencilIcon className="w-5 h-5"/>
              </div>
            </div>
            <div className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:space-y-0 md:space-x-[12.2rem]">
              <h1 className="text-TUCMC-gray-500">เบอร์โทรศัพท์</h1>
              <h1><span
                className="text-TUCMC-gray-700">+66 </span>{userCred.phone.charAt(0) === "0" ? userCred.phone.slice(1, userCred.phone.length) : userCred.phone}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-xl border-b border-gray-200 pb-4">ความปลอดภัย</h1>
            <div className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-x-[12.2rem] md:space-y-0">
              <h1 className="text-TUCMC-gray-500">แก้ไขรหัสผ่าน</h1>
              <div className="relative w-full max-w-md">
                <Input placeholder="ป้อนรหัสผ่านก่อนหน้า" type="password" stateUpdate={setOldPass}
                       className="text-md placeholder-gray-400"/>
                <Button
                  className={classnames("absolute top-1.5 right-3 font-medium flex items-center space-x-1 text-sm rounded-full px-4 py-[4px] z-40", oldPass.length >= 8 ? "bg-TUCMC-pink-400 text-white" : "bg-white text-TUCMC-gray-400 border border-TUCMC-gray-400 cursor-default")}>
                  <LockOpenIcon className={classnames("w-4 h-4", oldPass.length < 8 && "hidden")}/><LockClosedIcon
                  className={classnames("w-4 h-4", oldPass.length >= 8 && "hidden")}/><span>Unlock</span>
                </Button>
              </div>
            </div>
            <div className="border-b border-gray-200 py-4 md:py-6 pace-y-4 md:flex md:space-y-0 md:space-x-[9.3rem]">
              <h1 className="text-TUCMC-gray-900">เบราว์เซอร์ที่เชื่อถือได้</h1>
              <div>
                <div className="space-y-2">
                  {userCred.authorised.length > 0 ? userCred.authorised.map((val, index) => (
                    <div key={`trusted-${index}`}
                         className="flex justify-between bg-white rounded-md shadow-md w-full text-sm p-4 max-w-sm">
                      <div className="space-y-1">
                        <div className="flex space-x-2">
                          <h1>Browser:</h1>
                          <h1>{val.browser.name} {val.browser.version} on {val.os.name} ({val.os.version}) {val.device.vendor} {val.device.model} {val.cpu.architecture}</h1>
                        </div>
                        <h1>Client IP: {val.ip}</h1>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="cursor-pointer" onClick={() => {
                          removeBrows(val.id)
                        }}>
                          <XIcon className="w-5 h-5 text-TUCMC-red-400"/>
                        </div>
                        <div className="w-5 h-5 mt-0.5 flex items-center justify-center">
                          <div
                            className={classnames("w-1.5 h-1.5 rounded-full bg-TUCMC-green-400 animate-ping", !val.self && "hidden")}>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : <h1 className="text-center my-10 text-TUCMC-gray-600">ไม่มีเบราว์เซอร์ที่เชื่อถือได้</h1>}
                </div>
                <div className="flex flex-col space-y-4 mt-4">
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={whitelistMode}
                      onChange={setWhitelistMode}
                      className={classnames(
                        whitelistMode ? 'bg-TUCMC-pink-500' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-TUCMC-pink-500'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classnames(
                          whitelistMode ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                    <div className="flex space-x-1 ml-4 items-center">
                      <span className="text-sm font-medium text-gray-900">โหมดความปลอดภัยสูง</span>
                      <div className="relative w-5 h-5">
                        <div className="absolute w-5 h-5 opacity-0 z-30 hover:opacity-100">
                          <div className="absolute -top-14 left-[-8.13rem]">
                            <div
                              className={classnames("bg-white text-xs text-black w-[280px] shadow-md rounded-md p-2", css.tooltip2)}>
                              <h1 className="text-center">หลังจากเปิดใช้งานโหมดความปลอดภัยสูง
                                                          บัญชีนี้จะสามารถเข้าสู่ระบบผ่านอุปกรณ์ที่ได้เพิ่มไว้เท่านั้น</h1></div>
                          </div>
                          <ExclamationCircleIcon className="w-5 h-5 text-TUCMC-red-400"/>
                        </div>
                        <ExclamationCircleIcon className="absolute w-5 h-5 z-[29] text-TUCMC-red-400"/>
                      </div>
                    </div>
                  </Switch.Group>
                  <Button onClick={addBrow} className="bg-TUCMC-pink-400 text-white px-5 py-2 rounded-full">
                    เพิ่มเบราว์เซอร์นี้
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Account