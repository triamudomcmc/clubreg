import React, {useEffect, useRef, useState} from "react";
import {LockClosedIcon} from "@heroicons/react/solid";
import {useAuth} from "@client/auth";
import {useToast} from "@components/common/Toast/ToastContext";
import {request} from "@client/utilities/request";

const LoginSection = ({primaryAction, setLoader, secAction, query}) => {

  const {reFetch} = useAuth()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [scode, setScode] = useState([])
  const seriesInput = useRef([])
  const {addToast, clearToast} = useToast()

  const sendCode = async (code) => {

    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    const verify = localStorage.getItem("verify")
    const result = await request("database/auth", "login", {stdID: ID, password: password, verify: verify || "", code: code})

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
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง"
          })
          break
        case "incorrectCode":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ กดเข้าสู่ระบบเพื่อรับรหัสผ่านใหม่อีกรอบ"
          })
          break
        case "invalid_password":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้"
          })
          break
        case "invalid_user":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบผู้ใช้งานที่ใช้รหัสนักเรียนนี้",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากยังไม่ได้สร้างบัญชีให้ดำเนินการสร้างบัญชีผู้ใช้ก่อน"
          })
          break
        default:
          addToast({
            theme: "modern",
            icon: "cross",
            title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช."
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
    const result = await request("database/auth", "login", {stdID: ID, password: password})

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
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง"
          })
          break
        case "invalid_password":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้"
          })
          break
        case "notAuthorised":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "บัญชี้นี้ไม่ได้อนุญาตให้ใช้เบราว์เซอร์นี้เข้าสู่ระบบ",
            lifeSpan: 100000,
            text: <div>
              <p>กรุณาลองตรวจสอบ Email เพื่ออนุญาตเบราว์เซอร์นี้ให้เข้าสู่ระบบได้ชั่วคราว</p>
              <div className="w-full flex justify-center space-x-1 mt-2">
                {
                  [...Array(6)].map((_, i) => (
                    <input key={`si-${i}`} ref={(e) => {
                      seriesInput.current[i] = e
                    }} onChange={(e) => {
                      if (e.target.value.length >= 1 && i < 5) {
                        seriesInput.current[i + 1].focus()
                      }
                      setScode(prev => {
                        const newI = [...prev]
                        newI[i] = e.target.value
                        return newI
                      })
                    }} maxLength={1} className="h-8 w-8 text-2xl text-center rounded-md appearance-none border"/>
                  ))
                }
              </div>
            </div>
          })
          localStorage.setItem("verify", result.data.taskId)
          break
        case "invalid_user":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบผู้ใช้งานที่ใช้รหัสนักเรียนนี้",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากยังไม่ได้สร้างบัญชีให้ดำเนินการสร้างบัญชีผู้ใช้ก่อน"
          })
          break
        default:
          addToast({
            theme: "modern",
            icon: "cross",
            title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช."
          })
      }
    }

    clearTimeout(loaderTimeout)
    setLoader(false)

  }

  return (
    <div className="flex flex-col items-center mt-6 pt-8">
      <h1 className="font-bold text-4xl tracking-tight">เข้าสู่ระบบ</h1>
      <div className="text-TUCMC-gray-600 text-center mt-2">
        <p>ระบบลงทะเบียนชมรม</p>
        <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2564</p>
      </div>
      <form className="w-full" onSubmit={onsubmit}>
        <div className="px-6 w-full space-y-7 mt-10">
          <div className="flex flex-col w-full -space-y-px">
            <input
              onChange={event => {
                setID(event.target.value)
              }}
              type="text"
              className="appearance-none webkit-rounded-t-md border border-gray-300 px-4 py-2 placeholder-gray-500 text-lg focus:z-10 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500"
              placeholder="เลขประจำตัวนักเรียน" required/>
            <input
              onChange={event => {
                setPassword(event.target.value)
              }}
              type="password"
              className="border appearance-none border-gray-300 webkit-rounded-b-md px-4 py-2 placeholder-gray-500 text-lg focus:z-10 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500"
              placeholder="รหัสผ่าน" required/>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row">
              <input className="w-5 h-5 border rounded-md border-gray-200 ring-0 mr-2"
                     type="checkbox"/>
              <span className="whitespace-nowrap">จดจำฉันไว้ในระบบ</span>
            </div>
            <span onClick={secAction} className="text-TUCMC-pink-400 cursor-pointer">
              ลืมรหัสผ่าน
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <button type="submit"
                    className="relative flex justify-center items-center bg-TUCMC-pink-400 rounded-md text-white py-2 w-full">
              <div className="absolute left-4">
                <LockClosedIcon className="w-5 h-5"/>
              </div>
              <span>ล็อกอิน</span>
            </button>
            <a onClick={primaryAction}
               className="font-normal cursor-pointer text-gray-600 mt-2 whitespace-nowrap">สร้างบัญชีใหม่</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginSection
