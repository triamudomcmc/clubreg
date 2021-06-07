import {Input} from "@components/auth/Input";
import {Button} from "@components/common/Inputs/Button";
import React, {useState} from "react";
import {ArrowLeftIcon} from "@heroicons/react/solid";
import {forgot} from "@client/fetcher/user";
import {useToast} from "@components/common/Toast/ToastContext";
import classnames from "classnames";

export const ForgotSection = ({swapFunction, setLoader}) => {

  const [email, setEmail] = useState("")
  const {addToast} = useToast()

  const submit = async (event) => {
    event.preventDefault()

    const res = await forgot(email)
    if (!res.status) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ไม่พบอีเมลนี้บนฐานข้อมูล",
        text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล"
      })
    }else{
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ส่งคำขอเปลี่ยนรหัสผ่านแล้ว",
        text: "คำขอได้ถูกส่งแล้วกรุณาเช็คอีเมลที่ระบุเพื่อดำเนินการเปลี่ยนรหัสผ่านต่อไป หากยังไม่พบอีกเมลให้ลองส่งฟอร์มนี้ใหม่อีกรอบ"
      })
      setEmail("")
    }
  }

  return (
    <div style={{maxWidth: "26rem"}} className="mx-auto py-10 mb-16 md:my-10 md:mb-14 space-y-8 min-h-screen px-6">
      <h1 className="text-3xl">ขอเปลี่ยนรหัสผ่าน</h1>
      <form onSubmit={submit}>
        <div className="space-y-6">
          <div>
            <span className="text-gray-700 tracking-tight">Email</span>
            <input
              type="email"
              value={email}
              onChange={event => {setEmail(event.target.value)}}
              className={classnames("appearance-none outline-none border shadow-sm border-gray-300 rounded-md px-4 py-2 w-full focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500","text-lg placeholder-gray-500")} required/>
          </div>
        </div>
        <div className="flex justify-between items-center w-full mt-8">
          <div onClick={swapFunction} className="flex items-center space-x-2 cursor-pointer">
            <ArrowLeftIcon className="w-5 h-5"/>
            <h1 className="whitespace-nowrap">ย้อนกลับ</h1>
          </div>
          <Button type="submit" className="cursor-pointer shadow-md bg-TUCMC-pink-400 text-white tracking-tight rounded-md px-5 py-3">
            <span>ยืนยัน</span>
          </Button>
        </div>
      </form>
    </div>
  )
}