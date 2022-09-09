import PageContainer from "@components/common/PageContainer"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { useEffect, useRef, useState } from "react"
import { fetchUserCred } from "@client/fetcher/user"
import QRCode from "qrcode"
import { useToast } from "@components/common/Toast/ToastContext"
import {
  ArrowRightIcon,
  BadgeCheckIcon,
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
import { addBrowser, generate2FA, removeBrowser, toggleBeta, toggleSafeMode, verify2FA } from "@client/accManagement"
import { clubMap } from "../config/clubMap"
import { isEmpty } from "@utilities/object"
import { ExclamationIcon } from "@heroicons/react/outline"
import { useUserCred } from "handlers/hooks/useUserCred"
import { GAIcon } from "@vectors/icons/GA"

const Account = () => {
  const { onReady, reFetch } = useAuth()
  const [oldPass, setOldPass] = useState("")
  const qrCodeRef = useRef(null)
  const [betaAlert, setBetaAlert] = useState(false)
  const [whitelistMode, setWhitelistMode] = useState(false)
  const [allows, setAllows] = useState(false)
  const [closeDep, setCloseDep] = useState(false)
  const [reg2FA, setReg2FA] = useState(false)
  const [qrData, setQr] = useState("")
  const [rawOTP, setRawOTP] = useState({0: "", 1: "", 2: "", 3: "", 4: "", 5: ""})
  const [qrModal, setQrModal] = useState(false)
  const [faStep, setFAStep] = useState(1)
  const [atDigit, setAtDigit] = useState(0)
  const [rememberedCalls, setRCalls] = useState({ call: () => {} })
  const auTrigger = useRef(null)
  const { userCred, reFetchCred } = useUserCred()
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

  useEffect(() => {
    console.log(qrData)
    if (qrData) {
      setQrModal(true)
      QRCode.toCanvas(qrCodeRef.current, qrData, {
        errorCorrectionLevel: "L",
        margin: 1.2,
      })
    }
  }, [qrData])

  useEffect(() => {
    if (atDigit >= 0 && atDigit <= 5) {
      document.getElementById(`otp${atDigit + 1}`).focus()
    }
  }, [atDigit])

  useEffect(() => {
    const otp = Object.values(rawOTP).join("")
    if (otp.length === 6) {
      verify2FS(otp)
    }
  }, [rawOTP[5]])

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
    console.log(userCred)
    setAllows(userCred.verifiedFA)
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

  const generate2FACred = async () => {
    const res = await generate2FA()
    console.log(res)
    if (res.status) {
      setReg2FA(true)
      setQr(res.data.otpauthUrl)
    }
  }

  const verify2FS = async (otp) => {
    if (otp.length == 6) {
      const res = await verify2FA(otp)
      if (res.status) {
        reFetch()
        reFetchCred()
        setFAStep(1)
        setReg2FA(false)
      }else{
        if (res.report === "invalidCode") {
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ข้อมูลไม่ถูกต้อง",
            text: "กรุณาลองส่งข้อมูลใหม่อีกครั้ง",
          })
        }
      }
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
        {<div className={classnames("flex justify-center items-center min-h-screen w-full top-0 left-0 z-[99] bg-gray-600 backdrop-blur bg-opacity-40", reg2FA ? "fixed" : "hidden")}>
          <div className="bg-white shadow-md rounded-md p-6">
            <h1 className="font-semibold text-TUCMC-gray-800 text-lg">ขั้นตอนการลงทะเบียน 2FA</h1>
            {faStep === 1 && <div className="text-TUCMC-gray-700 mt-2 min-w-[300px]">
              <div>
              <p>1. ดาวน์โหลด Application บนอุปกรณ์</p>
            <div className="flex flex-col space-x-2 items-center px-2 mt-2 mb-2">
            <img className="w-16 h-16 mt-2" src="/assets/ga.svg"/>
            <h1 className="font-semibold mt-2">Google Authenticator</h1>
            </div>
                </div>
                <div className="flex flex-col items-center">
                <div className="flex mt-3 w-48 h-14 bg-black text-white rounded-xl items-center justify-center">
            <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30" >
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
            </div>
            <div>
                <div className="text-xs">Download on the</div>
                <div className="text-2xl font-semibold font-sans -mt-1">App Store</div>
            </div>
        </div>
        <div className="flex mt-3 w-48 h-14 bg-black text-white rounded-lg items-center justify-center">
            <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"/>
                    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"/>
                    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"/>
                    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"/>
                </svg>
            </div>
            <div>
                <div className="text-xs">GET IT ON</div>
                <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
            </div>
        </div>
                </div>
                <Button type="button" onClick={() => {setFAStep(2)}} className="flex space-x-2 justify-center items-center max-w-sm w-full rounded-lg bg-TUCMC-pink-400 px-5 py-2 text-white mt-4">
                  <span>ขั้นตอนต่อไป</span>
                  <ArrowRightIcon className="w-4 h-4"/>
                </Button>
            </div>}
            {<div className={classnames("text-TUCMC-gray-700 mt-2 min-w-[300px]", faStep === 2 ? "block" : "hidden")}>
              <div>
              <p>2. สแกน QR Code บนอุปกรณ์ด้วย App</p>
            <div className="flex flex-col space-x-2 items-center px-2 mt-2 mb-2">
            <img className="w-16 h-16 mt-2" src="/assets/ga.svg"/>
            <h1 className="font-semibold mt-2">Google Authenticator</h1>
            </div>
                </div>
                <div className="flex flex-col items-center">
                <div className="flex justify-center mt-4">
              <canvas id="qrCode" ref={qrCodeRef} className={css.qrCode}></canvas>
            </div>
                </div>
                <Button type="button" onClick={() => {setFAStep(3)}} className="flex space-x-2 justify-center items-center max-w-sm w-full rounded-lg bg-TUCMC-pink-400 px-5 py-2 text-white mt-4">
                  <span>ขั้นตอนต่อไป</span>
                  <ArrowRightIcon className="w-4 h-4"/>
                </Button>
            </div>}
            {<div className={classnames("text-TUCMC-gray-700 mt-2 w-[300px]", faStep === 3 ? "block" : "hidden")}>
              <div>
              <p>3. เช็กรหัสที่ปรากฏใน App Authenticator</p>
            <div className="flex flex-col space-x-2 items-center px-2 mt-2 mb-2">
            <img className="w-[280px] mt-2" src="/assets/GA-Ex.jpg"/>
            <h1 className="mt-2 text-sm text-TUCMC-gray-600">รูปตัวอย่างหน้าจอแอพ Authenticator</h1>
            </div>
                </div>
                <div className="flex flex-col items-center">
                  <p>4. กรอกรหัสที่ปรากฏใน App Authenticator</p>
                <div className="flex justify-center mt-4">
              <div className="flex space-x-4">
                <div className="space-x-1">
                  <input type="number" value={rawOTP[0]} min={0} max={9} onChange={(e) => {e.target.value !== "" && setAtDigit(prev => (1));e.target.value.length > 1 ? () => {setRawOTP(prev => ({...prev, 1: e.target.value}));setAtDigit(1)} : setRawOTP(prev => ({...prev, 0: e.target.value}))}}id="otp1" className="w-8 h-10 webkit-none p-0 rounded-md border border-TUCMC-gray-800 border-opacity-50 text-center font-bold text-2xl"/>
                  <input type="number" value={rawOTP[1]} min={0} max={9} onChange={(e) => {e.target.value === "" ? setAtDigit(prev => (0)) : setAtDigit(2);e.target.value.length > 1 ? () => {setRawOTP(prev => ({...prev, 2: e.target.value}));setAtDigit(2)} : setRawOTP(prev => ({...prev, 1: e.target.value}))}} id="otp2" className="w-8 h-10 webkit-none p-0 rounded-md border border-TUCMC-gray-800 border-opacity-50 text-center font-bold text-2xl"/>
                  <input type="number" value={rawOTP[2]} min={0} max={9} onChange={(e) => {e.target.value === "" ? setAtDigit(prev => (1)) : setAtDigit(3);e.target.value.length > 1 ? () => {setRawOTP(prev => ({...prev, 3: e.target.value}));setAtDigit(3)} : setRawOTP(prev => ({...prev, 2: e.target.value}))}} id="otp3" className="w-8 h-10 webkit-none p-0 rounded-md border border-TUCMC-gray-800 border-opacity-50 text-center font-bold text-2xl"/>
                </div>
                <div className="space-x-1">
                  <input type="number" value={rawOTP[3]} min={0} max={9}  onChange={(e) => {e.target.value === "" ? setAtDigit(prev => (2)) : setAtDigit(4);e.target.value.length > 1 ? () => {setRawOTP(prev => ({...prev, 4: e.target.value}));setAtDigit(4)} : setRawOTP(prev => ({...prev, 3: e.target.value}))}} id="otp4" className="w-8 h-10 webkit-none p-0 rounded-md border border-TUCMC-gray-800 border-opacity-50 text-center font-bold text-2xl"/>
                  <input type="number" value={rawOTP[4]} min={0} max={9}  onChange={(e) => {e.target.value === "" ? setAtDigit(prev => (3)) : setAtDigit(5);e.target.value.length > 1 ? () => {setRawOTP(prev => ({...prev, 5: e.target.value}));setAtDigit(5)} : setRawOTP(prev => ({...prev, 4: e.target.value}))}} id="otp5" className="w-8 h-10 webkit-none p-0 rounded-md border border-TUCMC-gray-800 border-opacity-50 text-center font-bold text-2xl"/>
                  <input type="number" value={rawOTP[5]} min={0} max={9}  onChange={(e) => {e.target.value === "" && setAtDigit(prev => (4));setRawOTP(prev => ({...prev, 5: e.target.value}))}} id="otp6" className="w-8 h-10 webkit-none p-0 rounded-md border border-TUCMC-gray-800 border-opacity-50 text-center font-bold text-2xl"/>
                </div>
              </div>
            </div>
                </div>
                <Button type="button" onClick={() => {setFAStep(3)}} className="flex space-x-2 justify-center items-center max-w-sm w-full rounded-lg bg-TUCMC-pink-400 px-5 py-2 text-white mt-4">
                  <span>ยืนยันการลงทะเบียน</span>
                  <ArrowRightIcon className="w-4 h-4"/>
                </Button>
            </div>}
          </div>
        </div>}
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
                <div className="relative">
                  {!allows && (<div className={classnames("absolute flex flex-col items-center justify-center w-full h-full bg-gray-900 bg-opacity-30 rounded-lg backdrop-blur z-[50]")}>
                    <ExclamationCircleIcon className="text-white w-16 h-16"/>
                    <h1 className="text-white font-semibold text-lg mt-1">เปิดใช้งานระบบ 2FA</h1>
                    <Button type="button" onClick={() => {generate2FACred()}} className="max-w-sm rounded-lg bg-TUCMC-pink-400 px-5 py-2 text-white mt-1">
                  เริ่มต้นการเปิดใช้งาน
                </Button>
                  </div>)}
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
