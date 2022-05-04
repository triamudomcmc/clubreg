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
} from "@heroicons/react/outline"
import { ChevronDownIcon, StarIcon } from "@heroicons/react/solid"
import Modal from "@components/common/Modals"
import { isEmpty } from "@utilities/object"

const Navigation = () => {
  const { onReady, signout } = useAuth()

  const { logged, userData } = onReady((logged, userData) => {
    return { logged, userData }
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
      <motion.div
        animate={reveal ? "open" : "closed"}
        className="sticky top-0 z-50 flex h-16 flex-row items-center justify-center bg-TUCMC-gray-900 px-6"
      >
        <div className="flex w-full max-w-6xl flex-row items-center justify-between">
          <Link passHref href="/">
            <a>
              <WhiteLogo />
            </a>
          </Link>
          <div className="flex flex-row">
            <div className="hidden flex-row space-x-10 whitespace-nowrap font-medium md:flex">
              <Link passHref href="/">
                <a className="text-white">หน้าแรก</a>
              </Link>
              <Link passHref href="/instructions">
                <a className="text-white">วิธีใช้</a>
              </Link>
              <Link passHref href="/clubs">
                <a className="text-white">ชมรม</a>
              </Link>
              <Link passHref href="/FAQ">
                <a className="text-white">FAQ</a>
              </Link>
              <Link passHref href="/TUCMC">
                <a className="text-white">กช.</a>
              </Link>
              <Link passHref href="/contact">
                <a className="text-white">ติดต่อ</a>
              </Link>
              <div className={classnames(isEmpty(userData) && "hidden")}>
                <h1 ref={accRef} className="flex cursor-pointer items-center space-x-1 text-white">
                  บัญชี <ChevronDownIcon className="h-5 w-5" />
                </h1>
                <Modal className="flex w-full justify-end" TriggerRef={accRef}>
                  <div className="absolute mt-2">
                    {logged && (
                      <div className="rounded-t-lg bg-TUCMC-gray-100 px-7 py-2 font-normal">
                        <h1 className="text-TUCMC-gray-900">{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
                        <h1 className="text-sm tracking-tight text-TUCMC-gray-700">{`${userData.student_id} | ${userData.room} / ${userData.number}`}</h1>
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
                      {/*{logged && userData.panelID &&*/}
                      {/*<Link passHref href="/panel/evaluate"><h1 className="flex space-x-1 items-center font-medium text-TUCMC-orange-500 cursor-pointer hover:text-blue-600 hover:underline"><span>ประเมินผล</span> <StarIcon className="w-4 h-4 animate-pulse"/></h1>*/}
                      {/*</Link>}*/}
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
                    <h1 className="cursor-pointer text-white">เข้าสู่ระบบ</h1>
                  </Link>
                ) : (
                  <h1 onClick={signout} className="cursor-pointer text-white">
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
        <div className="bg-TUCMC-gray-800 p-4">
          <Link passHref href="/">
            <a>
              <WhiteLogo />
            </a>
          </Link>
        </div>
        {logged && (
          <div className="my-4 bg-TUCMC-gray-100 px-6 py-2">
            <h1 className="text-TUCMC-gray-900">{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
            <h1 className="tracking-tight text-TUCMC-gray-700">{`${userData.student_id} | ${userData.room} / ${userData.number}`}</h1>
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
        {/*{(logged && userData.panelID) && <Link passHref href="/panel/evaluate">*/}
        {/*  <div*/}
        {/*    className={classnames("flex flex-row border-l-2 border-TUCMC-orange-500 items-center space-x-4 pl-4 py-3 pr-8", getClass("/panel/evaluate", "bg"))}>*/}
        {/*    <AcademicCapIcon className={classnames("w-7 h-7 animate-pulse text-TUCMC-orange-500", getClass("/panel/evaluate", "icon"))}/> <span*/}
        {/*    className={classnames("text-TUCMC-orange-500", getClass("/panel/evaluate", "font"))}>ประเมินผล</span>*/}
        {/*  </div>*/}
        {/*</Link>}*/}
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
        <Link passHref href="/instructions">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/instructions", "bg")
            )}
          >
            <CalendarIcon className={classnames("h-7 w-7", getClass("/instructions", "icon"))} />{" "}
            <span className={getClass("/info", "font")}>วิธีลงทะเบียน</span>
          </a>
        </Link>
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
        <Link passHref href="/TUCMC">
          <a
            className={classnames(
              "flex flex-row items-center space-x-4 border-l-2 py-3 pl-4 pr-8",
              getClass("/TUCMC", "bg")
            )}
          >
            <LogoIcon className={classnames("h-7 w-7", getClass("/TUCMC", "icon"))} />{" "}
            <span className={getClass("/TUCMC", "font")}>ทำความรู้จัก กช.</span>
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
