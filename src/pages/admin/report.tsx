import PageContainer from "@components/common/PageContainer"
import { clubMap } from "@config/clubMap"
import React, { Fragment, useEffect, useState } from "react"
import { getReport } from "@client/admin/query"
import { CheckIcon, ClockIcon, PaperClipIcon, SelectorIcon, XIcon } from "@heroicons/react/solid"
import { sliceArrN } from "@utilities/array"
import Router from "next/router"
import { getRecentMondays } from "@config/time"
import { Listbox, Transition } from "@headlessui/react"
import { useAuth } from "@client/auth"
import { Button } from "@components/common/Inputs/Button"
import { createTempAccUrlBridge } from "@init/dashboard"
import { useToast } from "@components/common/Toast/ToastContext"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { convertMiliseconds } from "@utilities/timers"
import { useUserCred } from "handlers/hooks/useUserCred"

const people = getRecentMondays().map((item, index) => ({ id: index + 1, name: item }))

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const fetchReport = async (setChecked, ts, reFetch) => {
  const res = await getReport(ts)
  if (res.status) {
    setChecked(res.data)
  } else {
    reFetch()
  }
}

const Report = () => {
  const { onReady, reFetch } = useAuth()
  const { addToast } = useToast()
  const { userCred } = useUserCred()

  const [checked, setChecked] = useState({})
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
    12: "ธันวาคม",
  }

  const copy = (url: string) => {
    const ta = document.createElement("textarea")
    ta.innerText = url
    document.body.appendChild(ta)
    ta.select()
    document.execCommand("copy")
    ta.remove()
  }

  const generateUrl = async (clubId: string) => {
    if (checked[clubId].id) {
      copy(
        `https://register.clubs.triamudom.ac.th/panel/attendance?access=${checked[clubId].id}&route=${clubId}&targetTime=${checked[clubId].targetTime}&expire=${checked[clubId].expire}`
      )
      const timeLeft = convertMiliseconds(checked[clubId].expire - new Date().getTime())
      addToast({
        theme: "modern",
        icon: "tick",
        title: "บันทึกลิงก์ลงคลิปบอร์ดแล้ว",
        text: `ลิงก์นี้เหลืออายุอีก ${timeLeft.h} ชั่วโมง ${timeLeft.m} นาที`,
        crossPage: true,
      })
      return
    }

    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get()

    const response = await createTempAccUrlBridge.call({
      timestamp: selected.name,
      club: clubId,
      fp: fingerPrint.visitorId,
    })

    if (response.status) {
      copy(response.data.accessUrl)
      addToast({
        theme: "modern",
        icon: "tick",
        title: "บันทึกลิงก์ลงคลิปบอร์ดแล้ว",
        text: "คุณได้สร้างลิงก์สำหรับเข้าถึงหน้าเช็กชื่อสำเร็จแล้ว ลิงก์จะมีอายุ 2 ชั่วโมง",
        crossPage: true,
      })
      fetchReport(setChecked, selected, reFetch)
    }
  }

  return (
    <PageContainer>
      {userCred.safeMode ? (
        <div className="mx-auto max-w-[420px] py-12 px-4 md:max-w-[720px]">
          <h1 className="mb-14 text-center text-xl font-medium">Report Summary</h1>
          <div className="mb-10 w-full">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-gray-700">ช่วงวันที่ต้องการตรวจสอบ</Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-lg shadow-sm focus:border-TUCMC-pink-500 focus:ring-1 focus:ring-TUCMC-pink-500">
                      <span className="block truncate">
                        วันจันทร์ที่ {new Date(selected.name).getDate()} {month[new Date(selected.name).getMonth() + 1]}{" "}
                        {new Date(selected.name).getFullYear() + 543}
                      </span>
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
                                  วันจันทร์ที่ {new Date(person.name).getDate()}{" "}
                                  {month[new Date(person.name).getMonth() + 1]}{" "}
                                  {new Date(person.name).getFullYear() + 543}
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
          <div className="mx-auto flex max-w-[720px] flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0">
            <div className="space-y-3 md:w-1/2">
              {sliced[0].map((item) => {
                return (
                  <div className="flex items-center justify-between space-x-2 rounded-md bg-white py-4 px-4 shadow-md">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        goToAttendanceZone(item)
                      }}
                    >
                      ชมรม{clubMap[item]}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div
                        onClick={() => {
                          generateUrl(item)
                        }}
                        className="cursor-pointer"
                      >
                        {checked[item]?.expire ? (
                          <ClockIcon className="h-[22px] w-[22px] text-yellow-500" />
                        ) : (
                          <PaperClipIcon className="h-5 w-5 text-TUCMC-gray-600" />
                        )}
                      </div>
                      {checked[item]?.checked ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 rounded-md bg-TUCMC-green-400 p-[2px] text-white" />
                      ) : (
                        <XIcon className="h-5 w-5 flex-shrink-0 rounded-md bg-TUCMC-red-400 p-[2px] text-white" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="space-y-3 md:w-1/2">
              {sliced[1].map((item) => {
                return (
                  <div className="flex items-center justify-between space-x-2 rounded-md bg-white py-4 px-4 shadow-md">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        goToAttendanceZone(item)
                      }}
                    >
                      ชมรม{clubMap[item]}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div
                        onClick={() => {
                          generateUrl(item)
                        }}
                        className="cursor-pointer"
                      >
                        {checked[item]?.expire ? (
                          <ClockIcon className="h-[22px] w-[22px] text-yellow-500" />
                        ) : (
                          <PaperClipIcon className="h-5 w-5 text-TUCMC-gray-600" />
                        )}
                      </div>
                      {checked[item]?.checked ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 rounded-md bg-TUCMC-green-400 p-[2px] text-white" />
                      ) : (
                        <XIcon className="h-5 w-5 flex-shrink-0 rounded-md bg-TUCMC-red-400 p-[2px] text-white" />
                      )}
                    </div>
                  </div>
                )
              })}
              <div className="flex flex-col space-y-2 rounded-md bg-white py-4 px-4 shadow-md">
                <h1 className="text-lg font-medium">Summary</h1>
                <div className="flex flex-col">
                  <span>
                    Submitted:{" "}
                    <span className="text-TUCMC-gray-600">
                      {Object.values(checked).filter((val: { checked: boolean }) => val.checked).length}
                    </span>{" "}
                    from <span className="text-TUCMC-gray-600">{Object.keys(clubMap).length}</span>
                  </span>
                  <span>
                    Missing:{" "}
                    <span className="text-TUCMC-gray-600">
                      {Object.keys(clubMap).length -
                        Object.values(checked).filter((val: { checked: boolean }) => val.checked).length}
                    </span>
                  </span>
                </div>
                <span>
                  Date:{" "}
                  <span className="text-TUCMC-gray-600">
                    วันจันทร์ที่ {new Date(selected.name).getDate()} {month[new Date(selected.name).getMonth() + 1]}{" "}
                    {new Date(selected.name).getFullYear() + 543}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-[420px] space-y-2 rounded-md px-6 py-4 shadow-md">
            <h1 className="text-lg font-medium">แจ้งการปรับเปลี่ยนระบบความปลอดภัย</h1>
            <p className="text-TUCMC-gray-700">
              เนื่องจากบัญชีนี้เป็นบัญชี่ที่สามารถใช้เข้าถึงฐานข้อมูลได้และเพื่อความปลอดภัยสูงสุดของฐานข้อมูล
              ทางระบบจำเป็นจะต้องให้ผู้ใช้บัญชีนี้เปิดโหมดความปลอดภัยสูงเพื่อป้องกันการถูกเข้าถึงบัญชีจากบุคคลที่ไม่ได้รับอนุญาติ
            </p>
            <div className="flex justify-center py-2">
              <Button
                href="/account"
                className="rounded-md border border-TUCMC-gray-400 px-4 py-1 text-TUCMC-gray-700 hover:border-yellow-400 hover:bg-yellow-400 hover:text-white"
              >
                ไปยังหน้าจัดการบัญชี
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}

export default Report
