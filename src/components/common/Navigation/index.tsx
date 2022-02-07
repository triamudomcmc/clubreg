import {LogoIcon, WhiteLogo} from "@vectors/Logo";
import NavButton from "@components/common/Navigation/NavButton";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Link from 'next/link'
import {detectOuside} from "@utilities/document";
import Router from "next/router";
import classnames from "classnames"
import {useAuth} from "@client/auth";
import {
  AcademicCapIcon,
  CalendarIcon, ChatIcon,
  ClipboardListIcon, CogIcon, DocumentTextIcon,
  HomeIcon, KeyIcon,
  LoginIcon, MailIcon,
  LogoutIcon,
  TerminalIcon, HeartIcon, LibraryIcon
} from "@heroicons/react/outline";
import {ChevronDownIcon, StarIcon} from "@heroicons/react/solid";
import Modal from "@components/common/Modals";
import {isEmpty} from "@utilities/object";

const Navigation = () => {

  const {onReady, signout} = useAuth()

  const {logged, userData} = onReady((logged, userData) => {
    return {logged, userData}
  })

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

  return (
    <>
      <motion.div animate={reveal ? "open" : "closed"}
                  className="sticky z-50 top-0 flex flex-row items-center justify-center bg-TUCMC-gray-900 h-16 px-6">
        <div className="flex flex-row justify-between items-center w-full max-w-6xl">
          <Link href="/">
            <div className="cursor-pointer">
              <WhiteLogo/>
            </div>
          </Link>
          <div className="flex flex-row">
            <div className="flex-row space-x-10 whitespace-nowrap font-medium hidden md:flex">
              <Link href="/">
                <h1 className="cursor-pointer text-white">หน้าแรก</h1>
              </Link>
              <Link href="/instruction">
                <h1 className="text-white cursor-pointer">วิธีใช้</h1>
              </Link>
              <Link href="/clubs">
                <h1 className="text-white cursor-pointer">ชมรม</h1>
              </Link>
              <Link href="/FAQ">
                <h1 className="text-white cursor-pointer">FAQ</h1>
              </Link>
              <Link href="/TUCMC">
                <h1 className="text-white cursor-pointer">กช.</h1>
              </Link>
              <Link href="/contact">
                <h1 className="text-white cursor-pointer">ติดต่อ</h1>
              </Link>
              <div className={classnames(isEmpty(userData) && "hidden")}>
                <h1 ref={accRef} className="flex items-center space-x-1 text-white cursor-pointer">บัญชี <ChevronDownIcon
                  className="w-5 h-5"/></h1>
                <Modal className="flex justify-end w-full" TriggerRef={accRef}>
                  <div className="absolute mt-2">
                    {logged && <div className="bg-TUCMC-gray-100 px-7 py-2 font-normal rounded-t-lg">
                        <h1 className="text-TUCMC-gray-900">{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
                        <h1
                            className="text-TUCMC-gray-700 tracking-tight text-sm">{`${userData.student_id} | ${userData.room} / ${userData.number}`}</h1>
                    </div>}
                    <div style={{minWidth: "100px"}}
                         className="font-normal bg-white space-y-2.5 shadow-md rounded-b-lg py-3 px-5 text-gray-700">
                      {logged && userData.admin &&
                      <Link href="/admin"><h1 className="text-black cursor-pointer hover:text-blue-600 hover:underline">Dashboard</h1>
                      </Link>}
                      {logged && userData.panelID &&
                      <Link href="/panel/evaluate"><h1 className="flex space-x-1 items-center font-medium text-TUCMC-orange-500 cursor-pointer hover:text-blue-600 hover:underline"><span>ประเมินผล</span> <StarIcon className="w-4 h-4 animate-pulse"/></h1>
                      </Link>}
                      {logged && userData.panelID &&
                      <Link href="/panel"><h1 className="text-black cursor-pointer hover:text-blue-600 hover:underline">แผงควบคุม</h1>
                      </Link>}
                      {userData && userData.club === "" &&
                      <Link href="/select"><h1 className="text-black cursor-pointer hover:text-blue-600 hover:underline">เลือกชมรม</h1>
                      </Link>}
                      <Link href="/account"><h1
                        className="text-black cursor-pointer hover:text-blue-600 hover:underline">จัดการบัญชี</h1>
                      </Link>
                      {!logged ? <Link href="/auth"><h1
                          className="text-black cursor-pointer hover:text-blue-600 hover:underline">เข้าสู่ระบบ</h1></Link> :
                        <h1 onClick={signout}
                            className="text-black cursor-pointer hover:text-blue-600 hover:underline">ออกจากระบบ</h1>}
                    </div>
                  </div>
                </Modal>
              </div>
              <div className={classnames(!isEmpty(userData) && "hidden")}>
                {!logged ? <Link href="/auth"><h1 className="text-white cursor-pointer">เข้าสู่ระบบ</h1></Link> :
                  <h1 onClick={signout} className="text-white cursor-pointer">ออกจากระบบ</h1>}
              </div>
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
                  className={classnames("fixed top-0 bg-white h-full z-50 min-w-[280px]", (load) && "hidden")}>
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
        <Link href="/">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/", "bg"))}>
            <HomeIcon className={classnames("w-7 h-7", getClass("/", "icon"))}/> <span
            className={getClass("/", "font")}>หน้าแรก</span>
          </div>
        </Link>
        {!logged ? <Link href="/auth">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/auth", "bg"))}>
            <LoginIcon className={classnames("w-7 h-7", getClass("/auth", "icon"))}/> <span
            className={getClass("/auth", "font")}>เข้าสู่ระบบ</span>
          </div>
        </Link> : <div
          onClick={signout}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/auth", "bg"))}>
          <LogoutIcon className={classnames("w-7 h-7", getClass("/auth", "icon"))}/> <span
          className={getClass("/auth", "font")}>ออกจากระบบ</span>
        </div>}
        <Link href="/select">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/select", "bg"))}>
            <HeartIcon className={classnames("w-7 h-7", getClass("/select", "icon"))}/> <span
            className={getClass("/select", "font")}>ลงทะเบียนชมรม</span>
          </div>
        </Link>
        {(logged && userData.admin) && <Link href="/admin">
            <div
                className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/admin", "bg"))}>
                <LibraryIcon className={classnames("w-7 h-7", getClass("/panel", "icon"))}/> <span
                className={getClass("/admin", "font")}>Dashboard</span>
            </div>
        </Link>}
        {(logged && userData.panelID) && <Link href="/panel/evaluate">
          <div
            className={classnames("flex flex-row border-l-2 border-TUCMC-orange-500 items-center space-x-4 pl-4 py-3 pr-8", getClass("/panel/evaluate", "bg"))}>
            <AcademicCapIcon className={classnames("w-7 h-7 animate-pulse text-TUCMC-orange-500", getClass("/panel/evaluate", "icon"))}/> <span
            className={classnames("text-TUCMC-orange-500", getClass("/panel/evaluate", "font"))}>ประเมินผล</span>
          </div>
        </Link>}
        {(logged && userData.panelID) && <Link href="/panel">
            <div
                className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/panel", "bg"))}>
                <TerminalIcon className={classnames("w-7 h-7", getClass("/panel", "icon"))}/> <span
                className={getClass("/panel", "font")}>แผงควบคุม</span>
            </div>
        </Link>}
        {(logged) && <Link href="/account">
            <div
                className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/account", "bg"))}>
                <CogIcon className={classnames("w-7 h-7", getClass("/account", "icon"))}/> <span
                className={getClass("/account", "font")}>จัดการบัญชี</span>
            </div>
        </Link>}
        <Link href="/clubs">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 cursor-pointer", getClass("/clubs", "bg"))}>
            <ClipboardListIcon className={classnames("w-7 h-7", getClass("/clubs", "icon"))}/> <span
            className={getClass("/clubs", "font")}>รายชื่อชมรม</span>
          </div>
        </Link>
        <Link href="/instruction">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/instruction", "bg"))}>
            <CalendarIcon className={classnames("w-7 h-7", getClass("/instruction", "icon"))}/> <span
            className={getClass("/info", "font")}>วิธีลงทะเบียน</span>
          </div>
        </Link>
        <Link href="/FAQ">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/FAQ", "bg"))}>
            <ChatIcon className={classnames("w-7 h-7", getClass("/FAQ", "icon"))}/> <span
            className={getClass("/FAQ", "font")}>คำถามที่พบบ่อย</span>
          </div>
        </Link>
        <Link href="/TUCMC">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/TUCMC", "bg"))}>
            <LogoIcon className={classnames("w-7 h-7", getClass("/TUCMC", "icon"))}/> <span className={getClass("/TUCMC", "font")}>ทำความรู้จัก กช.</span>
          </div>
        </Link>
        <Link href="/contact">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/contact", "bg"))}>
            <MailIcon className={classnames("w-7 h-7", getClass("/contact", "icon"))}/> <span className={getClass("/contact", "font")}>ติดต่อ</span>
          </div>
        </Link>
      </motion.div>
    </>
  )
}

export default Navigation
