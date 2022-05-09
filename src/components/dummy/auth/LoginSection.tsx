import React, { useEffect, useRef, useState } from "react"
import { LockClosedIcon } from "@heroicons/react/solid"
import { useAuth } from "@client/auth"
import { useToast } from "@components/common/Toast/ToastContext"
import { request } from "@client/utilities/request"
import Router from "next/router"
import { Tooltip } from "../common/Tooltip"
import { motion } from "framer-motion"

const LoginSection = ({ primaryAction, setLoader, secAction, query }) => {
  const { reFetch } = useAuth()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [scode, setScode] = useState([])
  const [isRegistered, setIsRegistred] = useState(true)
  const seriesInput = useRef([])
  const { addToast, clearToast } = useToast()

  const sendCode = async (code) => {
    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    const verify = localStorage.getItem("verify")
    const result = await request("database/auth", "login", {
      stdID: ID,
      password: password,
      verify: verify || "",
      code: code,
    })

    clearToast()

    if (result.status) {
      localStorage.setItem("currentPanel", "")
      localStorage.setItem("verify", "")
      clearToast()
      await reFetch()
    } else {
      switch (result.report) {
        case "invalid_credentials":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ข้อมูลไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง",
          })
          break
        case "incorrectCode":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ กดเข้าสู่ระบบเพื่อรับรหัสผ่านใหม่อีกรอบ",
          })
          break
        case "invalid_password":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้",
          })
          break
        case "invalid_user":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบผู้ใช้งานที่ใช้รหัสนักเรียนนี้",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากยังไม่ได้สร้างบัญชีให้ดำเนินการสร้างบัญชีผู้ใช้ก่อน",
          })
          break
        default:
          addToast({
            theme: "modern",
            icon: "cross",
            title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช.",
          })
      }
    }

    clearTimeout(loaderTimeout)
    setLoader(false)
  }

  useEffect(() => {
    const joined = scode.join("")
    if (joined.length === 6) {
      sendCode(joined)
    }
  }, [scode])

  useEffect(() => {
    const dummyData = JSON.parse(localStorage.getItem("dummyData") || "{}")
    if ("email" in dummyData) {
      setIsRegistred(true)
    } else {
      setIsRegistred(false)
    }
  }, [])
  const onsubmit = async (event) => {
    event.preventDefault()

    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    const result = { status: true, report: "success", data: { taskId: "" } }

    const dummyData = JSON.parse(localStorage.getItem("dummyData") || "{}")

    if ("email" in dummyData) {
      Router.push("/dummy/select")
    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ไม่พบผู้ใช้งานที่ใช้บัญชีนี้",
        text: "หากยังไม่ได้สร้างบัญชีให้ดำเนินการสร้างบัญชีผู้ใช้ก่อน",
      })
    }

    clearTimeout(loaderTimeout)
    setLoader(false)
  }

  return (
    <div className="mt-6 flex flex-col items-center pt-8">
      {!isRegistered && (
        <motion.div className="fixed top-0 left-0 z-[29] min-h-screen w-full bg-gray-500 bg-opacity-50 backdrop-blur-sm backdrop-filter"></motion.div>
      )}
      <h1 className="text-4xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
      <div className="mt-2 text-center text-TUCMC-gray-600">
        <p>ระบบลงทะเบียนชมรม</p>
        <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2565</p>
      </div>
      <form className="w-full" onSubmit={onsubmit}>
        <div className="mt-10 w-full space-y-7 px-6">
          <div className="relative flex w-full flex-col -space-y-px">
            <input
              type="text"
              className="webkit-rounded-t-md appearance-none border border-gray-300 bg-gray-100 px-4 py-2 text-lg text-TUCMC-gray-700 placeholder-gray-500 focus:z-10 focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
              placeholder="เลขประจำตัวนักเรียน"
              value="70000"
              disabled={true}
              required
            />
            <Tooltip className="top-2 left-[80px]">
              <span className="font-bold">เลขนี้เป็นเลขจำลอง</span> สำหรับในวันเปิดระบบจริง
              <br />
              นักเรียนจะต้องใช้เลขประจำตัวนักเรียนจริง
              <br />
              ในการเข้าสู่ระบบ
            </Tooltip>
            <input
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              type="password"
              className="webkit-rounded-b-md appearance-none border border-gray-300 px-4 py-2 text-lg placeholder-gray-500 focus:z-10 focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
              placeholder="รหัสผ่าน"
              required
            />
          </div>
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-row">
              <input className="mr-2 h-5 w-5 rounded-md border border-gray-200 ring-0" type="checkbox" />
              <span className="whitespace-nowrap">จดจำฉันไว้ในระบบ</span>
            </div>
            <span onClick={secAction} className="cursor-pointer text-TUCMC-pink-400">
              ลืมรหัสผ่าน
            </span>
          </div>
          <div className="flex w-full flex-col items-center">
            <button
              type="submit"
              className="relative flex w-full items-center justify-center rounded-md bg-TUCMC-pink-400 py-2 text-white"
            >
              <div className="absolute left-4">
                <LockClosedIcon className="h-5 w-5" />
              </div>
              <span>ล็อกอิน</span>
            </button>
            <a
              onClick={primaryAction}
              className="z-[30] mt-2 cursor-pointer whitespace-nowrap bg-white px-4 font-normal text-gray-600"
            >
              สร้างบัญชีใหม่
              {!isRegistered && (
                <Tooltip type="top" className="mt-2">
                  <span className="font-semibold">สำหรับนักเรียน ม.4</span> จะต้องสร้างบัญชีใหม่
                  <br />
                  ก่อนเข้าใช้งานระบบลงทะเบียนชมรม
                </Tooltip>
              )}
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginSection
