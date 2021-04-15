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

const detectOuside = (ref, dep, callback) => {
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && dep) {
        callback()
      }
    }


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dep]);
}

const Navigation = () => {
  const [reveal, setReaveal] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [initial, setInitial] = useState(true)
  const panel = useRef(null)
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
  return (
    <>
      <motion.div animate={reveal ? "open" : "closed"}
                  className="sticky z-50 top-0 flex flex-row items-center justify-center bg-TUCMC-gray-900 h-16 px-6">
        <div className="flex flex-row justify-between items-center w-full max-w-7xl">
          <WhiteLogo/>
          <div className="flex flex-row">
            <div className="flex-row space-x-10 whitespace-nowrap font-medium hidden md:flex">
              <h1 className="text-white">หน้าแรก</h1>
              <h1 className="text-white">วิธีใช้</h1>
              <h1 className="text-white">ชมรม</h1>
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
          <WhiteLogo/>
        </div>
        <div className="bg-TUCMC-gray-100 my-4 px-6 py-2">
          <h1 className="text-TUCMC-gray-900">นายพีรดนย์ สาเงิน</h1>
          <h1 className="text-TUCMC-gray-700 tracking-tight">59574 | ม.5/913</h1>
        </div>
        <div
          className="flex flex-row border-l-2 bg-TUCMC-pink-100 text-pink-400 items-center border-TUCMC-pink-400 space-x-4 pl-4 py-3 pr-8">
          <House className="w-7 h-7"/> <span>หน้าแรก</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <SortDecending className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">ลงทะเบียนชมรม</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <ListClipboard className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">รายชื่อชมรม</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <Calendar className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">วิธีลงทะเบียน</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <Chat className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">คำถามที่พบบ่อย</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <LogoIcon className="text-TUCMC-gray-500 w-7 h-7"/> <span className="text-TUCMC-gray-800">ทำความรู้จัก กช.</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <DocumentText className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">ข้อตกลงและเงื่อนไขการใช้งาน</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <Key className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">นโยบายความเป็นส่วนตัว</span>
        </div>
        <div
          className="flex flex-row border-l-2 items-center space-x-4 pl-4 py-3 pr-8 hover:bg-TUCMC-gray-100 cursor-pointer">
          <Login className="text-TUCMC-gray-500 w-7 h-7"/> <span
          className="text-TUCMC-gray-800">เข้าสู่ระบบ</span>
        </div>
      </motion.div>
    </>
  )
}

export default Navigation
