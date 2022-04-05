import PageContainer from "@components/common/PageContainer"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { useEffect, useRef, useState } from "react"
import { fetchUserCred } from "@client/fetcher/user"
import { useToast } from "@components/common/Toast/ToastContext"
import {
  ClipboardCheckIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/solid"
import { Input } from "@components/auth/Input"
import { Button } from "@components/common/Inputs/Button"
import classnames from "classnames"
import { Switch } from "@headlessui/react"
import css from "@components/panel/element/bubble.module.css"
import Modal from "@components/common/Modals"
import { addBrowser, removeBrowser, toggleBeta, toggleSafeMode } from "@client/accManagement"
import { clubMap } from "../config/clubMap"
import { isEmpty } from "@utilities/object"
import { ExclamationIcon } from "@heroicons/react/outline"

const fetchCred = async (setUserCred, errHandler) => {
  const res = await fetchUserCred()
  if (res.status) return setUserCred(res.data)
  errHandler(res.report)
}

const Account = () => {
  const { onReady, reFetch } = useAuth()
  const [userCred, setUserCred] = useState({ email: "", phone: "", authorised: [], safeMode: false, beta: [] })
  const [oldPass, setOldPass] = useState("")
  const [betaAlert, setBetaAlert] = useState(false)
  const [whitelistMode, setWhitelistMode] = useState(false)
  const [closeDep, setCloseDep] = useState(false)
  const [rememberedCalls, setRCalls] = useState({ call: () => {} })
  const auTrigger = useRef(null)

  const { addToast } = useToast()

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")
    return userData
  })

  const commonError = (report) => {
    switch (report) {
      case "sessionError":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
          crossPage: true,
        })
        reFetch()
        break
      case "browserExisted":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "มีเบราว์เซอร์นี้อยู่แล้วในระบบ",
          text: "เบราว์เซอร์นี้อยู่ในรายการเบราว์เซอร์ที่ปลอดภัยอยู่แล้ว",
        })
        break
      case "dataError":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "ข้อมูลไม่ถูกต้อง",
          text: "กรุณาลองส่งข้อมูลใหม่อีกครั้ง",
        })
        break
    }
  }

  const reFetchCred = () => {
    fetchCred(setUserCred, commonError)
  }

  useEffect(() => {
    reFetchCred()

    if (localStorage.getItem("alert") === "denied") {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "คุณไม่มีสิทธิ์ในการเลือกชมรมในรอบนี้",
        text: "สำหรับผู้ที่ไม่ได้มีการลงชื่อออดิชั่นชมรมมาก่อนหน้าหรือไม่ได้เลือกชมรมใดเลยในรอบแรก จะต้องรอสุ่มชมรมเท่านั้น",
        lifeSpan: 10000,
      })
      localStorage.setItem("alert", "")
    }
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
    if (userCred.authorised.length <= 0) {
      setWhitelistMode(false)
    }
  }, [userCred])

  useEffect(() => {
    if (userCred.email === "") return
    if ("safeMode" in userCred && userCred.safeMode === whitelistMode) return
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

  const betaAccess = (callback) => {
    if (userCred.beta.includes("privacyOps")) {
      callback()
    } else {
      setRCalls({ call: callback })
      setBetaAlert(true)
    }
  }

  const togglePrivacyBetaOn = async () => {
    const res = await toggleBeta("privacyOps")
    if (res.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "เปิดใช้งานส่วนความปลอดภัย (Beta) สำเร็จ",
        text: "เปิดใช้ส่วนที่เป็นโหมดทดลองใช้เสร็จสิ้น การเปิดใช้งานถือเป็นการยอมรับความเสียหายที่อาจะเกิดขึ้นกับบัญชี",
      })
      setCloseDep(true)
      rememberedCalls.call()
    } else {
      commonError(res.report)
    }
  }

  return (
    <PageContainer>
      <Modal
        CloseDep={{
          dep: closeDep,
          revert: () => {
            setCloseDep(false)
          },
        }}
        CloseID="betaClose"
        className="flex max-w-[420px] flex-col space-y-3 rounded-md bg-white px-7 py-5 shadow-md"
        overlayClassName="fixed flex justify-center px-4 items-center top-0 left-0 min-h-screen w-full bg-TUCMC-gray-800 bg-opacity-50 z-[50]"
        closeClickOutside={true}
        TriggerDep={{
          dep: betaAlert,
          revert: () => {
            setBetaAlert(false)
          },
        }}
      >
        <div className="flex items-center space-x-2">
          <ExclamationIcon className="h-6 w-6 text-yellow-400" />
          <h1 className="text-lg font-medium text-TUCMC-gray-900">ฟีเจอร์นี้ยังอยู่ในขั้นตอนการทดลองใช้</h1>
        </div>
        <p className="pt-2 text-TUCMC-gray-700">
          ฟีเจอร์นี้ยังอยู่ในขั้นทดลองใช้ ซึ่งการทำงานของระบบอาจจะไม่เสถียรและสามารถก่อให้เกิดปัญหาต่อบัญชีได้
          หากผู้ใช้ต้องการที่จะใช้งานฟีเจอร์นี้ผู้ใช้จะต้องยอมรับความเสียหายที่อาจะเกิดขึ้นต่อบัญชี
        </p>
        <div className="flex justify-end space-x-2 pt-1">
          <div
            id="betaClose"
            className="cursor-pointer rounded-md border border-TUCMC-gray-400 px-4 py-1 text-TUCMC-gray-700 hover:border-TUCMC-red-400 hover:bg-TUCMC-red-400 hover:text-white"
          >
            ยกเลิก
          </div>
          <Button
            onClick={togglePrivacyBetaOn}
            className="rounded-md border border-TUCMC-gray-400 px-4 py-1 text-TUCMC-gray-700 hover:border-yellow-400 hover:bg-yellow-400 hover:text-white"
          >
            เปิดใช้งาน
          </Button>
        </div>
      </Modal>
      <div className="relative bg-TUCMC-gray-100 pt-10 pb-14">
        <h1 className="text-center text-2xl font-medium">จัดการบัญชีผู้ใช้</h1>
        <div className="absolute -bottom-5 w-full px-4">
          <div className="mx-auto flex max-w-xl justify-center rounded-lg border border-gray-300 bg-white p-[0.54rem] shadow-sm">
            <span className="text-TUCMC-gray-600">
              {userData && (userData.club !== "" ? clubMap[userData.club] : "ยังไม่มีชมรม")}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-20">
        <div className="mt-14 flex flex-col space-y-14 px-2 md:px-4">
          <div>
            <h1 className="border-b border-gray-200 pb-4 text-xl">ข้อมูลผู้ใช้งาน</h1>
            <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:items-center md:space-y-0 md:space-x-52 md:py-6">
              <h1 className="text-TUCMC-gray-500">ชื่อ นามสกุล</h1>
              <h1>
                {userData.title}
                {userData.firstname} {userData.lastname}
              </h1>
            </div>
            <div className="flex items-center space-x-8 border-b border-gray-200 py-4 md:flex-col md:items-start md:space-x-0 md:space-y-1 md:py-6">
              <div className="space-y-1 md:flex md:items-center md:space-y-0 md:space-x-52">
                <h1 className="text-TUCMC-gray-500">รหัสนักเรียน</h1>
                <h1>{userData.student_id}</h1>
              </div>
              <div className="space-y-1 md:flex md:items-center md:space-y-0 md:space-x-64">
                <h1 className="text-TUCMC-gray-500">เลขที่</h1>
                <h1>{userData.number}</h1>
              </div>
            </div>
            <div className="hidden items-center space-x-[3.8rem] border-b border-gray-200 py-4 md:flex md:py-6">
              <div className="flex items-center space-x-48">
                <h1 className="text-TUCMC-gray-500">ระดับชั้น / ห้อง</h1>
                <h1>
                  ม.{userData.level} / {userData.room}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-[3.8rem] border-b border-gray-200 py-4 md:hidden md:py-6">
              <div className="space-y-1">
                <h1 className="text-TUCMC-gray-500">ระดับชั้น</h1>
                <h1>ม.{userData.level}</h1>
              </div>
              <div className="space-y-1">
                <h1 className="text-TUCMC-gray-500">ห้อง</h1>
                <h1>{userData.room}</h1>
              </div>
            </div>
            <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:space-y-0 md:space-x-[11.5rem] md:py-6">
              <h1 className="flex-shrink-0 text-TUCMC-gray-500">Email address</h1>
              <div className="flex w-full justify-start">
                <h1>{userCred.email}</h1>
              </div>
            </div>
            <div className="space-y-1 border-b border-gray-200 py-4 md:flex md:space-y-0 md:space-x-[12.2rem] md:py-6">
              <h1 className="text-TUCMC-gray-500">เบอร์โทรศัพท์</h1>
              <h1>
                <span className="text-TUCMC-gray-700">+66 </span>
                {userCred.phone.charAt(0) === "0" ? userCred.phone.slice(1, userCred.phone.length) : userCred.phone}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="border-b border-gray-200 pb-4 text-xl">
              ความปลอดภัย <span className="text-TUCMC-gray-500">Beta</span>
            </h1>
            {/*<div className="border-b border-gray-200 py-4 md:py-6 space-y-1 md:flex md:items-center md:space-x-[12.2rem] md:space-y-0">*/}
            {/*  <h1 className="text-TUCMC-gray-500">แก้ไขรหัสผ่าน</h1>*/}
            {/*  <div className="relative w-full max-w-md">*/}
            {/*    <Input placeholder="ป้อนรหัสผ่านก่อนหน้า" type="password" stateUpdate={setOldPass}*/}
            {/*           className="text-md placeholder-gray-400"/>*/}
            {/*    <Button*/}
            {/*      className={classnames("absolute top-1.5 right-3 font-medium flex items-center space-x-1 text-sm rounded-full px-4 py-[4px] z-40", oldPass.length >= 8 ? "bg-TUCMC-pink-400 text-white" : "bg-white text-TUCMC-gray-400 border border-TUCMC-gray-400 cursor-default")}>*/}
            {/*      <LockOpenIcon className={classnames("w-4 h-4", oldPass.length < 8 && "hidden")}/><LockClosedIcon*/}
            {/*      className={classnames("w-4 h-4", oldPass.length >= 8 && "hidden")}/><span>Unlock</span>*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {userData.panelID && (
              <div className="space-y-2 border-b border-gray-200 py-4 md:flex md:space-y-0 md:space-x-[9.3rem] md:py-6">
                <h1 className="mr-4 text-TUCMC-gray-900">จัดการแผงควบคุม</h1>
                <Button href="/transfer" className="w-full max-w-sm rounded-lg bg-TUCMC-pink-400 px-5 py-2 text-white">
                  โอนสิทธิ์เข้าถึงแผงควบคุมให้ผู้อื่น
                </Button>
              </div>
            )}
            {(userData.panelID || userData.admin) && (
              <div className="space-y-2 border-b border-gray-200 py-4 md:flex md:space-y-0 md:space-x-[9.3rem] md:py-6">
                <h1 className="text-TUCMC-gray-900">เบราว์เซอร์ที่เชื่อถือได้</h1>
                <div>
                  <div className="space-y-2">
                    {userCred.authorised.length > 0 ? (
                      userCred.authorised.map((val, index) => (
                        <div
                          key={`trusted-${index}`}
                          className="flex w-full max-w-sm justify-between rounded-md bg-white p-4 text-sm shadow-md"
                        >
                          <div className="space-y-1">
                            <div className="flex space-x-2">
                              <h1>Browser:</h1>
                              <h1>
                                {val.browser.name} {val.browser.version} on {val.os.name} ({val.os.version}){" "}
                                {val.device.vendor} {val.device.model} {val.cpu.architecture}
                              </h1>
                            </div>
                            <h1>Client IP: {val.ip}</h1>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                removeBrows(val.id)
                              }}
                            >
                              <XIcon className="h-5 w-5 text-TUCMC-red-400" />
                            </div>
                            <div className="mt-0.5 flex h-5 w-5 items-center justify-center">
                              <div
                                className={classnames(
                                  "h-1.5 w-1.5 animate-ping rounded-full bg-TUCMC-green-400",
                                  !val.self && "hidden"
                                )}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1 className="my-10 text-center text-TUCMC-gray-600">ไม่มีเบราว์เซอร์ที่เชื่อถือได้</h1>
                    )}
                  </div>
                  <div className="mt-4 flex min-w-[384px] flex-col space-y-4">
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={whitelistMode}
                        onChange={setWhitelistMode}
                        disabled={userCred.authorised.length <= 0}
                        className={classnames(
                          whitelistMode ? "bg-TUCMC-pink-500" : "bg-gray-200",
                          "focus:outline-none relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-TUCMC-pink-500 focus:ring-offset-2",
                          userCred.authorised.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={classnames(
                            whitelistMode ? "translate-x-5" : "translate-x-0",
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                      <div className="ml-4 flex items-center space-x-1">
                        <span className="text-sm font-medium text-gray-900">โหมดความปลอดภัยสูง</span>
                        <div className="relative h-5 w-5">
                          <div className="absolute z-30 h-5 w-5 opacity-0 hover:opacity-100">
                            <div className="absolute -top-16 left-[-8.13rem]">
                              <div
                                className={classnames(
                                  "w-[280px] rounded-md bg-white p-2 text-xs text-black shadow-md",
                                  css.tooltip2
                                )}
                              >
                                <h1 className="text-center">
                                  หลังจากเปิดใช้งานโหมดความปลอดภัยสูง
                                  บัญชีนี้จะสามารถเข้าสู่ระบบผ่านอุปกรณ์ที่ได้เพิ่มไว้เท่านั้น
                                  หากยังไม่เพิ่มเบราว์เซอร์จะไม่สามารถเปิดได้
                                </h1>
                              </div>
                            </div>
                            <ExclamationCircleIcon className="h-5 w-5 text-TUCMC-red-400" />
                          </div>
                          <ExclamationCircleIcon className="absolute z-[29] h-5 w-5 text-TUCMC-red-400" />
                        </div>
                      </div>
                    </Switch.Group>
                    <Button
                      onClick={() => {
                        betaAccess(addBrow)
                      }}
                      className="rounded-full bg-TUCMC-pink-400 px-5 py-2 text-white"
                    >
                      เพิ่มเบราว์เซอร์นี้
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Account
