import { Input } from "@components/auth/Input"
import { Listbox, Transition } from "@headlessui/react"
import { ArrowLeftIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import React, { Fragment, useState } from "react"
import Router from "next/router"
import { Button } from "@components/common/Inputs/Button"
import { useToast } from "@components/common/Toast/ToastContext"
import { request } from "@client/utilities/request"
import classnames from "classnames"
import { Tooltip } from "../common/Tooltip"

const people = [{ id: 1, name: "ม.4" }]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const RegisterSection = ({ swapFunction, setLoader }) => {
  const { addToast } = useToast()

  const [selected, setSelected] = useState(people[0])
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [stdID, setStdID] = useState("")
  const [room, setRoom] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [conpass, setConpass] = useState("")
  const [conEmail, setConEmail] = useState("")
  const [check, setCheck] = useState(false)

  const onsubmit = async (event) => {
    event.preventDefault()
    const loaderTimeout = setTimeout(() => {
      setLoader(true)
    }, 1000)

    if (email !== conEmail) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ช่อง Email ไม่ตรงกับช่องยืนยัน Email",
        text: "ข้อมูลในช่อง Email และช่องยืนยัน Email จะต้องเหมือนกัน กรุณาลองใหม่อีกครั้ง",
      })
      clearTimeout(loaderTimeout)
      setLoader(false)
      return
    }

    if (!check) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ยังไม่ยอมรับข้อกำหนดและเงื่อนไขการใช้งาน & นโยบายความเป็นส่วนตัว",
        text: "กรุณากดยอมรับข้อกำหนดและเงื่อนไขการใช้งาน & นโยบายความเป็นส่วนตัว ก่อนสร้างบัญชี",
      })
      clearTimeout(loaderTimeout)
      setLoader(false)
      return
    }

    const data = {
      stdID: stdID,
      email: email,
      phone: phone,
      room: room,
      level: selected,
      number: number,
      firstname: firstname,
      lastname: lastname,
      confirmPassword: conpass,
      password: password,
    }

    localStorage.setItem("dummyData", JSON.stringify({ ...data, password: "", confirmPassword: "" }))

    const result = { status: true, report: "success", data: {} }

    if (result.status) {
      await Router.push({
        pathname: "",
        query: "",
      })
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ลงทะเบียนเสร็จสมบูรณ์",
        text: "การลงทะเบียนเสร็จสมบูรณ์ ผู้ใช้งานสามารถเข้าสู่ระบบได้ทันที",
      })
      swapFunction("login")
    } else {
      switch (result.report) {
        case "user_exists":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "มีบัญชีนี้อยู่แล้วในระบบ",
            text: "คุณเคยลงทะเบียนแล้ว กรุณาเข้าสู่ระบบที่ส่วนสำหรับการเข้าสู่ระบบ หากคุณไม่เคยลงทะเบียนมาก่อนแล้วพบข้อความนี้กรุณาติดต่อทาง กช.",
          })
          break
        case "invalid_stdID":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบรหัสนักเรียนนี้ในฐานข้อมูล",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล",
          })
          break
        case "mismatch_data":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ข้อมูลที่ระบุไม่ตรงกับข้อมูลบนฐานข้อมูล",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล",
          })
          break
        case "invalid_data":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "อีเมล หรือ เบอร์โทรศัพท์ ที่ระบุไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช.",
          })
          break
        case "invalid_credentials":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่เหมาะสม",
            text: "รหัสผ่านจะต้องมีความยาวไม่ต่ำกว่า 8 ตัวอักษร กรุณาลองใหม่อีกครั้ง",
          })
          break
        case "password_mismatch":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ช่องรหัสผ่านและช่องยืนยันรหัสผ่านไม่ตรงกัน",
            text: "ข้อมูลในช่องรหัสผ่านและช่องยืนยันรหัสผ่านจะต้องเหมือนกัน กรุณาลองใหม่อีกครั้ง",
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
    <div className="mx-6 mt-6 flex flex-col items-center sm:mx-0">
      <div className="flex w-full justify-start sm:justify-center">
        <div className="border-l-3/2 flex flex-col items-start border-black pl-5">
          <h1 className="text-2xl tracking-tight sm:tracking-wide">ยืนยันตัวตนและสร้างบัญชี</h1>
          <p className="text-gray-600 sm:tracking-wide">กรุณากรอกข้อมูลด้วยความระมัดระวัง</p>
        </div>
      </div>
      <form onSubmit={onsubmit} className="mt-8 w-full space-y-6">
        <Input title="ชื่อ (หากมีชื่อกลาง ให้กรอกในช่องนี้)" stateUpdate={setFirstname} required={true} />
        <Input title="นามสกุล" stateUpdate={setLastname} required={true} />
        <div className="relative">
          <span className="tracking-tight text-gray-700">เลขประจำตัวนักเรียน</span>
          <Tooltip className="x-[12] top-8 left-[80px]">
            <span className="font-bold">เลขนี้เป็นเลขจำลอง</span> สำหรับในวันเปิดระบบจริง
            <br />
            นักเรียนจะต้องใช้เลขประจำตัวนักเรียนจริง
            <br />
            ในการเข้าสู่ระบบ
          </Tooltip>
          <input
            type="text"
            className={classnames(
              "outline-none w-full appearance-none rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-TUCMC-gray-600 shadow-sm focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500",
              "text-lg placeholder-gray-500"
            )}
            value={"70000"}
            disabled={true}
          />
        </div>
        <div className="w-full">
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-gray-700">ระดับชั้น</Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-lg shadow-sm focus:border-TUCMC-pink-500 focus:ring-1 focus:ring-TUCMC-pink-500">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      {people.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active ? "bg-TUCMC-pink-600 text-white" : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}
                              >
                                {person.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-TUCMC-pink-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <Input title="ห้องเรียน" stateUpdate={setRoom} required={true} />
        <Input title="เลขที่" stateUpdate={setNumber} required={true} />
        <Input title="Email (ไม่เป็นจำเป็นต้องใช้อีเมลโรงเรียน)" stateUpdate={setEmail} required={true} />
        <Input title="ยืนยัน Email" stateUpdate={setConEmail} required={true} />
        <div>
          <span className="tracking-tight text-gray-700">เบอร์โทรศัพท์</span>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="text-md h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
              >
                <option>TH</option>
              </select>
            </div>
            <input
              onChange={(event) => {
                setPhone(event.target.value)
              }}
              type="text"
              name="phone_number"
              id="phone_number"
              className="block w-full rounded-md border-gray-300 pl-16 text-lg focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
              placeholder="0935353535"
              required={true}
            />
          </div>
        </div>
        <Input title="รหัสผ่าน" type="password" stateUpdate={setPassword} required={true} />
        <Input title="ยืนยันรหัสผ่าน" type="password" stateUpdate={setConpass} required={true} />
        <div className="flex flex-row">
          <input
            className="mr-2 h-6 w-6 rounded-md border border-gray-200 ring-0"
            onChange={(e) => {
              setCheck(e.target.checked)
            }}
            type="checkbox"
            required
          />
          <span className="text-gray-700">
            ฉันยอมรับ
            <a href="/terms-of-service" className="underline" target="_blank">
              ข้อกำหนดและเงื่อนไขการใช้งาน
            </a>{" "}
            &{" "}
            <a href="/privacy-policy" className="underline" target="_blank">
              นโยบายความเป็นส่วนตัว
            </a>
          </span>
        </div>
        <div className="flex w-full justify-between">
          <div onClick={swapFunction} className="flex cursor-pointer items-center space-x-2">
            <ArrowLeftIcon className="h-5 w-5" />
            <h1 className="whitespace-nowrap">ย้อนกลับ</h1>
          </div>
          <Button
            type="submit"
            className="cursor-pointer rounded-md bg-TUCMC-pink-400 px-5 py-3 tracking-tight text-white shadow-md"
          >
            <span>ยืนยันตัวตน</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterSection
