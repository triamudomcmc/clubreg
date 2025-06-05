import React, { useCallback, useEffect, useRef, useState } from "react"
import { LockClosedIcon } from "@heroicons/react/solid"
import { useAuth } from "@client/auth"
import { useToast } from "@components/common/Toast/ToastContext"
import { request } from "@client/utilities/request"
import { AcademicCapIcon, EyeIcon } from "@heroicons/react/outline"
import { motion } from "framer-motion"
import { schoolYear, endRegClubTime } from "@config/time"

const LoginSection = ({ primaryAction, setLoader, secAction, query }) => {
  const { reFetch } = useAuth()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState(null)
  const [remember, setRemember] = useState(false)
  const [otpBox, setOTPBox] = useState(false)
  const [atDigit, setAtDigit] = useState(0)
  const [rawOTP, setRawOTP] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" })
  const seriesInput = useRef([])
  const { addToast, clearToast } = useToast()
  const openRegister = new Date().getTime() < new Date(endRegClubTime).getTime()

  useEffect(() => {
    if (atDigit >= 0 && atDigit <= 5) {
      document.getElementById(`otp${atDigit + 1}`)?.focus()
    }
  }, [atDigit])

  useEffect(() => {
    const otp = Object.values(rawOTP).join("")
    if (otp.length === 6) {
      sendCode(otp)
    }
  }, [rawOTP[5]])

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
      remember,
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
          // @ts-ignore
          document.getElementById("otp1").value = ""
          // @ts-ignore
          document.getElementById("otp2").value = ""
          // @ts-ignore
          document.getElementById("otp3").value = ""
          // @ts-ignore
          document.getElementById("otp4").value = ""
          // @ts-ignore
          document.getElementById("otp5").value = ""
          // @ts-ignore
          document.getElementById("otp6").value = ""
          setRawOTP({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" })
          setAtDigit(0)
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

  const getrawOTP = useCallback(() => {
    return rawOTP
  }, [rawOTP])

  const onsubmit = async (event) => {
    event.preventDefault()

    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    localStorage.setItem("verify", "")
    const result = await request("database/auth", "login", { stdID: ID, password: password, remember })

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
        case "disabled2FA":
          addToast({
            theme: "modern",
            icon: "warning",
            title: "ทำการปิด 2FA ชั่วคราว",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง และตั้งค่า 2FA อีกครั้งได้ที่ บัญชี > จัดการบัญชี > ความปลอดภัย > เปิดใช้งาน 2FA",
            lifeSpan: 100000,
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
          setOTPBox(true)
          setTimeout(() => {
            document.getElementById(`otp1`)?.focus()
          }, 300)
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
      {otpBox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="fixed top-0 left-0 z-[99] flex min-h-screen w-full items-center justify-center bg-gray-800 bg-opacity-20 backdrop-blur-sm"
        >
          <div className={"max-w-[290px] rounded-md bg-white px-6 pt-4 pb-4"}>
            <h1 className={"text-lg font-bold text-TUCMC-gray-800"}>2FA Authentication</h1>
            <p className={"text-sm leading-5 text-gray-600"}>
              กรุณากรอกรหัสจากแอพ Authenticator เพื่อเข้าสู่ระบบสำหรับเบราว์เซอร์นี้
            </p>
            <div className="mt-4 flex w-full justify-center space-x-1">
              <div className="flex space-x-4">
                <div className="flex space-x-1">
                  <input
                    type="number"
                    value={rawOTP[0]}
                    min={0}
                    max={9}
                    onChange={(e) => {
                      e.target.value !== "" && setAtDigit((prev) => 1)
                      e.target.value.length > 1
                        ? () => {
                            setRawOTP((prev) => ({ ...prev, 1: e.target.value }))
                            setAtDigit(1)
                          }
                        : setRawOTP((prev) => ({ ...prev, 0: e.target.value }))
                    }}
                    id="otp1"
                    className="webkit-none h-10 w-8 rounded-md border border-TUCMC-gray-800 border-opacity-50 p-0 text-center text-2xl font-bold"
                  />
                  <input
                    type="number"
                    value={rawOTP[1]}
                    min={0}
                    max={9}
                    onChange={(e) => {
                      e.target.value === "" ? setAtDigit((prev) => 0) : setAtDigit(2)
                      e.target.value.length > 1
                        ? () => {
                            setRawOTP((prev) => ({ ...prev, 2: e.target.value }))
                            setAtDigit(2)
                          }
                        : setRawOTP((prev) => ({ ...prev, 1: e.target.value }))
                    }}
                    id="otp2"
                    className="webkit-none h-10 w-8 rounded-md border border-TUCMC-gray-800 border-opacity-50 p-0 text-center text-2xl font-bold"
                  />
                  <input
                    type="number"
                    value={rawOTP[2]}
                    min={0}
                    max={9}
                    onChange={(e) => {
                      e.target.value === "" ? setAtDigit((prev) => 1) : setAtDigit(3)
                      e.target.value.length > 1
                        ? () => {
                            setRawOTP((prev) => ({ ...prev, 3: e.target.value }))
                            setAtDigit(3)
                          }
                        : setRawOTP((prev) => ({ ...prev, 2: e.target.value }))
                    }}
                    id="otp3"
                    className="webkit-none h-10 w-8 rounded-md border border-TUCMC-gray-800 border-opacity-50 p-0 text-center text-2xl font-bold"
                  />
                </div>
                <div className="flex space-x-1">
                  <input
                    type="number"
                    value={rawOTP[3]}
                    min={0}
                    max={9}
                    onChange={(e) => {
                      e.target.value === "" ? setAtDigit((prev) => 2) : setAtDigit(4)
                      e.target.value.length > 1
                        ? () => {
                            setRawOTP((prev) => ({ ...prev, 4: e.target.value }))
                            setAtDigit(4)
                          }
                        : setRawOTP((prev) => ({ ...prev, 3: e.target.value }))
                    }}
                    id="otp4"
                    className="webkit-none h-10 w-8 rounded-md border border-TUCMC-gray-800 border-opacity-50 p-0 text-center text-2xl font-bold"
                  />
                  <input
                    type="number"
                    value={rawOTP[4]}
                    min={0}
                    max={9}
                    onChange={(e) => {
                      e.target.value === "" ? setAtDigit((prev) => 3) : setAtDigit(5)
                      e.target.value.length > 1
                        ? () => {
                            setRawOTP((prev) => ({ ...prev, 5: e.target.value }))
                            setAtDigit(5)
                          }
                        : setRawOTP((prev) => ({ ...prev, 4: e.target.value }))
                    }}
                    id="otp5"
                    className="webkit-none h-10 w-8 rounded-md border border-TUCMC-gray-800 border-opacity-50 p-0 text-center text-2xl font-bold"
                  />
                  <input
                    type="number"
                    value={rawOTP[5]}
                    min={0}
                    max={9}
                    onChange={(e) => {
                      e.target.value === "" && setAtDigit((prev) => 4)
                      setRawOTP((prev) => ({ ...prev, 5: e.target.value }))
                    }}
                    id="otp6"
                    className="webkit-none h-10 w-8 rounded-md border border-TUCMC-gray-800 border-opacity-50 p-0 text-center text-2xl font-bold"
                  />
                </div>
              </div>
            </div>
            <h1 className="mt-3 cursor-pointer text-center text-xs text-gray-600 hover:underline">
              ไม่สามารถเข้าสู่ระบบ
            </h1>
          </div>
        </motion.div>
      )}
      {!type ? (
        <div>
          <h1 className="text-center text-4xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
          <div className="mt-4 mb-8 text-center text-lg leading-tight tracking-wide text-TUCMC-gray-600">
            <p>เลือกรูปแบบของบัญชี</p>
            <p>ที่คุณต้องการเข้าสู่ระบบลงทะเบียนชมรม</p>
          </div>
          <div className="flex space-x-4">
            <motion.div
              onClick={() => {
                setType("student")
              }}
              whileHover={{ scale: 1.02 }}
              className="flex h-[140px] w-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-TUCMC-pink-400 text-white shadow-md"
            >
              <AcademicCapIcon className="h-12 w-12" />
              <h1 className="mt-1 font-semibold">นักเรียน</h1>
            </motion.div>
            <motion.div
              onClick={() => {
                setType("teacher")
              }}
              whileHover={{ scale: 1.02 }}
              className="flex h-[140px] w-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-TUCMC-pink-400 text-white shadow-md"
            >
              <EyeIcon className="h-12 w-12" />
              <h1 className="mt-1 font-semibold">ครูที่ปรึกษา</h1>
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
          <div className="mt-2 text-center text-TUCMC-gray-600">
            <p>ระบบลงทะเบียนชมรม</p>
            <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา {new Date(schoolYear).getFullYear() + 543}</p>
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
                  placeholder={type === "student" ? "เลขประจำตัวนักเรียน" : "รหัสชมรม (ก30XXX)"}
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
                  <input
                    onChange={(e) => {
                      setRemember(e.target.checked)
                    }}
                    className="mr-2 h-5 w-5 rounded-md border border-gray-200 ring-0"
                    type="checkbox"
                  />
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
                {openRegister && (
                  <a
                    onClick={primaryAction}
                    className="mt-2 cursor-pointer whitespace-nowrap font-normal text-gray-600"
                  >
                    สร้างบัญชีใหม่
                  </a>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default LoginSection
