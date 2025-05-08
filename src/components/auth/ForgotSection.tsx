import { Input } from "@components/auth/Input"
import { Button } from "@components/common/Inputs/Button"
import React, { useState } from "react"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import { forgot } from "@client/fetcher/user"
import { useToast } from "@components/common/Toast/ToastContext"
import classnames from "classnames"
import Router from "next/router"

export const ForgotSection = ({ swapFunction, setLoader }) => {
  const [email, setEmail] = useState("")
  const { addToast } = useToast()

  const submit = async (event) => {
    event.preventDefault()

    const res = await forgot(email)
    if (!res.status) {
      switch (res.report) {
        case "missingEmail":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบอีเมลนี้บนฐานข้อมูล",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล",
          })
          break
        case "mailServiceError":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่สามารถส่งอีเมลได้ในขณะนี้",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล",
          })
      }
    } else {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ส่งคำขอเปลี่ยนรหัสผ่านแล้ว",
        text: "คำขอได้ถูกส่งแล้วกรุณาเช็คอีเมลที่ระบุเพื่อดำเนินการเปลี่ยนรหัสผ่านต่อไป หากยังไม่พบอีกเมลให้ลองส่งฟอร์มนี้ใหม่อีกรอบ",
      })

      // if (res.url && res.status) Router.push(res.url)
      setEmail("")
    }
  }

  return (
    <div style={{ maxWidth: "26rem" }} className="mx-auto mb-16 min-h-screen space-y-8 py-10 px-6 md:my-10 md:mb-14">
      <h1 className="text-3xl">ขอเปลี่ยนรหัสผ่าน</h1>
      <form onSubmit={submit}>
        <div className="space-y-6">
          <div>
            <span className="tracking-tight text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              className={classnames(
                "outline-none w-full appearance-none rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500",
                "text-lg placeholder-gray-500"
              )}
              required
            />
          </div>
        </div>
        <div className="mt-8 flex w-full items-center justify-between">
          <div onClick={swapFunction} className="flex cursor-pointer items-center space-x-2">
            <ArrowLeftIcon className="h-5 w-5" />
            <h1 className="whitespace-nowrap">ย้อนกลับ</h1>
          </div>
          <Button
            type="submit"
            className="cursor-pointer rounded-md bg-TUCMC-pink-400 px-5 py-3 tracking-tight text-white shadow-md"
          >
            <span>ยืนยัน</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
