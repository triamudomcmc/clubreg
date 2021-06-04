import {LogoIcon, WhiteLogo} from "@vectors/Logo";
import NavButton from "@components/common/Navigation/NavButton";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Link from 'next/link'
import {detectOuside} from "@utilities/document";
import Router from "next/router";
import classnames from "classnames"
import {
  CalendarIcon, ChatIcon,
  ClipboardListIcon, CogIcon, DocumentTextIcon,
  HomeIcon, KeyIcon,
  LoginIcon,
  LogoutIcon,
  TerminalIcon
} from "@heroicons/react/outline";
import {ChevronDownIcon} from "@heroicons/react/solid";
import Modal from "@components/common/Modals";
import {isEmpty} from "@utilities/object";
import LooseTypeObject from "@interfaces/LooseTypeObject";
import {useToast} from "@components/common/Toast/ToastContext";

const Navigation = () => {


  const logged = false
  const userData: LooseTypeObject<any> = {}
  const signout = () => {
  }

  const {addToast} = useToast()

  const [reveal, setReaveal] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [load, setLoad] = useState(true)
  const [initial, setInitial] = useState(true)
  const panel = useRef(null)
  const accRef = useRef(null)
  const [path, setPath] = useState("/")

  detectOuside(panel, reveal, () => {
    setReaveal(false)
  })

  useEffect(() => {
    setLoad(false)
    if (!initial) {
      if (!animation) {
        setReaveal(!reveal)
      }
    } else {
      setInitial(false)
    }
  }, [toggle])

  useEffect(() => {
    setPath(Router.pathname)
  }, [])

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        stiffness: 100
      }
    },
    close: {
      x: "-100%",
      transition: {
        type: "tween",
        stiffness: 100
      }
    }
  }

  const getClass = (expected: string, part: "font" | "icon" | "bg") => {
    if (path == expected) {
      switch (part) {
        case "bg":
          return "bg-TUCMC-pink-100 border-TUCMC-pink-400 text-pink-400"
        case "font":
          return ""
        case "icon":
          return ""
      }
    } else {
      switch (part) {
        case "bg":
          return "hover:bg-TUCMC-gray-100 cursor-pointer"
        case "font":
          return "text-TUCMC-gray-800"
        case "icon":
          return "text-TUCMC-gray-500"
      }
    }
  }

  const prohibitedToast = () => {
    addToast(
      {
        color: "red", icon: "cross", text: "ขออภัย เนื้อหาในส่วนที่ผู้ใช้งานต้องการเข้าถึงนั้นยังไม่เปิดใช้งาน กรุณาลองใหม่ภายหลัง",
        theme: "modern", title: "เนื้อหาถูกระงับการเข้าถึง"
      }
    )
  }


  return (
    <>
      <motion.div animate={reveal ? "open" : "closed"}
                  className="sticky z-50 top-0 flex flex-row items-center justify-center bg-TUCMC-gray-900 h-16 px-6">
        <div className="flex flex-row justify-between items-center w-full max-w-6xl">
          <div>
            <WhiteLogo/>
          </div>
          <div className="flex flex-row">
            <div className="flex-row space-x-10 whitespace-nowrap font-medium hidden md:flex">
              <h1 onClick={prohibitedToast} className="cursor-not-allowed text-white">หน้าแรก</h1>
              <h1 onClick={prohibitedToast} className="cursor-not-allowed text-white">วิธีใช้</h1>
              <h1 onClick={prohibitedToast} className="cursor-not-allowed text-white">ชมรม</h1>
              <h1 onClick={prohibitedToast} className="cursor-not-allowed text-white">FAQ</h1>
              <h1 onClick={prohibitedToast} className="cursor-not-allowed text-white">กช.</h1>
              <h1 onClick={prohibitedToast} className="cursor-not-allowed text-white">ติดต่อ</h1>
              <h1 onClick={() => {Router.push("/auth?register")}} className="text-white cursor-pointer">สร้างบัญชี</h1>
            </div>
            <div className="md:hidden">
              <NavButton toggle={() => {
                setToggle(!toggle)
              }}/>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div onAnimationStart={() => {
        setAnimation(true)
      }} onAnimationComplete={() => {
        setAnimation(false)
      }} ref={panel} initial={{x: "-100%"}} animate={reveal ? "open" : "close"} variants={variants}
                  className={classnames("fixed top-0 bg-white h-full z-50", (load) && "hidden")}>
        <div className="bg-TUCMC-gray-800 p-4">
          <Link href="/">
            <div>
              <WhiteLogo/>
            </div>
          </Link>
        </div>
        {logged && <div className="bg-TUCMC-gray-100 my-4 px-6 py-2">
            <h1 className="text-TUCMC-gray-900">{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
            <h1 className="text-TUCMC-gray-700 tracking-tight">{`${userData.student_id} | ${userData.room} / ${userData.number}`}</h1>
        </div>}
        <div
          onClick={prohibitedToast}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/", "bg"))}>
          <HomeIcon className={classnames("w-7 h-7", getClass("/", "icon"))}/> <span
          className={getClass("/", "font")}>หน้าแรก</span>
        </div>
        {!logged ?
          <div
            onClick={() => {Router.push("/auth?register")}}
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/auth", "bg"))}>
            <LoginIcon className={classnames("w-7 h-7", getClass("/auth", "icon"))}/> <span
            className={getClass("/auth", "font")}>สร้างบัญชี</span>
          </div> : <div
            onClick={signout}
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/auth", "bg"))}>
            <LogoutIcon className={classnames("w-7 h-7", getClass("/auth", "icon"))}/> <span
            className={getClass("/auth", "font")}>ออกจากระบบ</span>
          </div>}
        {(logged && userData.panelID) &&
        <div
            onClick={prohibitedToast}
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/panel", "bg"))}>
            <TerminalIcon className={classnames("w-7 h-7", getClass("/panel", "icon"))}/> <span
            className={getClass("/panel", "font")}>แผงควบคุม</span>
        </div>}
        {(logged) &&
        <div
            onClick={prohibitedToast}
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/account", "bg"))}>
            <CogIcon className={classnames("w-7 h-7", getClass("/account", "icon"))}/> <span
            className={getClass("/account", "font")}>จัดการบัญชี</span>
        </div>}
          <div
            onClick={prohibitedToast}
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/clubs", "bg"))}>
            <ClipboardListIcon className={classnames("w-7 h-7", getClass("/clubs", "icon"))}/> <span
            className={getClass("/clubs", "font")}>รายชื่อชมรม</span>
          </div>
        <div
          onClick={prohibitedToast}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/info", "bg"))}>
          <CalendarIcon className={classnames("w-7 h-7", getClass("/info", "icon"))}/> <span
          className={getClass("/info", "font")}>วิธีลงทะเบียน</span>
        </div>
        <div
          onClick={prohibitedToast}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/FAQ", "bg"))}>
          <ChatIcon className={classnames("w-7 h-7", getClass("/FAQ", "icon"))}/> <span
          className={getClass("/FAQ", "font")}>คำถามที่พบบ่อย</span>
        </div>
        <div
          onClick={prohibitedToast}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/TUCMC", "bg"))}>
          <LogoIcon className={classnames("w-7 h-7", getClass("/TUCMC", "icon"))}/> <span className={getClass("/TUCMC", "font")}>ทำความรู้จัก กช.</span>
        </div>
        <div
          onClick={prohibitedToast}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/tos", "bg"))}>
          <DocumentTextIcon className={classnames("w-7 h-7", getClass("/tos", "icon"))}/> <span
          className={getClass("/tos", "font")}>ข้อตกลงและเงื่อนไขการใช้งาน</span>
        </div>
        <div
          onClick={prohibitedToast}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/policy", "bg"))}>
          <KeyIcon className={classnames("w-7 h-7", getClass("/policy", "icon"))}/> <span
          className={getClass("/policy", "font")}>นโยบายความเป็นส่วนตัว</span>
        </div>
      </motion.div>
    </>
  )
}

export default Navigation