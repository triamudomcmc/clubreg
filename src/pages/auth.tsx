import Navigation from "@components/common/Navigation";
import PageContainer from "@components/common/PageContainer";
import {FilledInfo} from "@vectors/icons/Info";
import React, {Fragment, useState} from "react";
import {DefaultCard} from "@components/common/Cards";
import {FilledLock} from "@vectors/icons/Key";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import Router from "next/router";
import LoginSection from "@components/auth/LoginSection";
import {useAuth} from "@client/auth";
import {log} from "util";

const people = [
  { id: 1, name: 'ม.4' },
  { id: 2, name: 'ม.5' },
  { id: 3, name: 'ม.6' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Auth = ({query}) => {

  const {onReady} = useAuth()
  const [action, setAction] = useState(("register" in query) ? "register" : "login")
  const [selected, setSelected] = useState(people[0])

  onReady(logged => {
    if(logged) {
      Router.push("/select")
    }
  })

  const goRegister = () => {
    Router.push({
        pathname: '',
        query: "register"
      },
      undefined, { shallow: true }
    )
    setAction("register")
  }

  return (
    <PageContainer footer={false}>
      <div style={{maxWidth: "26rem"}} className="mx-auto my-6 mb-16 md:my-10 md:mb-10 space-y-8 min-h-screen">
        <DefaultCard>
          <p className="font-normal">นักเรียน ม.5 และ ม.6 จะไม่สามารถล็อกอินเข้าสู่ระบบด้วยบัญชีเดิมในปีการศึกษาที่ผ่านมาได้ ต้องยืนยันตัวตนและสร้างบัญชีใหม่ทั้งหมด เนื่องจากมีการออกแบบระบบใหม่</p>
        </DefaultCard>
        {action == "login" && <LoginSection primaryAction={goRegister}/>}
        {action == "register" && <div className="flex flex-col items-center mt-6 mx-6 sm:mx-0">
            <div className="w-full flex justify-start sm:justify-center">
                <div className="flex flex-col items-start pl-5 border-l-3/2 border-black">
                    <h1 className="text-2xl tracking-tight sm:tracking-wide">ยืนยันตัวตนและสร้างบัญชี</h1>
                    <p className="text-gray-600 sm:tracking-wide">กรุณากรอกข้อมูลด้วยความระมัดระวัง</p>
                </div>
            </div>
            <div className="w-full mt-8 space-y-6">
                <div>
                    <span className="text-gray-700 tracking-tight">ชื่อ</span>
                    <input
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div>
                    <span className="text-gray-700 tracking-tight">นามสกุล (หากมีชื่อกลาง ให้กรอกในช่องนี้)</span>
                    <input
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div className="w-full">
                    <span className="text-gray-700 tracking-tight">เลขประจำตัวนักเรียน</span>
                    <input
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div className="w-full">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-gray-700">ระดับชั้น</Listbox.Label>
                          <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full border border-gray-300 text-lg rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                              <span className="block truncate">{selected.name}</span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                              >
                                {people.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person.name}
                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
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
                <div>
                    <span className="text-gray-700 tracking-tight">ห้องเรียน</span>
                    <input
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div>
                    <span className="text-gray-700 tracking-tight">เลขที่</span>
                    <input
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div className="w-full">
                    <span className="text-gray-700 tracking-tight">Email</span>
                    <input
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div>
                    <span className="text-gray-700 tracking-tight">เบอร์โทรศัพท์</span>
                    <input
                        type="number"
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div>
                    <span className="text-gray-700 tracking-tight">รหัสผ่าน</span>
                    <input
                        type="password"
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div className="w-full">
                    <span className="text-gray-700 tracking-tight">ยืนยันรหัสผ่าน</span>
                    <input
                        type="password"
                        className="appearance-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full"/>
                </div>
                <div className="flex justify-end w-full">
                    <div className="cursor-pointer shadow-md bg-TUCMC-pink-400 text-white tracking-tight rounded-md px-5 py-3">
                        <span>ยืนยันตัวตน</span>
                    </div>
                </div>
            </div>
        </div>}
      </div>
    </PageContainer>
  )
}

Auth.getInitialProps = ({query}) => {
  return {query}
}

export default Auth