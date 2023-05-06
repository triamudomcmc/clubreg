import { LogoIcon, WhiteLogo } from "@vectors/Logo"
import NavButton from "@components/common/Navigation/NavButton"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { detectOuside } from "@utilities/document"
import Router from "next/router"
import classnames from "classnames"
import { useAuth } from "@client/auth"
import {
  AcademicCapIcon,
  CalendarIcon,
  ChatIcon,
  ClipboardListIcon,
  CogIcon,
  DocumentTextIcon,
  HomeIcon,
  KeyIcon,
  LoginIcon,
  MailIcon,
  LogoutIcon,
  TerminalIcon,
  HeartIcon,
  LibraryIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline"
import { BadgeCheckIcon, ChevronDownIcon, StarIcon } from "@heroicons/react/solid"
import { BeakerIcon } from "@heroicons/react/outline"
import Modal from "@components/common/Modals"
import { isEmpty } from "@utilities/object"
import { addZero, convertMiliseconds } from "@utilities/timers"

const useTimer = (countTo) => {
  const [timer, setTime] = useState({})

  useEffect(() => {
    console.log(countTo)
    if (countTo && countTo !== 0) {
      setInterval(() => {
        const ts = countTo - new Date().getTime()
        const t = convertMiliseconds(ts)
        setTime({
          [countTo]: {
            day: addZero(t.d),
            hour: addZero(t.h),
            min: addZero(t.m),
            sec: addZero(t.s),
          },
        })
      }, 1000)
    }
  }, [countTo])

  return timer[countTo] || { day: "00", hour: "00", min: "00", sec: "00" }
}


const Navigation = () => {
  const { onReady, signout } = useAuth()
 
  const { logged, userData } = onReady((logged, userData) => {
    return { logged, userData }
  })


  const [reveal, setReaveal] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [sinfo, setSInfo] = useState(false)
  const [infoHover, setInfoHover] = useState(false)
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

  const cd = useTimer(userData?.expires)

  useEffect(() => {
    setPath(Router.pathname)
  }, [])

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        stiffness: 100,
      },
    },
    close: {
      x: "-100%",
      transition: {
        type: "tween",
        stiffness: 100,
      },
    },
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
      {sinfo && <div onClick={() => {setSInfo(false)}}className="fixed min-h-screen w-full top-0 left-0 z-[100]"/>}
      <motion.div
        animate={reveal ? "open" : "closed"}
        className="sticky top-0 z-50 flex flex-row items-center justify-center h-16 px-6 bg-TUCMC-gray-900"
      >
        <div className="flex flex-row items-center justify-between w-full max-w-6xl">
          <Link passHref href="/">
            <a>
              <WhiteLogo />
            </a>
          </Link>
          <div className="flex flex-row">
            <div className="flex-row hidden space-x-10 font-medium whitespace-nowrap md:flex">
              <Link passHref href="/">
                <a className="text-white">หน้าแรก</a>
              </Link>
              <Link passHref href="/dummy">
                <a className="text-white">ทดลองเล่นระบบ</a>
              </Link>
              <Link passHref href="/clubs">
                <a className="text-white">ชมรม</a>
              </Link>
              <Link passHref href="/FAQ">
                <a className="text-white">FAQ</a>
              </Link>
              <Link passHref href="https://clubs.triamudom.ac.th">
                <a className="text-white">กช.</a>
              </Link>
              <Link passHref href="/contact">
                <a className="text-white">ติดต่อ</a>
              </Link>
              <div className={classnames(isEmpty(userData) && "hidden")}>
                <h1 ref={accRef} className="flex items-center space-x-1 text-white cursor-pointer">
                  บัญชี <ChevronDownIcon className="w-5 h-5" />
                </h1>
                <Modal className="flex justify-end w-full" TriggerRef={accRef}>
                  <div className="absolute mt-2">
                    {logged && (
                      <div className="py-2 font-normal rounded-t-lg bg-TUCMC-gray-100 px-7">
                        <h1 className="text-TUCMC-gray-900">{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
                        <div className="flex items-center space-x-2">
                          <h1 onClick={() => {setSInfo(false)}} className="text-sm tracking-tight text-TUCMC-gray-700">{`${userData.student_id} | ${userData.room} / ${userData.number}`}</h1>
                          <div className="w-5 h-5">
                            <motion.div onClick={() => {setSInfo(true)}} onHoverStart={() => {setInfoHover(true)}} onHoverEnd={() => {setInfoHover(false)}} animate={sinfo ? {height: "260%",width:"500%", borderRadius: "6px"}: {width:"100%", height: "100%", borderRadius: "20px"}} whileTap={!sinfo ? {width: "200%", height: "140%"}: {}} whileHover={!sinfo ? {width: "200%"} : {}} className={classnames("cursor-pointer flex relative shadow-sm w-5 h-5 bg-TUCMC-green-400")}>
                              <BadgeCheckIcon className="w-3.5 h-3.5 text-white ml-[3px] mt-[3px]"/>
                              <motion.div animate={sinfo ? {clipPath: "inset(0 1% 1% 0)"} : infoHover ? {clipPath: "inset(0 60% 60% 0)"} : {clipPath: "inset(0 100% 60% 0)"}} className="flex flex-col absolute text-[11px] font-bold text-white">
                                <h1 className="ml-5 mt-[2px]">ข้อมูล session</h1>
                                <p className="ml-4 px-2 text-[10px] font-semibold text-center text-TUCMC-gray-100">เหลือเวลาอีก
                                <br/>
                                {cd.day !== "00" ? `${cd.day}:` : ""}{cd.hour}:{cd.min}:{cd.sec}
                                </p>
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      style={{ minWidth: "100px" }}
                      className="space-y-2.5 rounded-b-lg bg-white py-3 px-5 font-normal text-gray-700 shadow-md"
                    >
                      {logged && userData.admin && (
                        <Link passHref href="/admin">
                          <a className="block text-black hover:text-blue-600 hover:underline">Dashboard</a>
                        </Link>
                      )}
                      {logged && userData.panelID &&
                      <Link passHref href="/panel/evaluate"><h1 className="flex items-center space-x-1 font-medium cursor-pointer text-TUCMC-orange-500 hover:text-blue-600 hover:underline"><span>ประเมินผล</span> <StarIcon className="w-4 h-4 animate-pulse"/></h1>
                      </Link>}
                      {logged && userData.panelID && (
                        <Link passHref href="/panel">
                          <a className="block text-black hover:text-blue-600 hover:underline">แผงควบคุม</a>
                        </Link>
                      )}
                      {/* {userData && userData.club === "" && (
                        <Link passHref href="/select">
                          <a className="block text-black hover:text-blue-600 hover:underline">เลือกชมรม</a>
                        </Link>
                      )} */}
                      <Link passHref href="/account">
                        <a className="block text-black hover:text-blue-600 hover:underline">จัดการบัญชี</a>
                      </Link>
                      {userData && userData.tucmc && (
                        <Link passHref href="/TUCMC/view-web">
                          <a className="block text-black hover:text-blue-600 hover:underline">ตรวจสอบข้อมูลชมรม</a>
                        </Link>
                      )}
                      {!logged ? (
                        <Link passHref href="/auth">
                          <a className="block text-black hover:text-blue-600 hover:underline">เข้าสู่ระบบ</a>
                        </Link>
                      ) : (
                        <button onClick={signout} className="block text-black hover:text-blue-600 hover:underline">
                          ออกจากระบบ
                        </button>
                      )}
                    </div>
                  </div>
                </Modal>
              </div>
              <div className={classnames(!isEmpty(userData) && "hidden")}>
                {!logged ? (
                  <Link passHref href="/auth">
                    <h1 className="text-white cursor-pointer">เข้าสู่ระบบ</h1>
                  </Link>
                ) : (
                  <h1 onClick={signout} className="text-white cursor-pointer">
                    ออกจากระบบ
                  </h1>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <NavButton
                toggle={() => {
                  setToggle(!toggle)
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onAnimationStart={() => {
          setAnimation(true)
        }}
        onAnimationComplete={() => {
          setAnimation(false)
        }}
        ref={panel}
        initial={{ x: "-100%" }}
        animate={reveal ? "open" : "close"}
        variants={variants}
        className={classnames("fixed top-0 z-50 h-full min-w-[280px] bg-white", load && "hidden")}
      >
        <div className="p-4 bg-TUCMC-gray-800">
          <Link passHref href="/">
            <a>
              <WhiteLogo />
            </a>
          </Link>
        </div>
        {logged && (
          <div className="px-6 py-2 my-4 bg-TUCMC-gray-100">
            <h1 className="text-TUCMC-gray-900">{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
            <div className="flex items-center space-x-2">
                          <h1 onClick={() => {setSInfo(false)}} className="text-sm tracking-tight text-TUCMC-gray-700">{`${userData.student_id} | ${userData.room} / ${userData.number}`}</h1>
                          <div className="w-5 h-5">
                            <motion.div onClick={() => {setSInfo(true)}} onHoverStart={() => {setInfoHover(true)}} onHoverEnd={() => {setInfoHover(false)}} animate={sinfo ? {height: "260%",width:"500%", borderRadius: "6px"}: {width:"100%", height: "100%", borderRadius: "20px"}} whileTap={!sinfo ? {width: "200%", height: "140%"}: {}} whileHover={!sinfo ? {width: "200%"} : {}} className={classnames("cursor-pointer flex relative shadow-sm w-5 h-5 bg-TUCMC-green-400")}>
                              <BadgeCheckIcon className="w-3.5 h-3.5 text-white ml-[3px] mt-[3px]"/>
                              <motion.div animate={sinfo ? {clipPath: "inset(0 1% 1% 0)"} : infoHover ? {clipPath: "inset(0 55% 60% 0)"} : {clipPath: "inset(0 100% 60% 0)"}} className="flex flex-col absolute text-[11px] font-bold text-white">
                                <h1 className="ml-5 mt-[2px]">ข้อมูล session</h1>
                                <p className="ml-4 px-2 text-[10px] font-semibold text-center text-TUCMC-gray-100">เหลือเวลาอีก
                                <br/>
                                {cd.day !== "00" ? `${cd.day}:` : ""}{cd.hour}:{cd.min}:{cd.sec}
                                </p>
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
          </div>
        )}
        <Link passHref href="/">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/", "bg")
            )}
          >
            <HomeIcon className={classnames("h-7 w-7", getClass("/", "icon"))} />{" "}
            <span className={getClass("/", "font")}>หน้าแรก</span>
          </a>
        </Link>
        <Link passHref href="/dummy">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/dummy/select", "bg")
            )}
          >
            <BeakerIcon className={classnames("h-7 w-7", getClass("/dummy/select", "icon"))} />{" "}
            <span className={getClass("/dummy/select", "font")}>ทดลองเล่นระบบ</span>
          </a>
        </Link>
        {!logged ? (
          <Link passHref href="/auth">
            <a
              className={classnames(
                "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
                getClass("/auth", "bg")
              )}
            >
              <LoginIcon className={classnames("h-7 w-7", getClass("/auth", "icon"))} />{" "}
              <span className={getClass("/auth", "font")}>เข้าสู่ระบบ</span>
            </a>
          </Link>
        ) : (
          <button
            onClick={signout}
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/auth", "bg")
            )}
          >
            <LogoutIcon className={classnames("h-7 w-7", getClass("/auth", "icon"))} />{" "}
            <span className={getClass("/auth", "font")}>ออกจากระบบ</span>
          </button>
        )}
        <Link passHref href="/select">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/select", "bg")
            )}
          >
            <HeartIcon className={classnames("h-7 w-7", getClass("/select", "icon"))} />{" "}
            <span className={getClass("/select", "font")}>ลงทะเบียนชมรม</span>
          </a>
        </Link>
        {logged && userData.admin && (
          <Link passHref href="/admin">
            <a
              className={classnames(
                "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
                getClass("/admin", "bg")
              )}
            >
              <LibraryIcon className={classnames("h-7 w-7", getClass("/admin", "icon"))} />{" "}
              <span className={getClass("/admin", "font")}>Dashboard</span>
            </a>
          </Link>
        )}
        {userData && userData.tucmc && (
          <Link passHref href="/TUCMC/view-web">
            <a
              className={classnames(
                "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
                getClass("/TUCMC/view-web", "bg")
              )}
            >
              <CheckCircleIcon className={classnames("h-7 w-7", getClass("/TUCMC/view-web", "icon"))} />{" "}
              <span className={getClass("/TUCMC/view-web", "font")}>ตรวจสอบข้อมูลชมรม</span>
            </a>
          </Link>
        )}
        {(logged && userData.panelID) && <Link passHref href="/panel/evaluate">
          <div
           className={classnames("flex flex-row border-l-2 border-TUCMC-orange-500 items-center space-x-4 pl-4 py-3 pr-8", getClass("/panel/evaluate", "bg"))}>
          <AcademicCapIcon className={classnames("w-7 h-7 animate-pulse text-TUCMC-orange-500", getClass("/panel/evaluate", "icon"))}/> <span
            className={classnames("text-TUCMC-orange-500", getClass("/panel/evaluate", "font"))}>ประเมินผล</span>
          </div>
        </Link>}
        {logged && userData.panelID && (
          <Link passHref href="/panel">
            <a
              className={classnames(
                "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
                getClass("/panel", "bg")
              )}
            >
              <TerminalIcon className={classnames("h-7 w-7", getClass("/panel", "icon"))} />{" "}
              <span className={getClass("/panel", "font")}>แผงควบคุม</span>
            </a>
          </Link>
        )}
        {logged && (
          <Link passHref href="/account">
            <a
              className={classnames(
                "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
                getClass("/account", "bg")
              )}
            >
              <CogIcon className={classnames("h-7 w-7", getClass("/account", "icon"))} />{" "}
              <span className={getClass("/account", "font")}>จัดการบัญชี</span>
            </a>
          </Link>
        )}
        <Link passHref href="/clubs">
          <a
            className={classnames(
              "flex cursor-pointer flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/clubs", "bg")
            )}
          >
            <ClipboardListIcon className={classnames("h-7 w-7", getClass("/clubs", "icon"))} />{" "}
            <span className={getClass("/clubs", "font")}>รายชื่อชมรม</span>
          </a>
        </Link>
        {/* <Link passHref href="/dummy">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/instructions", "bg")
            )}
          >
            <CalendarIcon className={classnames("h-7 w-7", getClass("/instructions", "icon"))} />{" "}
            <span className={getClass("/info", "font")}>ระบบจำลอง</span>
          </a>
        </Link> */}
        <Link passHref href="/FAQ">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/FAQ", "bg")
            )}
          >
            <ChatIcon className={classnames("h-7 w-7", getClass("/FAQ", "icon"))} />{" "}
            <span className={getClass("/FAQ", "font")}>คำถามที่พบบ่อย</span>
          </a>
        </Link>
        <Link passHref href="https://clubs.triamudom.ac.th">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("https://clubs.triamudom.ac.th", "bg")
            )}
          >
            <LogoIcon className={classnames("h-7 w-7", getClass("https://clubs.triamudom.ac.th", "icon"))} />{" "}
            <span className={getClass("https://clubs.triamudom.ac.th", "font")}>ทำความรู้จัก กช.</span>
          </a>
        </Link>
        <Link passHref href="/contact">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/contact", "bg")
            )}
          >
            <MailIcon className={classnames("h-7 w-7", getClass("/contact", "icon"))} />{" "}
            <span className={getClass("/contact", "font")}>ติดต่อ</span>
          </a>
        </Link>
      </motion.div>
    </>
  )
}

export default Navigation
