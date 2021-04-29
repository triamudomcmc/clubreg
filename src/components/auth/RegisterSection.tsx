import {Input} from "@components/auth/Input";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import React, {Fragment, useState} from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Router from "next/router";
import {Button} from "@components/common/Inputs/Button";

const people = [
  {id: 1, name: 'ม.4'},
  {id: 2, name: 'ม.5'},
  {id: 3, name: 'ม.6'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RegisterSection = ({swapFunction}) => {
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

  const onsubmit = async (event) => {
    event.preventDefault()

    const data = {
      action: "register",
      stdID: stdID,
      email: email,
      phone: phone,
      room: room,
      level: selected,
      number: number,
      firstname: firstname,
      lastname: lastname,
      confirmPassword: conpass,
      password: password
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
        Router.push({
          pathname: '',
          query: ""
        })
        Router.reload()
      } else {
        console.log(result.report)
      }
    } catch (error) {
      console.log(error)
    }

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
        <Input title="ชื่อ" stateUpdate={setFirstname}/>
        <Input title="นามสกุล (หากมีชื่อกลาง ให้กรอกในช่องนี้)" stateUpdate={setLastname}/>
        <Input title="เลขประจำตัวนักเรียน" stateUpdate={setStdID}/>
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
        <Input title="ห้องเรียน" stateUpdate={setRoom}/>
        <Input title="เลขที่" stateUpdate={setNumber}/>
        <Input title="Email" stateUpdate={setEmail}/>
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
                <option>TH</option>
                <option>DE</option>
              </select>
            </div>
            <input
              onChange={(event) => {setPhone(event.target.value)}}
              type="text"
              name="phone_number"
              id="phone_number"
              className="focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-full pl-16 text-lg border-gray-300 rounded-md"
              placeholder="+66"
            />
          </div>
        </div>
        <Input title="รหัสผ่าน" type="password" stateUpdate={setPassword}/>
        <Input title="ยืนยันรหัสผ่าน" type="password" stateUpdate={setConpass}/>
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