import PageContainer from "@components/common/PageContainer";
import {clubMap} from "@config/clubMap";
import React, {Fragment, useEffect, useState} from "react";
import {getReport} from "@client/admin/query";
import {CheckIcon, SelectorIcon, XIcon} from "@heroicons/react/solid";
import {sliceArrN} from "@utilities/array";
import Router from "next/router";
import {getRecentMondays} from "@config/time";
import {Listbox, Transition} from "@headlessui/react";
import {useAuth} from "@client/auth";
import {Button} from "@components/common/Inputs/Button";

const people = getRecentMondays().map((item, index) => ({id: index + 1, name: item}))

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const fetchReport = async (setChecked, ts, reFetch) => {
  const res = await getReport(ts)
  if (res.status) {
    setChecked(res.data)
  }else{
    reFetch()
  }
}

const Report = () => {

  const {onReady, reFetch} = useAuth()

  const [checked, setChecked] = useState([])
  const [selected, setSelected] = useState(people[0])
  const recentMonday = getRecentMondays()

  const sliced = sliceArrN(Object.keys(clubMap), 2)

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
    return userData
  })

  useEffect(() => {
    fetchReport(setChecked, selected, reFetch)
  }, [selected])

  const goToAttendanceZone = (id) => {
    localStorage.setItem("currentPanel", id)
    Router.push("/panel/attendance")
  }

  const month = {
    1: "มกราคม",
    2: "กุมภาพันธ์",
    3: "มีนาคม",
    4: "เมษายน",
    5: "พฤษภาคม",
    6: "มิถุนายน",
    7: "กรกฎาคม",
    8: "สิงหาคม",
    9: "กันยายน",
    10: "ตุลาคม",
    11: "พฤศจิกายน",
    12: "ธันวาคม"
  }

  return(
    <PageContainer>
      {userData.safeMode ? <div className="py-12 max-w-[420px] md:max-w-[720px] mx-auto px-4">
        <h1 className="text-xl font-medium text-center mb-14">Report Summary</h1>
        <div className="w-full mb-10">
          <Listbox value={selected} onChange={setSelected}>
            {({open}) => (
              <>
                <Listbox.Label className="block text-gray-700">ช่วงวันที่ต้องการตรวจสอบ</Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button
                    className="bg-white relative w-full border border-gray-300 text-lg rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500">
                    <span className="block truncate">วันจันทร์ที่ {new Date(selected.name).getDate()} {month[new Date(selected.name).getMonth() + 1]} {new Date(selected.name).getFullYear() + 543}</span>
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
                          วันจันทร์ที่ {new Date(person.name).getDate()} {month[new Date(person.name).getMonth() + 1]} {new Date(person.name).getFullYear() + 543}
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
        <div className="flex md:flex-row flex-col max-w-[720px] md:space-x-4 md:space-y-0 space-y-3 mx-auto">
          <div className="space-y-3 md:w-1/2">
            {sliced[0].map(item => {
              return <div className="flex justify-between items-center bg-white py-4 px-4 rounded-md shadow-md space-x-2">
                <span className="cursor-pointer" onClick={() => {goToAttendanceZone(item)}}>ชมรม{clubMap[item]}</span>
                {checked.includes(item) ? <CheckIcon className="w-5 h-5 text-white p-[2px] bg-TUCMC-green-400 rounded-md flex-shrink-0"/> : <XIcon className="w-5 h-5 text-white p-[2px] bg-TUCMC-red-400 rounded-md flex-shrink-0"/>}
              </div>
            })}
          </div>
          <div className="space-y-3 md:w-1/2">
            {sliced[1].map(item => {
              return <div className="flex justify-between items-center bg-white py-4 px-4 rounded-md shadow-md space-x-2">
                <span className="cursor-pointer" onClick={() => {goToAttendanceZone(item)}}>ชมรม{clubMap[item]}</span>
                {checked.includes(item) ? <CheckIcon className="w-5 h-5 text-white p-[2px] bg-TUCMC-green-400 rounded-md flex-shrink-0"/> : <XIcon className="w-5 h-5 text-white p-[2px] bg-TUCMC-red-400 rounded-md flex-shrink-0"/>}
              </div>
            })}
            <div className="flex flex-col bg-white py-4 px-4 rounded-md shadow-md space-y-2">
              <h1 className="text-lg font-medium">Summary</h1>
              <div className="flex flex-col">
                <span>Submitted: <span className="text-TUCMC-gray-600">{checked.length}</span> from <span className="text-TUCMC-gray-600">{Object.keys(clubMap).length}</span></span>
                <span>Missing: <span className="text-TUCMC-gray-600">{Object.keys(clubMap).length - checked.length}</span></span>
              </div>
              <span>Date: <span className="text-TUCMC-gray-600">วันจันทร์ที่ {new Date(selected.name).getDate()} {month[new Date(selected.name).getMonth() + 1]} {new Date(selected.name).getFullYear() + 543}</span></span>
            </div>
          </div>
        </div>
      </div>
      :<div className="flex justify-center items-center min-h-screen px-4">
      <div className="shadow-md rounded-md px-6 py-4 max-w-[420px] space-y-2">
        <h1 className="text-lg font-medium">แจ้งการปรับเปลี่ยนระบบความปลอดภัย</h1>
        <p className="text-TUCMC-gray-700">เนื่องจากบัญชีนี้เป็นบัญชี่ที่สามารถใช้เข้าถึงฐานข้อมูลได้และเพื่อความปลอดภัยสูงสุดของฐานข้อมูล ทางระบบจำเป็นจะต้องให้ผู้ใช้บัญชีนี้เปิดโหมดความปลอดภัยสูงเพื่อป้องกันการถูกเข้าถึงบัญชีจากบุคคลที่ไม่ได้รับอนุญาติ</p>
        <div className="flex justify-center py-2">
          <Button href="/account" className="px-4 py-1 rounded-md border text-TUCMC-gray-700 border-TUCMC-gray-400 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white">
            ไปยังหน้าจัดการบัญชี
          </Button>
        </div>
      </div>
    </div>
      }
    </PageContainer>
  )
}

export default Report