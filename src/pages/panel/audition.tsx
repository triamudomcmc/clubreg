import PageContainer from "@components/common/PageContainer"
import { ArrowLeftIcon, CheckIcon, DocumentTextIcon, ExclamationIcon, SelectorIcon, UserGroupIcon } from "@heroicons/react/solid"
import { FilterSearch } from "@components/common/Inputs/Search"
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { PassedSection } from "@components/panel/sections/PassedSection"
import classnames from "classnames"
import { ReservedSection } from "@components/panel/sections/ReservedSection"
import { FailedSection } from "@components/panel/sections/FailedSection"
import { Button } from "@components/common/Inputs/Button"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { fetchClub, fetchMembers, submitPending } from "@client/fetcher/panel"
import { PendingElement } from "@components/panel/element/PendingElement"
import { isEmpty, objToArr, searchKeyword, sortAudition, sortNumber, sortThaiDictionary } from "@utilities/object"
import { Editor } from "@components/panel/element/Editor"
import { useToast } from "@components/common/Toast/ToastContext"
import { sliceArr } from "@utilities/array"
import { isNumber } from "util"
import { isNumeric } from "@utilities/texts"
import { useTimer } from "@utilities/timers"
import PendingSection from "@components/panel/sections/PendingSection"
import { CatLoader } from "@components/common/CatLoader"
import { AnimatePresence, motion } from "framer-motion"
import { WaitingScreen } from "@components/common/WaitingScreen"
import { announceTime, breakLowerBound, breakUpperBound, editDataTime } from "@config/time"
import { Listbox, Transition } from "@headlessui/react"
import classNames from "classnames"

const fetchMemberData = async (
  panelID: string,
  setMemberData: Dispatch<SetStateAction<{}>>,
  setReservedPos: Dispatch<SetStateAction<{}>>,
  setToast,
  reFetch,
  setInitMem,
  section,
  setAllMembers
) => {
  const data = await fetchMembers(panelID)
  const obj = {
    waiting: [],
    passed: [],
    failed: [],
    reserved: [],
  }
  const aobj = {
    waiting: [],
    passed: [],
    failed: [],
    reserved: [],
  }
  let reservedPos = {}

  if (data.status) {
    data.data.forEach((oitem) => {
      let item = oitem

      if ("position" in oitem) {
        item = { ...oitem, id: oitem.position }
        reservedPos[item.section] = {
          ...reservedPos[item.section],
          [item.dataRefID]: item.position
        }
      }

      if (section !== null && section && oitem.section !== section) {

        if (item.status === "confirmed" || item.status === "rejected") return aobj["passed"].push(item)

        aobj[item.status].push(item)
      }else{
        if (item.status === "confirmed" || item.status === "rejected") return obj["passed"].push(item)

        obj[item.status].push(item)
      }
    })

    console.log(obj)

    setMemberData(obj)
    setAllMembers(aobj)
    setReservedPos(reservedPos)
    setInitMem(true)
  } else {
    switch (data.report) {
      case "sessionError":
        setToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
          crossPage: true,
        })
        reFetch()
        break
      case "invalidPermission":
        setToast({
          theme: "modern",
          icon: "cross",
          title: "คุณไม่ได้รับอนุญาตในการกระทำนี้",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้งหรือ หากยังไม่สามารถแก้ไขได้ให้ติดต่อทาง กช.",
        })
        break
    }
  }
}

const fetchClubData = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>) => {
  const data = await fetchClub(clubID)
  setClubData(data)
}

const Audition = () => {
  const { onReady, reFetch } = useAuth()

  const { addToast } = useToast()

  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [section, setSection] = useState("passed")
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [allMemberData, setAllMemberData] = useState({
    waiting: [],
    passed: [],
    failed: [],
    reserved: [],
  })
  const [initmember, setInitMember] = useState(false)

  const [memberData, setMemberData] = useState({
    waiting: [],
    passed: [],
    failed: [],
    reserved: [],
  })

  const [page, setPage] = useState("panel")
  const [pendingUpdate, setPendingUpdate] = useState({})
  const [reservedPos, setReservedPos] = useState({})
  const [clubData, setClubData] = useState({ new_count: 0, new_count_limit: 0, call_count: 0, sections: null })
  const [clubSectionList, setClubSectionList] = useState([
    { id: 1, name: null }
  ])

  const [clubSection, setClubSection] = useState(clubSectionList[0])
  const [editing, setEditing] = useState({})
  const [editDep, setEditDep] = useState(false)
  const [pending, setPending] = useState(false)

  const upperBound = breakUpperBound,
    lowerBound = breakLowerBound

  const editable = true
  // const editable = !(new Date().getTime() > announceTime)

  const timer = useTimer(lowerBound)

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
      return userData
    }
    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/select")
      return userData
    }
    return userData
  })

  useEffect(() => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    fetchMemberData(currentID, setMemberData, setReservedPos, addToast, reFetch, setInitMember, clubSection.name, setAllMemberData)

    if (clubSection.name === null) return
    localStorage.setItem("selClubSec", JSON.stringify(clubSection))

  }, [clubSection.name])

  useEffect(() => {
    
    if (!clubData.sections || clubData.sections.length <= 0) return

    setClubSectionList(clubData.sections.map((e,k) => ({
      id: k +1,
      name: e
    })))


    const sectionData = JSON.parse(localStorage.getItem("selClubSec")|| "{}")
      if (sectionData.name !== null) {
        setClubSection(sectionData)
      }else{
        setClubSection(clubData.sections.map((e,k) => ({
          id: k +1,
          name: e
        }))[0])
      }

  },[ clubData.sections ])

  const refetch = () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]

    fetchMemberData(currentID, setMemberData, setReservedPos, addToast, reFetch, setInitMember, clubSection.name, setAllMemberData)
    fetchClubData(currentID, setClubData)
  }

  const applySort = () => {
    const data = section === "passed" ? memberData.passed : section === "failed" ? memberData.failed : []
    switch (sortMode) {
      case "ascending":
        {
          const sorted = sortThaiDictionary(data, (obj) => obj.firstname)
          setRawSorted(sorted)
        }
        break
      case "descending":
        {
          const sorted = sortThaiDictionary(data, (obj) => obj.firstname, true)
          setRawSorted(sorted)
        }
        break
      case "nascending":
        {
          const sorted = sortNumber(data, (obj) => obj.student_id)
          setRawSorted(sorted)
        }
        break
      case "ndescending":
        {
          const sorted = sortNumber(data, (obj) => obj.student_id, true)
          setRawSorted(sorted)
        }
        break
    }
  }

  useEffect(() => {
    applySort()
  }, [sortMode, memberData, section])

  useEffect(() => {
    if (userData && userData.panelID) {
      refetch()
    }
  }, [userData])

  const submitPendingSection = async () => {
    setPending(true)
    if (isEmpty(pendingUpdate)) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ไม่มีข้อมูลที่จะอัพเดท",
        text: "กรุณาเลือกสถานะให้ผู้สมัครก่อนกดส่งข้อมูล",
      })
      setPending(false)
      return
    }


    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const res = await submitPending(currentID, pendingUpdate)
    if (res.status) {
      refetch()
      addToast({
        theme: "modern",
        icon: "tick",
        title: "อัพเดทข้อมูลสำเร็จแล้ว",
        text: "ข้อมูลที่ถูกส่งไป ได้รับการอัพเดทบนฐานข้อมูลแล้ว",
      })
    } else {
      switch (res.report) {
        case "sessionError":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "พบข้อผิดพลาดของเซสชั่น",
            text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
            crossPage: true,
          })
          reFetch()
          break
        case "invalidPermission":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "คุณไม่ได้รับอนุญาตในการกระทำนี้",
            text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้งหรือ หากยังไม่สามารถแก้ไขได้ให้ติดต่อทาง กช.",
          })
          break
        case "quota_exceeded":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "จำนวนผู้ที่ผ่านการคัดเลือกจะต้องไม่เกินจำนวนที่ได้ขอมา",
            text: "กรุณาทำให้มีที่ว่างในช่องผู้ผ่านการคัดเลือกก่อน จึงนำสมาชิกคนใหม่ใส่เข้าไป",
          })
          break
        case "invalid_data":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่มีข้อมูลที่จะอัพเดท",
            text: "กรุณาเลือกสถานะให้ผู้สมัครก่อนกดส่งข้อมูล",
          })
          break
      }
    }
    setPending(false)
  }

  const edit = (data) => {
    setEditing(data)
    setEditDep(true)
  }

  useEffect(() => {
    const escaped = searchContext.replace(/ /g, "")
    if (escaped !== "") {
      let searchResult

      if (isNumeric(escaped)) {
        searchResult = searchKeyword(rawSorted, escaped, (obj) => obj.student_id)
      } else {
        searchResult = searchKeyword(rawSorted, escaped, (obj) => obj.firstname + obj.lastname)
      }

      setSortedData(searchResult)
    } else {
      setSortedData(rawSorted)
    }
  }, [searchContext, rawSorted])

  let heading = <h1 className="text-4xl tracking-tight">ผลการ Audition</h1>,
    description = (
      <div className="mt-6 mb-8 text-center tracking-tight">
        <p>สรุปผลการ Audition ให้เสร็จสิ้น </p>
        <p>ภายในวันที่ 14 มิ.ย. เวลา 23.59 น. </p>
        <p>
          (เหลืออีก {timer.day} วัน {timer.hour} ชั่วโมง {timer.min} นาที)
        </p>
      </div>
    ),
    button = (
      <div
        onClick={() => {
          setPage("pending")
        }}
        className="flex cursor-pointer items-center space-x-1 rounded-full bg-TUCMC-pink-400 px-14 py-3.5 text-white shadow-md"
      >
        <DocumentTextIcon className="h-5 w-5" />
        <span>รอการตอบรับ</span>
      </div>
    )

  if (!editable) {
    heading = (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">ประกาศผลการ Audition</h1>
        <h1 className="text-lg">รอการตอบรับจากนักเรียน</h1>
      </div>
    )

    description = (
      <div className="mt-6 mb-8 text-center">
        <p>ระบบได้ประกาศผลให้ตามรายชื่อที่เลือกไว้แล้ว</p>
        <p>หากนักเรียนไม่เลือกยืนยันสิทธิ์หรือสละสิทธิ์ภายในวันน</p>
        <p>ระบบจะสละสิทธิ์ให้อัตโนมัติ</p>
      </div>
    )

    button = (
      <div className="flex items-center space-x-4 rounded-md border border-TUCMC-gray-600 border-opacity-90 px-6 py-4">
        <UserGroupIcon className="h-9 w-9" />
        <div>
          <p>สามารถรับสมาชิกใหม่ได้ทั้งหมด {clubData.new_count_limit} คน</p>
          <p>
            (ยืนยันสิทธิ์แล้ว {clubData.new_count} คน เหลืออีก {clubData.new_count_limit - clubData.new_count} คน)
          </p>
        </div>
      </div>
    )
  }

  return new Date().getTime() > upperBound || new Date().getTime() < lowerBound ? (
    <PageContainer hide={!initmember}>
      <Editor
        userData={editing}
        reservedPos={reservedPos[clubSection.name]}
        setReservedPos={setReservedPos}
        refetch={refetch}
        TriggerDep={{
          dep: editDep,
          revert: () => {
            setEditDep(false)
          },
        }}
        section={clubSection.name}
        clubSectionList={clubSectionList}
        initClubSection={clubSection}
      />
      <AnimatePresence>
        {initmember ? (
          <>
            <div
              className={classnames("mx-auto min-h-screen max-w-6xl px-2 py-10", page === "panel" ? "block" : "hidden")}
            >
              <div
                className={`rounded-r-lg border-l-4 border-TUCMC-red-600 bg-TUCMC-red-100 px-4 py-4 text-TUCMC-red-600`}
              >
                <div className="flex space-x-3">
                  <ExclamationIcon className="h-6 w-6 flex-shrink-0 text-TUCMC-red-600" />
                  <div>
                    <p className="text-[15px]">
                      การประกาศผล Audition ก่อนชมรมอื่น และการกดดันให้นักเรียนเลือกยืนยันสิทธิ์ชมรม ถือเป็นการละเมิด
                      <a
                        href="https://tucm.cc/ข้อกำหนด"
                        target="_blank"
                        className="cursor-pointer whitespace-nowrap underline"
                      >
                        ข้อกำหนด
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-10 flex flex-col items-center text-TUCMC-gray-700">
                {heading}
                {description}
                {button}
              </div>
              <div className="mt-14 flex flex-col px-3">
              <div className="flex justify-left mb-6 px-2">
                  <div className="flex items-center space-x-3">
                    <h1>ส่วนที่กำลังแก้ไข : </h1>
                    <div className="">
            <Listbox value={clubSection} onChange={setClubSection}>
              {({ open }) => (
                <>
                  <div className="relative mt-1 z-20">
                    <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 text-left text-lg shadow-sm focus:border-TUCMC-pink-500 focus:ring-1 focus:ring-TUCMC-pink-500">
                      <span className="block truncate">{clubSection?.name}</span>
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
                        {clubSectionList.map((person) => (
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
                  </div>
                </div>
                <div className="flex w-full px-3 font-medium text-TUCMC-gray-400">
                  <div
                    onClick={() => {
                      setSection("passed")
                    }}
                    className={classnames(
                      "w-1/3 cursor-pointer border-b border-TUCMC-gray-400 py-2 text-center",
                      section === "passed" && "border-TUCMC-green-500 bg-TUCMC-green-100 text-TUCMC-green-500"
                    )}
                  >
                    ผ่าน
                  </div>
                  <div
                    onClick={() => {
                      setSection("reserved")
                    }}
                    className={classnames(
                      "w-1/3 cursor-pointer border-b border-TUCMC-gray-400 py-2 text-center",
                      section === "reserved" && "border-TUCMC-orange-500 bg-TUCMC-orange-100 text-TUCMC-orange-500"
                    )}
                  >
                    สำรอง
                  </div>
                  <div
                    onClick={() => {
                      setSection("failed")
                    }}
                    className={classnames(
                      "w-1/3 cursor-pointer border-b border-TUCMC-gray-400 py-2 text-center",
                      section === "failed" && "border-TUCMC-red-500 bg-TUCMC-red-100 text-TUCMC-red-500"
                    )}
                  >
                    ไม่ผ่าน
                  </div>
                </div>
                {section !== "reserved" && (
                  <div className="mt-8 mb-4">
                    <FilterSearch
                      sortMode={sortMode}
                      setSortMode={setSortMode}
                      setSearchContext={setSearchContext}
                      normal={false}
                    />
                  </div>
                )}
                <PassedSection
                  display={section === "passed"}
                  editFunc={edit}
                  userData={section === "passed" ? sortedData : []}
                  editable={editable}
                />
                <ReservedSection
                  refetch={refetch}
                  userData={memberData.reserved}
                  display={section === "reserved"}
                  editable={editable}
                  editFunc={edit}
                  callCount={clubData.call_count}
                />
                <FailedSection
                  userData={section === "failed" ? sortedData : []}
                  display={section === "failed"}
                  editable={editable}
                  editFunc={edit}
                />
              </div>
            </div>
            <div
              className={classnames(
                "flex min-h-screen w-full flex-col items-center space-y-10 py-10 px-4",
                page === "pending" ? "block" : "hidden"
              )}
            >
              <PendingSection
                setPage={setPage}
                setReservedPos={setReservedPos}
                setPendingUpdate={setPendingUpdate}
                submitPendingSection={submitPendingSection}
                reservedPos={reservedPos}
                clubData={clubData}
                memberData={allMemberData}
                pendingUpdate={pendingUpdate}
                pending={pending}
              />
            </div>
          </>
        ) : (
          <CatLoader key="cat" />
        )}
      </AnimatePresence>
    </PageContainer>
  ) : (
    <WaitingScreen target={upperBound} />
  )
}

export default Audition
