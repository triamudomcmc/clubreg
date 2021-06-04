import React, {useState} from "react";
import {ArrowUpIcon, LockClosedIcon} from "@heroicons/react/solid";
import {useAuth} from "@client/auth";
import {useToast} from "@components/common/Toast/ToastContext";
import {request} from "@client/utilities/request";
import { motion } from "framer-motion";

const LoginSection = ({primaryAction, setLoader}) => {

  const {reFetch} = useAuth()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const {addToast} = useToast()

  const onsubmit = async (event) => {
    event.preventDefault()

    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    const result = await request("database/auth", "login", {stdID: ID, password: password,})

    if (result.status) {
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
            text: "กรุณาลองใช้เบราว์เซอร์หรืออุปกรณ์อื่น หากยังไม่สามารถเข้าได้กรุณาติดต่อทาง กช. เพื่อขอปิดโหมดความปลอดภัยสูง"
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

  return (
    <div className="flex flex-col items-center mt-6 pt-8">
      <h1 className="font-bold text-4xl tracking-tight">เข้าสู่ระบบ</h1>
      <div className="text-TUCMC-gray-600 text-center mt-2">
        <p>ระบบลงทะเบียนชมรม</p>
        <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2564</p>
      </div>
      <form className="w-full" onSubmit={onsubmit}>
        <div className="px-6 w-full space-y-7 mt-10">
          <div className="flex flex-col bg-white shadow-md rounded-lg py-6 px-8 space-y-4 w-full">
            <h1 className="text-center font-medium text-xl text-TUCMC-red-500">ยังไม่เปิดให้เข้าสู่ระบบ</h1>
            <p className="text-TUCMC-gray-600">หากลงทะเบียนสำเร็จแล้วจะมี<span className="underline">การแจ้งเตือนที่มุมขวาบนของหน้าจอว่า ลงทะเบียนสำเร็จแล้ว</span> แต่ถ้าหากยังไม่ได้ดำเนินการลงทะเบียนให้กด สร้างบัญชีใหม่ ด้านล่างกล่องข้อความนี้</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row">
              <input className="w-5 h-5 border rounded-md border-gray-200 ring-0 mr-2"
                     type="checkbox" disabled/>
              <span className="whitespace-nowrap text-TUCMC-gray-500">จดจำฉันไว้ในระบบ</span>
            </div>
            <span className="text-TUCMC-gray-500">
              ลืมรหัสผ่าน
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <button type="button"
                    className="relative flex cursor-default justify-center items-center bg-TUCMC-gray-400 rounded-md text-white py-2 w-full">
              <div className="absolute left-4">
                <LockClosedIcon className="w-5 h-5"/>
              </div>
              <span>ล็อกอิน</span>
            </button>
            <a onClick={primaryAction}
               className="font-normal cursor-pointer text-gray-600 mt-2 whitespace-nowrap">สร้างบัญชีใหม่</a>
            <motion.div animate={{y: [20, 0]}} transition={{repeat: Infinity, repeatType: "reverse", duration: 1}}>
              <ArrowUpIcon className="w-10 h-10 text-TUCMC-gray-500 opacity-50"/>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginSection