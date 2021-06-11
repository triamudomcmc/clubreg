import PageContainer from "@components/common/PageContainer";
import {ArrowLeftIcon, DocumentTextIcon, ExclamationIcon, UserGroupIcon} from "@heroicons/react/solid";
import {FilterSearch} from "@components/common/Inputs/Search";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PassedSection} from "@components/panel/sections/PassedSection";
import classnames from "classnames"
import {ReservedSection} from "@components/panel/sections/ReservedSection";
import {FailedSection} from "@components/panel/sections/FailedSection";
import {Button} from "@components/common/Inputs/Button";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {fetchClub, fetchMembers, submitPending} from "@client/fetcher/panel";
import {PendingElement} from "@components/panel/element/PendingElement";
import {isEmpty, objToArr, searchKeyword, sortAudition, sortNumber, sortThaiDictionary} from "@utilities/object";
import {Editor} from "@components/panel/element/Editor";
import {useToast} from "@components/common/Toast/ToastContext";
import {sliceArr} from "@utilities/array";
import {isNumber} from "util";
import {isNumeric} from "@utilities/texts";
import {useTimer} from "@utilities/timers";
import PendingSection from "@components/panel/sections/PendingSection";
import {CatLoader} from "@components/common/CatLoader";
import {motion} from "framer-motion";

const fetchMemberData = async (panelID: string, setMemberData: Dispatch<SetStateAction<{}>>, setReservedPos: Dispatch<SetStateAction<{}>>, setToast, reFetch, setInitMem) => {
  const data = await fetchMembers(panelID)
  const obj = {
    waiting: [],
    passed: [],
    failed: [],
    reserved: []
  }
  let reservedPos = {}

  if (data.status) {

    data.data.forEach(oitem => {
      let item = oitem
      if ("position" in oitem) {
        item = {...oitem, id: oitem.position}
        reservedPos[item.dataRefID] = (item.position)
      }
      if (item.status === "confirmed" || item.status === "rejected") return obj["passed"].push(item)

      obj[item.status].push(item)
    })

    setMemberData(obj)
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
          crossPage: true
        })
        reFetch()
        break
      case "invalidPermission":
        setToast({
          theme: "modern",
          icon: "cross",
          title: "คุณไม่ได้รับอนุญาตในการกระทำนี้",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้งหรือ หากยังไม่สามารถแก้ไขได้ให้ติดต่อทาง กช."
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

  const {onReady, reFetch} = useAuth()

  const {addToast} = useToast()

  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [section, setSection] = useState("passed")
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [initmember, setInitMember] = useState(false)

  const [memberData, setMemberData] = useState({
    waiting: [],
    passed: [],
    failed: [],
    reserved: []
  })
  const [page, setPage] = useState("panel")
  const [pendingUpdate, setPendingUpdate] = useState({})
  const [reservedPos, setReservedPos] = useState({})
  const [clubData, setClubData] = useState({new_count: 0, new_count_limit: 0, call_count: 0})
  const [editing, setEditing] = useState({})
  const [editDep, setEditDep] = useState(false)

  const editable = true

  const timer = useTimer(1623689940000)

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth");
      return userData
    }
    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/select");
      return userData
    }
    return userData
  })

  const refetch = () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]

    fetchMemberData(currentID, setMemberData, setReservedPos, addToast, reFetch, setInitMember)
    fetchClubData(currentID, setClubData)
  }

  const applySort = () => {
    const data = section === "passed" ? memberData.passed : section === "failed" ? memberData.failed : []
    switch (sortMode) {
      case "ascending": {
        const sorted = sortThaiDictionary(data, obj => (obj.firstname))
        setRawSorted(sorted)
      }
        break
      case "descending": {
        const sorted = sortThaiDictionary(data, obj => (obj.firstname), true)
        setRawSorted(sorted)
      }
        break
      case "nascending": {
        const sorted = sortNumber(data, obj => (obj.student_id))
        setRawSorted(sorted)
      }
        break
      case "ndescending": {
        const sorted = sortNumber(data, obj => (obj.student_id), true)
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
    if (isEmpty(pendingUpdate)) return
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const res = await submitPending(currentID, pendingUpdate)
    if (res.status) {
      refetch()
    } else {
      switch (res.report) {
        case "sessionError":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "พบข้อผิดพลาดของเซสชั่น",
            text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
            crossPage: true
          })
          reFetch()
          break
        case "invalidPermission":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "คุณไม่ได้รับอนุญาตในการกระทำนี้",
            text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้งหรือ หากยังไม่สามารถแก้ไขได้ให้ติดต่อทาง กช."
          })
          break
      }
    }
  }

  const edit = (data) => {
    setEditing(data)
    setEditDep(true)
  }

  useEffect(() => {
    const escaped = searchContext.replace(/ /g, "")
    if (escaped !== "") {
      let searchResult;

      if (isNumeric(escaped)) {
        searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.student_id))
      } else {
        searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.firstname + obj.lastname))
      }

      setSortedData(searchResult)
    } else {
      setSortedData(rawSorted)
    }
  }, [searchContext, rawSorted])

  let heading = <h1 className="text-4xl tracking-tight">ผลการ Audition</h1>,
    description = <div className="tracking-tight text-center mt-6 mb-8">
      <p>สรุปผลการ Audition ให้เสร็จสิ้น </p>
      <p>ภายในวันที่ 14 มิ.ย. เวลา 23.59 น. </p>
      <p>(เหลืออีก {timer.day} วัน {timer.hour} ชั่วโมง {timer.min} นาที)</p>
    </div>,
    button = <div onClick={() => {
      setPage("pending")
    }} className="flex items-center space-x-1 bg-TUCMC-pink-400 cursor-pointer text-white shadow-md px-14 py-3.5 rounded-full">
      <DocumentTextIcon className="w-5 h-5"/>
      <span>รอการตอบรับ</span>
    </div>

  if (!editable) {
    heading = <div className="flex flex-col items-center">
      <h1 className="text-2xl">ประกาศผลการ Audition</h1>
      <h1 className="text-lg">รอการตอบรับจากนักเรียน</h1>
    </div>

    description = <div className="text-center mt-6 mb-8">
      <p>ระบบได้ประกาศผลให้ตามรายชื่อที่เลือกไว้แล้ว</p>
      <p>หากนักเรียนไม่เลือกยืนยันสิทธิ์หรือสละสิทธิ์ภายในวันน</p>
      <p>ระบบจะสละสิทธิ์ให้อัตโนมัติ</p>
    </div>

    button = <div className="flex border border-TUCMC-gray-600 border-opacity-90 space-x-4 rounded-md px-6 py-4 items-center">
      <UserGroupIcon className="w-9 h-9"/>
      <div>
        <p>
          สามารถรับสมาชิกใหม่ได้ทั้งหมด {clubData.new_count_limit} คน
        </p>
        <p>
          (ยืนยันสิทธิ์แล้ว {clubData.new_count} คน เหลืออีก {clubData.new_count_limit - clubData.new_count} คน)
        </p>
      </div>
    </div>
  }

  return (
    <PageContainer hide={!initmember}>
      <Editor userData={editing} reservedPos={reservedPos} setReservedPos={setReservedPos} refetch={refetch} TriggerDep={{
        dep: editDep, revert: () => {
          setEditDep(false)
        }
      }}/>
      {initmember ? <>
        <div className={classnames("px-2 py-10 mx-auto max-w-6xl min-h-screen", page === "panel" ? "block" : "hidden")}>
          <div
            className={`bg-TUCMC-red-100 border-l-4 border-TUCMC-red-600 rounded-r-lg text-TUCMC-red-600 px-4 py-4`}>
            <div className="flex space-x-3">
              <ExclamationIcon className="flex-shrink-0 w-6 h-6 text-TUCMC-red-600"/>
              <div>
                <p className="text-[15px]">การประกาศผล Audition ก่อนชมรมอื่น
                                           และการกดดันให้นักเรียนเลือกยืนยันสิทธิ์ชมรม ถือเป็นการละเมิด<a
                    href="https://tucm.cc/ข้อกำหนด" target="_blank"
                    className="underline whitespace-nowrap cursor-pointer">ข้อกำหนด</a></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-TUCMC-gray-700 my-10">
            {heading}
            {description}
            {button}
          </div>
          <div className="flex flex-col px-3 mt-14">
            <div className="flex w-full text-TUCMC-gray-400 font-medium px-3">
              <div onClick={() => {
                setSection("passed")
              }}
                   className={classnames("border-b w-1/3 py-2 border-TUCMC-gray-400 cursor-pointer text-center", section === "passed" && "bg-TUCMC-green-100 text-TUCMC-green-500 border-TUCMC-green-500")}>ผ่าน
              </div>
              <div onClick={() => {
                setSection("reserved")
              }}
                   className={classnames("border-b w-1/3 py-2 border-TUCMC-gray-400 cursor-pointer text-center", section === "reserved" && "bg-TUCMC-orange-100 text-TUCMC-orange-500 border-TUCMC-orange-500")}>สำรอง
              </div>
              <div onClick={() => {
                setSection("failed")
              }}
                   className={classnames("border-b w-1/3 py-2 border-TUCMC-gray-400 cursor-pointer text-center", section === "failed" && "bg-TUCMC-red-100 text-TUCMC-red-500 border-TUCMC-red-500")}>ไม่ผ่าน
              </div>
            </div>
            {section !== "reserved" && <div className="mt-8 mb-4">
                <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext} normal={false}/>
            </div>}
            <PassedSection display={section === "passed"} editFunc={edit}
                           userData={section === "passed" ? sortedData : []} editable={editable}/>
            <ReservedSection refetch={refetch} userData={memberData.reserved} display={section === "reserved"} editable={editable}
                             editFunc={edit} callCount={clubData.call_count}/>
            <FailedSection userData={section === "failed" ? sortedData : []} display={section === "failed"} editable={editable}
                           editFunc={edit}/>
          </div>
        </div>
        <div
          className={classnames("flex flex-col items-center py-10 px-4 space-y-10 min-h-screen w-full", page === "pending" ? "block" : "hidden")}>
          <PendingSection setPage={setPage} setReservedPos={setReservedPos} setPendingUpdate={setPendingUpdate}
                          submitPendingSection={submitPendingSection} reservedPos={reservedPos} clubData={clubData}
                          memberData={memberData} pendingUpdate={pendingUpdate}/>
        </div>
      </>: <motion.div key="cat" exit={{scale: 0.5, opacity: 0}} transition={{type: "tween", duration: 0.15}}>
        <CatLoader/>
      </motion.div>}
    </PageContainer>
  )
}

export default Audition