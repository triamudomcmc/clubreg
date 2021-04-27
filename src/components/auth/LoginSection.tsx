import {FilledLock} from "@vectors/icons/Key";
import React, {useState} from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Router from "next/router";

const LoginSection = (primaryAction) => {

  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")

  const onsubmit = async (event) => {
    event.preventDefault()

    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();

    const data = {
      action: "login",
      stdID: ID,
      password: password,
      fingerprint: fingerPrint.visitorId
    }

    try {
      const res = await fetch(`/api/database/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const result = await res.json()

      if (result.status) {
        console.log("logged")
        Router.reload()
      } else {
        console.log(result.report)
      }
    } catch (error) {
      console.log(error)
    }

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
          <div className="flex flex-col w-full">
            <input
              onChange={event => {
                setID(event.target.value)
              }}
              type="username"
              className="border-t appearance-none webkit-rounded-t-md border-l border-r border-gray-300 px-4 py-2 placeholder-gray-500 text-lg"
              placeholder="เลขประจำตัวนักเรียน"/>
            <input
              onChange={event => {
                setPassword(event.target.value)
              }}
              type="password"
              className="border appearance-none border-gray-300 webkit-rounded-b-md px-4 py-2 placeholder-gray-500 text-lg"
              placeholder="รหัสผ่าน"/>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row">
              <input className="w-5 h-5 border rounded-md border-gray-200 ring-0 mr-2"
                     type="checkbox"/>
              <span className="whitespace-nowrap">จดจำฉันไว้ในระบบ</span>
            </div>
            <span className="text-TUCMC-pink-400">
              ลืมรหัสผ่าน
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <button type="submit"
                    className="relative flex justify-center items-center bg-TUCMC-pink-400 rounded-md text-white py-2 w-full">
              <div className="absolute left-4">
                <FilledLock/>
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