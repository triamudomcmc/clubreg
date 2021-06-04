import {Input} from "@components/auth/Input";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import React, {Fragment, useState} from "react";
import Router from "next/router";
import {Button} from "@components/common/Inputs/Button";
import {useToast} from "@components/common/Toast/ToastContext";
import {request} from "@client/utilities/request";

const people = [
  {id: 1, name: 'ม.4'},
  {id: 2, name: 'ม.5'},
  {id: 3, name: 'ม.6'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RegisterSection = ({swapFunction, setLoader}) => {

  const {addToast} = useToast()

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
        text: "ข้อมูลในช่อง Email และช่องยืนยัน Email จะต้องเหมือนกัน กรุณาลองใหม่อีกครั้ง"
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
      level: selected.name,
      number: number,
      firstname: firstname,
      lastname: lastname,
      confirmPassword: conpass,
      password: password,
    }

    const result = await request("database/auth", "register", data)

    if (result.status) {
      await Router.push({
        pathname: '',
        query: ""
      })
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ลงทะเบียนเสร็จสมบูรณ์",
        text: "การลงทะเบียนเสร็จสมบูรณ์ ผู้ใช้งานสามารถเข้าสู่ระบบได้ทันที",
        lifeSpan: 0
      })
      swapFunction("login")
    } else {
      switch (result.report) {
        case "user_exists":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "มีบัญชีนี้อยู่แล้วในระบบ",
            text: "คุณเคยลงทะเบียนแล้ว กรุณาเข้าสู่ระบบที่ส่วนสำหรับการเข้าสู่ระบบ หากคุณไม่เคยลงทะเบียนมาก่อนแล้วพบข้อความนี้กรุณาติดต่อทาง กช."
          })
          break
        case "invalid_stdID":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบรหัสนักเรียนนี้ในฐานข้อมูล",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล"
          })
          break
        case "mismatch_data":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ข้อมูลที่ระบุไม่ตรงกับข้อมูลบนฐานข้อมูล",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล"
          })
          break
        case "invalid_data":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "อีเมล หรือ เบอร์โทรศัพท์ ที่ระบุไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช."
          })
          break
        case "invalid_credentials":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่เหมาะสม",
            text: "รหัสผ่านจะต้องมีความยาวไม่ต่ำกว่า 8 ตัวอักษร กรุณาลองใหม่อีกครั้ง"
          })
          break
        case "password_mismatch":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ช่องรหัสผ่านและช่องยืนยันรหัสผ่านไม่ตรงกัน",
            text: "ข้อมูลในช่องรหัสผ่านและช่องยืนยันรหัสผ่านจะต้องเหมือนกัน กรุณาลองใหม่อีกครั้ง"
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
    <div className="flex flex-col items-center mt-6 mx-6 sm:mx-0">
      <div className="w-full flex justify-start sm:justify-center">
        <div className="flex flex-col items-start pl-5 border-l-3/2 border-black">
          <h1 className="text-2xl tracking-tight sm:tracking-wide">ยืนยันตัวตนและสร้างบัญชี</h1>
          <p className="text-gray-600 sm:tracking-wide">กรุณากรอกข้อมูลด้วยความระมัดระวัง</p>
        </div>
      </div>
      <form onSubmit={onsubmit} className="w-full mt-8 space-y-6">
        <Input title="ชื่อ" stateUpdate={setFirstname} required={true}/>
        <Input title="นามสกุล (หากมีชื่อกลาง ให้กรอกในช่องนี้)" stateUpdate={setLastname} required={true}/>
        <Input title="เลขประจำตัวนักเรียน" stateUpdate={setStdID} required={true}/>
        <div className="w-full">
          <Listbox value={selected} onChange={setSelected}>
            {({open}) => (
              <>
                <Listbox.Label className="block text-gray-700">ระดับชั้น</Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button
                    className="bg-white relative w-full border border-gray-300 text-lg rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500">
                    <span className="block truncate">{selected.name}</span>
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                      className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
                    >
                      {people.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({active}) =>
                            classNames(
                              active ? 'text-white bg-TUCMC-pink-600' : 'text-gray-900',
                              'cursor-default select-none relative py-2 pl-3 pr-9'
                            )
                          }
                          value={person}
                        >
                          {({selected, active}) => (
                            <>
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person.name}
                        </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-TUCMC-pink-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
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
        <Input title="ห้องเรียน" stateUpdate={setRoom} required={true}/>
        <Input title="เลขที่" stateUpdate={setNumber} required={true}/>
        <Input title="Email" stateUpdate={setEmail} required={true}/>
        <Input title="ยืนยัน Email" stateUpdate={setConEmail} required={true}/>
        <div>
          <span className="text-gray-700 tracking-tight">เบอร์โทรศัพท์</span>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 text-md rounded-md"
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
              className="focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-full pl-16 text-lg border-gray-300 rounded-md"
              placeholder="0925353535"
              required={true}
            />
          </div>
        </div>
        <Input title="รหัสผ่าน" type="password" stateUpdate={setPassword} required={true}/>
        <Input title="ยืนยันรหัสผ่าน" type="password" stateUpdate={setConpass} required={true}/>
        <div className="flex justify-end w-full">
          <Button type="submit" className="cursor-pointer shadow-md bg-TUCMC-pink-400 text-white tracking-tight rounded-md px-5 py-3">
            <span>ยืนยันตัวตน</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterSection