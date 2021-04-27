import {LogoIcon, WhiteLogo} from "@vectors/Logo";
import {DropdownMenu} from "@vectors/buttons/Menu";
import NavButton from "@components/common/Navigation/NavButton";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {House} from "@vectors/icons/House";
import {SortDecending} from "@vectors/icons/Sorts";
import {ListClipboard} from "@vectors/icons/Clipboard";
import {Calendar} from "@vectors/icons/Calendar";
import {Chat} from "@vectors/icons/Chat";
import {DocumentText} from "@vectors/icons/Document";
import {Key} from "@vectors/icons/Key";
import {Login} from "@vectors/icons/Auth";
import Link from 'next/link'
import {detectOuside} from "@utilities/document";
import Router from "next/router";
import classnames from "classnames"
import {useAuth} from "@client/auth";

const Navigation = () => {

  const { onReady } = useAuth()

  const [name, setName] = useState("")
  const [extraData, setExtraData] = useState("")

  const [reveal, setReaveal] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [initial, setInitial] = useState(true)
  const panel = useRef(null)
  const [path, setPath] = useState("/")

  detectOuside(panel, reveal, () => {
    setReaveal(false)
  })

  useEffect(() => {
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
  },[])

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
    if(path == expected){
      switch (part) {
        case "bg":
          return "bg-TUCMC-pink-100 border-TUCMC-pink-400 text-pink-400"
        case "font":
          return ""
        case "icon":
          return ""
      }
    }else{
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
              <Link href="/">
                <h1 className="cursor-pointer text-white">หน้าแรก</h1>
              </Link>
              <h1 className="text-white">วิธีใช้</h1>
              <Link href="/clubs">
                <h1 className="text-white">ชมรม</h1>
              </Link>
              <h1 className="text-white">FAQ</h1>
              <h1 className="text-white">กช.</h1>
              <h1 className="text-white">ติดต่อ</h1>
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
                  className="fixed top-0 bg-white h-full z-50">
        <div className="bg-TUCMC-gray-800 p-4">
          <Link href="/">
            <div>
              <WhiteLogo/>
            </div>
          </Link>
        </div>
        {onReady((logged, userData) => {
          if (logged) {
            return <div className="bg-TUCMC-gray-100 my-4 px-6 py-2">
              <h1 className="text-TUCMC-gray-900">{`${userData.prefix}${userData.firstname} ${userData.lastname}`}</h1>
              <h1 className="text-TUCMC-gray-700 tracking-tight">{`${userData.stdID} | ${userData.room} / ${userData.number}`}</h1>
            </div>
          }
        })}
        <Link href="/">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/","bg"))}>
            <House className={classnames("w-7 h-7", getClass("/","icon"))}/> <span
            className={getClass("/","font")}>หน้าแรก</span>
          </div>
        </Link>
        <Link href="/auth">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/auth","bg"))}>
            <Login className={classnames("w-7 h-7", getClass("/auth","icon"))}/> <span
            className={getClass("/auth","font")}>เข้าสู่ระบบ</span>
          </div>
        </Link>
        <Link href="/clubs">
          <div
            className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/clubs","bg"))}>
            <ListClipboard className={classnames("w-7 h-7", getClass("/clubs","icon"))}/> <span
            className={getClass("/clubs","font")}>รายชื่อชมรม</span>
          </div>
        </Link>
        <div
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/info","bg"))}>
          <Calendar className={classnames("w-7 h-7", getClass("/info","icon"))}/> <span
          className={getClass("/info","font")}>วิธีลงทะเบียน</span>
        </div>
        <div
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/FAQ","bg"))}>
          <Chat className={classnames("w-7 h-7", getClass("/FAQ","icon"))}/> <span
          className={getClass("/FAQ","font")}>คำถามที่พบบ่อย</span>
        </div>
        <div
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/TUCMC","bg"))}>
          <LogoIcon className={classnames("w-7 h-7", getClass("/TUCMC","icon"))}/> <span className={getClass("/TUCMC","font")}>ทำความรู้จัก กช.</span>
        </div>
        <div
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/tos","bg"))}>
          <DocumentText className={classnames("w-7 h-7", getClass("/tos","icon"))}/> <span
          className={getClass("/tos","font")}>ข้อตกลงและเงื่อนไขการใช้งาน</span>
        </div>
        <div
          className={classnames("flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8", getClass("/policy","bg"))}>
          <Key className={classnames("w-7 h-7", getClass("/policy","icon"))}/> <span
          className={getClass("/policy","font")}>นโยบายความเป็นส่วนตัว</span>
        </div>
      </motion.div>
    </>
  )
}

export default Navigation
