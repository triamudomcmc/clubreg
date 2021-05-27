import PageContainer from "@components/common/PageContainer";
import {motion} from "framer-motion";
import {ArrowLeftIcon, DocumentTextIcon, ExclamationIcon} from "@heroicons/react/solid";
import {FilterSearch} from "@components/common/Inputs/Search";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PassedSection} from "@components/panel/sections/PassedSection";
import classnames from "classnames"
import {ReservedSection} from "@components/panel/sections/ReservedSection";
import {FailedSection} from "@components/panel/sections/FailedSection";
import Link from "next/link"
import {Button} from "@components/common/Inputs/Button";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {fetchClub, fetchMembers, submitPending} from "@client/fetcher/panel";
import {PendingElement} from "@components/panel/element/PendingElement";
import {isEmpty} from "@utilities/object";
import {fetchAClub} from "@client/fetcher/club";
import {Editor} from "@components/panel/element/Editor";
import Toast from "@components/common/Toast";
import {useToast} from "@components/common/Toast/ToastContext";

const fetchMemberData = async (panelID: string, setMemberData: Dispatch<SetStateAction<{}>>, setReservedPos: Dispatch<SetStateAction<{}>>, setToast, reFetch) => {
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
      if (item.status === "rejected" || item.status === "confirmed") return obj["passed"].push(item)
      obj[item.status].push(item)
    })
    setMemberData(obj)
    setReservedPos(reservedPos)
  }else{
    switch (data.report) {
      case "sessionError":
        setToast({
          theme:"modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
          crossPage: true
        })
        reFetch()
        break
      case "invalidPermission":
        setToast({
          theme:"modern",
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

const Index = () => {

  const {onReady, reFetch} = useAuth()

  const {addToast} = useToast()

  const [sortMode, setSortMode] = useState("")
  const [searchContext, setSearchContext] = useState("")
  const [isDrag, setIsDrag] = useState(false)

  const [section, setSection] = useState("passed")
  const [memberData, setMemberData] = useState({
    waiting: [],
    passed: [],
    failed: [],
    reserved: []
  })
  const [page, setPage] = useState("panel")
  const [pendingUpdate, setPendingUpdate] = useState({})
  const [reservedPos, setReservedPos] = useState({})
  const [clubData, setClubData] = useState({new_count: 0, new_count_limit: 0})
  const [editing, setEditing] = useState({})
  const [editDep, setEditDep] = useState(false)

  const editable = true

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth");
      return userData
    }
    if (!("panelID" in userData) || userData.panelID === "") {
      Router.push("/select");
      return userData
    }
    return userData
  })

  const refetch = () => {
    fetchMemberData(userData.panelID, setMemberData, setReservedPos, addToast, reFetch)
    fetchClubData(userData.panelID, setClubData)
  }

  useEffect(() => {
    if (userData && userData.panelID) {
      refetch()
    }
  }, [userData])

  const submitPendingSection = async () => {
    if (isEmpty(pendingUpdate)) return
    const res = await submitPending(userData.panelID, pendingUpdate)
    if (res.status) {
      refetch()
    }else{
      switch (res.report) {
        case "sessionError":
          addToast({
            theme:"modern",
            icon: "cross",
            title: "พบข้อผิดพลาดของเซสชั่น",
            text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
            crossPage: true
          })
          reFetch()
          break
        case "invalidPermission":
          addToast({
            theme:"modern",
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

  return (
    <PageContainer>
      <Editor userData={editing} reservedPos={reservedPos} setReservedPos={setReservedPos} refetch={refetch} TriggerDep={{dep: editDep, revert: () => {setEditDep(false)}}}/>
      <div className={classnames("px-2 py-10 mx-auto max-w-6xl min-h-screen", page === "panel" ? "block" : "hidden")}>
        <div
          className={`bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg text-yellow-800 px-4 py-4`}>
          <div className="flex space-x-3">
            <ExclamationIcon className="flex-shrink-0 w-6 h-6 text-yellow-400"/>
            <div>
              <p className="text-[15px]">การประกาศผล Audition ก่อนชมรมอื่น
                                         และการกดดันให้นักเรียนเลือกยืนยันสิทธิ์ชมรม ถือเป็นการละเมิด<span
                  className="underline whitespace-nowrap cursor-pointer">ข้อกำหนด</span></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-TUCMC-gray-700 my-10">
          <h1 className="text-4xl tracking-tight">ผลการ Audition</h1>
          <div className="tracking-tight text-center mt-6 mb-8">
            <p>สรุปผลการ Audition ให้เสร็จสิ้น </p>
            <p>ภายในวันที่ 24 พ.ค. 64 เวลา 23.59 น. </p>
            <p>(เหลืออีก 12 ชั่วโมง 27 นาที)</p>
          </div>
          <div onClick={() => {
            setPage("pending")
          }} className="flex items-center space-x-1 bg-TUCMC-pink-400 cursor-pointer text-white shadow-md px-14 py-3.5 rounded-full">
            <DocumentTextIcon className="w-5 h-5"/>
            <span>รอการตอบรับ</span>
          </div>
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
          <div className="mt-8 mb-4">
            <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
          </div>
          <PassedSection display={section === "passed"} editFunc={edit}
                         userData={memberData.passed} editable={editable}/>
          <ReservedSection refetch={refetch} userData={memberData.reserved} display={section === "reserved"} editable={editable} editFunc={edit} setIsDrag={setIsDrag}/>
          <FailedSection userData={memberData.failed} display={section === "failed"} editable={editable} editFunc={edit}/>
        </div>
      </div>
      <div className={classnames("flex flex-col items-center py-10 px-4 space-y-10 min-h-screen w-full", page === "pending" ? "block" : "hidden", isDrag && "select-none")}>
        <div className="space-y-2">
          <h1 className="text-4xl text-center">รอการตอบรับ</h1>
          <p className="text-TUCMC-gray-700 text-center">สามารถรับสมาชิกใหม่ได้ทั้งหมด {clubData.new_count_limit} คน (เหลืออีก {clubData.new_count_limit - clubData.new_count} คน)</p>
        </div>
        <div className="w-full max-w-6xl">
          <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
          <div className="mt-4 space-y-4">
            {
              !isEmpty(memberData) && !isEmpty(memberData.waiting) ? memberData.waiting.map((item, index) => {
                return <PendingElement key={`pending-${index}`} userData={item} pendingUpdate={pendingUpdate}
                                       setPendingUpdate={setPendingUpdate} reservedPos={reservedPos} setReservedPos={setReservedPos}/>
              }) : <h1 className="text-center mt-20 mb-20 text-TUCMC-gray-600">ขณะนี้ไม่มีรายชื่อที่รอคำตอบรับ</h1>
            }
          </div>
          <div className="flex items-center justify-between mt-10">
            <div onClick={() => {
              setPage("panel");
              setPendingUpdate({})
            }} className="flex cursor-pointer items-center space-x-1">
              <ArrowLeftIcon className="w-4 h-4"/>
              <h1>ย้อนกลับ</h1>
            </div>
            <Button onClick={submitPendingSection} className="bg-TUCMC-pink-400 px-10 py-3 text-white rounded-full">
              <span>ยืนยัน</span>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Index