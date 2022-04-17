import React, { useEffect, useRef, useState } from "react"
import { LockClosedIcon } from "@heroicons/react/solid"
import { useAuth } from "@client/auth"
import { useToast } from "@components/common/Toast/ToastContext"
import { request } from "@client/utilities/request"

const LoginSection = ({ primaryAction, setLoader, secAction, query }) => {
  const { reFetch } = useAuth()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [scode, setScode] = useState([])
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

  const onsubmit = async (event) => {
    event.preventDefault()

    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    localStorage.setItem("verify", "")
    const result = await request("database/auth", "login", { stdID: ID, password: password })

    if (result.status) {
      localStorage.setItem("currentPanel", "")
      localStorage.setItem("verify", "")
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
        case "invalid_password":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้",
          })
          break
        case "notAuthorised":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "บัญชี้นี้ไม่ได้อนุญาตให้ใช้เบราว์เซอร์นี้เข้าสู่ระบบ",
            lifeSpan: 100000,
            text: (
              <div>
                <p>กรุณาลองตรวจสอบ Email เพื่ออนุญาตเบราว์เซอร์นี้ให้เข้าสู่ระบบได้ชั่วคราว</p>
                <div className="mt-2 flex w-full justify-center space-x-1">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={`si-${i}`}
                      ref={(e) => {
                        seriesInput.current[i] = e
                      }}
                      onChange={(e) => {
                        if (e.target.value.length >= 1 && i < 5) {
                          seriesInput.current[i + 1].focus()
                        }
                        setScode((prev) => {
                          const newI = [...prev]
                          newI[i] = e.target.value
                          return newI
                        })
                      }}
                      maxLength={1}
                      className="h-8 w-8 appearance-none rounded-md border text-center text-2xl"
                    />
                  ))}
                </div>
              </div>
            ),
          })
          localStorage.setItem("verify", result.data.taskId)
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

  return (
    <div className="mt-6 flex flex-col items-center pt-8">
      <h1 className="text-4xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
      <div className="mt-2 text-center text-TUCMC-gray-600">
        <p>ระบบลงทะเบียนชมรม</p>
        <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2564</p>
      </div>
      <form className="w-full" onSubmit={onsubmit}>
        <div className="mt-10 w-full space-y-7 px-6">
          <div className="flex w-full flex-col -space-y-px">
            <input
              onChange={(event) => {
                setID(event.target.value)
              }}
              type="text"
              className="webkit-rounded-t-md appearance-none border border-gray-300 px-4 py-2 text-lg placeholder-gray-500 focus:z-10 focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
              placeholder="เลขประจำตัวนักเรียน"
              required
            />
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
            <a onClick={primaryAction} className="mt-2 cursor-pointer whitespace-nowrap font-normal text-gray-600">
              สร้างบัญชีใหม่
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginSection
