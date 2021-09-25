import React, {useEffect, useRef, useState} from "react";
import {getAllAttendanceData, getEvaluationData, submitEval} from "@init/evaluate";
import PageContainer from "@components/common/PageContainer";
import {useAuth} from "@client/auth";
import {fetchMembers} from "@client/fetcher/panel";
import Router from "next/router";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {CheckIcon, ChevronDownIcon, ChevronUpIcon, EyeIcon, EyeOffIcon, MinusSmIcon, XIcon} from "@heroicons/react/solid";
import {EvalCheck} from "@components/panel/element/EvalCheck";
import {Button} from "@components/common/Inputs/Button";
import classnames from "classnames";
import {Ellipsis} from "@vectors/Loaders/Ellipsis";
import {useToast} from "@components/common/Toast/ToastContext";
import {clubMap} from "@config/clubMap";
import Modal from "@components/common/Modals";
import {useWindowDimensions} from "@utilities/document";
import {Loader} from "@components/common/Loader";

const Evaluate = () => {

  const {onReady, reFetch} = useAuth()

  const [checks, setChecks] = useState([])
  const [member, setMembers] = useState([])
  const [pendingUpdate, setPendingUpdate] = useState({})
  const [accept, setAccept] = useState(false)
  const [pending, setPending] = useState(false)
  const [pinned, setPinned] = useState(false)
  const box = useRef(null)
  const clubsTrigger = useRef(null)
  const [closeBox, setCloseBox] = useState(false)
  const [loading, setLoading] = useState(true)
  const [boxSize, setBoxSize] = useState(0)
  const [adArr, setAdArr] = useState([])
  const {width} = useWindowDimensions()

  const {addToast} = useToast()


  const month = {
    1: "ม.ค.",
    2: "ก.พ.",
    3: "มี.ค.",
    4: "เม.ย",
    5: "พ.ค.",
    6: "มิ.ย.",
    7: "ก.ค.",
    8: "ส.ค",
    9: "ก.ย",
    10: "ต.ค",
    11: "พ.ย.",
    12: "ธ.ค"
  }

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")

    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/account");
    }

    return userData
  })

  useEffect(() => {
    if (box.current) {
      setBoxSize(box.current?.clientWidth)
    }
  }, [box, width])

  useEffect(() => {
    if ("panelID" in userData) {
      const i = [...userData.panelID]
      const index = userData.panelID.indexOf(localStorage.getItem("currentPanel"))
      if (index > -1) {
        i.splice(index, 1)
      }
      setAdArr(i)
    }
  }, [userData])

  const setCurrentPanel = (id) => {
    localStorage.setItem("currentPanel", id)
    Router.reload()
    setCloseBox(true)
  }

  const submitEvalData = async () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    setPending(true)

    if (!accept) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "กรุณากดยืนยันว่าข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้ว",
        text: "กรุณากดยืนยันว่าข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้วทุกครั้งก่อนส่งข้อมูล"
      })
      setPending(false)
      return
    }

    if (Object.keys(pendingUpdate).length < member.length) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ข้อมูลที่จะอัพเดทไม่ถูกต้อง",
        text: "กรุณาเลือกสถานะให้สมาชิกทั้งหมดก่อนกดส่งข้อมูล"
      })
      setPending(false)
      return
    }

    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();
    const res = await submitEval.call({panelID: currentID, fp: fingerPrint.visitorId, data: pendingUpdate})
    if (res.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "อัพเดทข้อมูลสำเร็จแล้ว",
        text: "ข้อมูลที่ถูกส่งไป ได้รับการอัพเดทบนฐานข้อมูลแล้ว"
      })
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
    setPending(false)
  }

  const fetch = async () => {
    setLoading(true)
    const panelID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();
    const res = await getAllAttendanceData.call({panelID: panelID, fp: fingerPrint.visitorId})
    const member = await fetchMembers(panelID, false)

    res.data && setChecks(res.data.sort((a, b) => (parseInt(a.date) - parseInt(b.date))))
    member.data && setMembers(member.data.filter((data) => (!data.student_id.includes("ก"))).sort((a, b) => (parseInt(a.room) - parseInt(b.room) || parseInt(a.number) - parseInt(b.number))))

    const evalData = await getEvaluationData.call({panelID: panelID, fp: fingerPrint.visitorId})
    evalData.data && setPendingUpdate(evalData.data)
    setLoading(false)
  }

  useEffect(() => {
    if (userData.panelID) {
      let currPanel = localStorage.getItem("currentPanel")

      if (userData.panelID && (!currPanel || currPanel === "")) {
        currPanel = userData.panelID[0]
        localStorage.setItem("currentPanel", currPanel)
      }

      fetch()
    }
  }, [userData])

  useEffect(() => {
    console.log(checks)
  }, [checks])


  return (
    <PageContainer>
      <Loader display={loading}/>
      <div className="flex flex-col items-center w-full min-h-screen py-10 px-6">
        <h1 className="text-4xl text-center text-TUCMC-gray-900 mb-2">ประเมินผล</h1>
        <p className="text-TUCMC-gray-700 text-center">กรรมการชมรมจะต้องประเมินผลนักเรียนทุกคนให้เสร็จ</p>
        <p className="text-TUCMC-gray-700 mb-2 text-center">ภายในวันอาทิตย์ ที่ 26 กันยายน 2564</p>
        <div className="w-full max-w-[400px] mb-10">
          <div ref={box}
               className="relative max-w-xl mx-auto rounded-lg bg-white shadow-sm border border-gray-300 flex justify-center">
            <div className="flex justify-end w-full h-full">
              <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                    <span
                      className="text-TUCMC-gray-600 whitespace-nowrap">{userData && ("panelID" in userData && clubMap[localStorage.getItem("currentPanel")])}</span>
              </div>
              <div ref={clubsTrigger}
                   className={classnames("flex justify-center items-center border-l border-gray-300 w-12 cursor-pointer", !(userData.panelID && userData.panelID.length > 1) && "hidden")}>
                <ChevronDownIcon className="w-6 h-6 text-gray-500"/>
              </div>
            </div>
            <Modal TriggerRef={clubsTrigger}
                   CloseDep={{
                     dep: closeBox, revert: () => {
                       setCloseBox(false)
                     }
                   }}
                   className="shadow-md rounded-lg absolute mx-auto mt-1 z-10 left-[-1px] top-[-5px] border border-gray-300">
              <div
                className="flex justify-end rounded-t-lg bg-white h-full">
                <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                      <span
                        className="text-TUCMC-gray-600 whitespace-nowrap">{userData && ("panelID" in userData && clubMap[localStorage.getItem("currentPanel")])}</span>
                </div>
                <div id="clubsClose" className="flex justify-center items-center border-l border-gray-300 w-12 cursor-pointer">
                  <ChevronUpIcon className="w-6 h-6 text-gray-500"/>
                </div>
              </div>
              <div style={{width: `${boxSize}px`}} className="bg-white w-full rounded-b-lg pb-1">
                {
                  adArr && adArr
                    .map((val) => {
                      return <h1 key={val}
                                 onClick={() => {
                                   setCurrentPanel(val)
                                 }}
                                 className="py-[0.54rem] text-center text-TUCMC-gray-600 hover:bg-gray-100 cursor-pointer whitespace-nowrap border-t truncate px-4">{clubMap[val]}</h1>
                    })
                }
              </div>
            </Modal>
          </div>
        </div>
        <div className="flex justify-center w-full">
          {pinned && <div className="flex flex-col flex-shrink-0">
            <div className="flex items-center space-x-4 py-2 pl-4 bg-gray-100 rounded-tl-lg border-l border-b border-t">
              <h1 className="font-medium">ชื่อ นามสกุล</h1>
              <EyeOffIcon onClick={() => {
                setPinned(false)
              }} className="w-5 h-5 text-TUCMC-gray-700 cursor-pointer"/>
            </div>
            {member.map((people) => {
              return (
                <span className="flex items-center border-l border-b h-10 pl-4">{people.title}{people.firstname} {people.lastname}</span>
              )
            })}
          </div>}
          <div className="flex flex-row overflow-x-scroll pb-4">
            {!pinned && <div className="flex flex-col flex-shrink-0">
              <div className="flex items-center space-x-4 py-2 pl-4 bg-gray-100 rounded-tl-lg border-l border-b border-t">
                <h1 className="font-medium">ชื่อ นามสกุล</h1>
                <EyeIcon onClick={() => {
                  setPinned(true)
                }} className="w-5 h-5 text-TUCMC-gray-700 cursor-pointer"/>
              </div>
              {member.map((people) => {
                return (
                  <span className="flex items-center border-l border-b h-10 pl-4">{people.title}{people.firstname} {people.lastname}</span>
                )
              })}
            </div>}
            <div className="flex flex-col flex-shrink-0">
              <h1 className="font-medium py-2 bg-gray-100 text-center border-b border-t px-4">ห้อง</h1>
              {member.map((people) => {
                return (
                  <span className="flex items-center justify-center border-b h-10 px-4">{people.room}</span>
                )
              })}
            </div>
            <div className="flex flex-col flex-shrink-0">
              <h1 className="font-medium py-2 bg-gray-100 text-center border-b border-t px-4">เลขที่</h1>
              {member.map((people) => {
                return (
                  <span className="flex items-center justify-center border-b h-10 px-4">{people.number}</span>
                )
              })}
            </div>
            {checks.map((data) => {
              const date = new Date(parseInt(data.date))
              if (data.date === "1627232400000") {
                return (
                  <div className="flex flex-col w-16 flex-shrink-0">
                    <h1 className="font-medium py-2 bg-gray-100 border-t border-b">{date.getDate()} {month[date.getMonth() + 1]}</h1>
                    {member.map((people) => {
                      return (
                        <span className="flex justify-center items-center border-b h-10"> <MinusSmIcon
                          className="flex items-center justify-center w-5 h-5 text-white bg-TUCMC-gray-500 rounded-md flex-shrink-0"/></span>
                      )
                    })}
                  </div>
                )
              }

              return (
                <div className="flex flex-col w-16 flex-shrink-0">
                  <h1 className="font-medium py-2 bg-gray-100 border-t border-b">{date.getDate()} {month[date.getMonth() + 1]}</h1>
                  {member.map((people) => {

                    let status = false

                    if (data.data) {
                      if (people.student_id in data.data) {
                        if (data.data[people.student_id].action === "passed") {
                          status = true
                        }
                      }
                    }

                    return (
                      <span className="flex justify-center items-center border-b h-10">{status ?
                        <CheckIcon className="w-5 h-5 text-white p-[2px] bg-TUCMC-green-400 rounded-md flex-shrink-0"/> :
                        <XIcon className="w-5 h-5 text-white p-[2px] bg-TUCMC-red-400 rounded-md flex-shrink-0"/>}</span>
                    )
                  })}
                </div>
              )
            })}
            <div className="flex flex-col flex-shrink-0">
              <h1 className="font-medium py-2 bg-gray-100 text-center border-t border-b ">สรุป ({checks.length - 1})</h1>
              {member.map((people) => {
                return (
                  <span className="h-10 flex items-center border-b justify-center">{checks.reduce((prev, curr) => {
                    let cons = 0

                    if (curr.data && curr.date !== "1627232400000") {
                      if(people.student_id in curr.data) {
                        if (curr.data[people.student_id].action === "passed") {
                          cons = 1
                        }
                      }
                    }

                    return prev + cons
                  }, 0)}</span>
                )
              })}
            </div>
            <div className="flex flex-col flex-shrink-0">
              <h1 className="font-medium py-2 bg-gray-100 text-center border-t border-r border-b rounded-tr-lg px-4">ประเมินผล</h1>
              {member.map((people) => {
                return (
                  <span className="h-10 flex items-center border-b border-r justify-center px-4">
                  <EvalCheck userData={people} pendingUpdate={pendingUpdate} setPendingUpdate={setPendingUpdate}/>
                </span>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-20 space-y-4 mt-8">
          <div className="flex flex-row">
            <input className="w-6 h-6 border rounded-md border-gray-200 ring-0 mr-2"
                   onChange={(e) => {
                     setAccept(e.target.checked)
                   }}
                   type="checkbox" required/>
            <span className="text-gray-700">ข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้ว</span>
          </div>
          <Button disabled={pending} onClick={!pending && submitEvalData}
                  className={classnames("px-10 text-white rounded-full bg-TUCMC-pink-400", !pending ? "py-3" : "py-[8px] cursor-default")}>
            <span className={classnames(pending && "hidden")}>ส่งผลการประเมิน</span>
            <Ellipsis className={classnames("w-[6.2rem] h-8", !pending && "hidden")}/>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default Evaluate
