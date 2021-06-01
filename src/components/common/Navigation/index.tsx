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
  CalendarIcon, ChatIcon,
  ClipboardListIcon, CogIcon, DocumentTextIcon,
  HomeIcon, KeyIcon,
  LoginIcon, MailIcon,
  LogoutIcon,
  TerminalIcon
} from "@heroicons/react/outline";
import {ChevronDownIcon} from "@heroicons/react/solid";
import Modal from "@components/common/Modals";
import {isEmpty} from "@utilities/object";
import {useTracker} from "@client/tracker/context";

const Navigation = () => {

  const {tracker} = useTracker()

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

  const trackedRedirect = (href, mode) => {
    tracker.push("click", `Navigation-${mode}->${href}`)
    Router.push(href)
  }

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
            <div>
              <WhiteLogo/>
            </div>
          </Link>
          <div className="flex flex-row">
            <div className="flex-row space-x-10 whitespace-nowrap font-medium hidden md:flex">
              <h1 onClick={() => {
                trackedRedirect("/", "desktop")
              }} className="cursor-pointer text-white">หน้าแรก</h1>
              <h1 onClick={() => {
                trackedRedirect("/instruction", "desktop")
              }} className="text-white cursor-pointer">วิธีใช้</h1>
              <h1 onClick={() => {
                trackedRedirect("/clubs", "desktop")
              }} className="text-white cursor-pointer">ชมรม</h1>
              <h1 onClick={() => {
                trackedRedirect("/FAQ", "desktop")
              }} className="text-white cursor-pointer">FAQ</h1>
              <h1 onClick={() => {
                trackedRedirect("/TUCMC", "desktop")
              }} className="text-white cursor-pointer">กช.</h1>
              <h1 onClick={() => {
                trackedRedirect("/contact", "desktop")
              }} className="text-white cursor-pointer">ติดต่อ</h1>
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
          <div>
            <WhiteLogo/>
          </div>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/", "bg"))}>
          <HomeIcon className={classnames("w-7 h-7", getClass("/", "icon"))}/> <span
          className={getClass("/", "font")}>หน้าแรก</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/clubs", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 cursor-pointer", getClass("/clubs", "bg"))}>
          <ClipboardListIcon className={classnames("w-7 h-7", getClass("/clubs", "icon"))}/> <span
          className={getClass("/clubs", "font")}>รายชื่อชมรม</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/instruction", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/instruction", "bg"))}>
          <CalendarIcon className={classnames("w-7 h-7", getClass("/instruction", "icon"))}/> <span
          className={getClass("/info", "font")}>วิธีลงทะเบียน</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/FAQ", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/FAQ", "bg"))}>
          <ChatIcon className={classnames("w-7 h-7", getClass("/FAQ", "icon"))}/> <span
          className={getClass("/FAQ", "font")}>คำถามที่พบบ่อย</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/TUCMC", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/TUCMC", "bg"))}>
          <LogoIcon className={classnames("w-7 h-7", getClass("/TUCMC", "icon"))}/> <span className={getClass("/TUCMC", "font")}>ทำความรู้จัก กช.</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/contact", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/contact", "bg"))}>
          <MailIcon className={classnames("w-7 h-7", getClass("/contact", "icon"))}/> <span
          className={getClass("/contact", "font")}>ติดต่อ</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/terms-of-service", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/terms-of-service", "bg"))}>
          <DocumentTextIcon className={classnames("w-7 h-7", getClass("/terms-of-service", "icon"))}/> <span
          className={getClass("/terms-of-service", "font")}>ข้อตกลงและเงื่อนไขการใช้งาน</span>
        </div>
        <div
          onClick={() => {
            trackedRedirect("/privacy-policy", "mobile")
          }}
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/privacy-policy", "bg"))}>
          <KeyIcon className={classnames("w-7 h-7", getClass("/privacy-policy", "icon"))}/> <span
          className={getClass("/privacy-policy", "font")}>นโยบายความเป็นส่วนตัว</span>
        </div>
      </motion.div>
    </>
  )
}

export default Navigation
