import PageContainer from "@components/common/PageContainer";
import {AnnounceSplash} from "@vectors/decorations/AnnounceSplash";
import ClubStatus from "@components/announce/ClubStatus";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {isEmpty} from "@utilities/object";
import React, {useEffect, useState} from "react";
import ConfirmModal from "@components/select/ConfirmModal";
import DataModal from "@components/select/DataModal";
import {Loader} from "@components/common/Loader";
import {useTimer} from "@utilities/timers";
import classnames from "classnames";
import {announceTime, breakLowerBound, breakUpperBound, endLastRound, endRegClubTime, lastround} from "@config/time";
import {WaitingScreen} from "@components/common/WaitingScreen";

const Announce = () => {
  const {onReady, reFetch} = useAuth()
  const [desc, setDesc] = useState(<></>)
  const [bottomDesc, setBottomDesc] = useState(<></>)

  const [modalState, setModalState] = useState({open: false, data: {}})
  const [select, setSelect] = useState({state: false, mode: "confirm"})
  const [dataModal, setDataModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
    }else{
      if (userData.club !== "") {
        Router.push("/card")
      }

      if (new Date().getTime() < lastround){
        return userData
      }

      if (new Date().getTime() < endLastRound) {
        Router.push("/select")
      }else{
        Router.push("/account")
      }
    }
    return userData
  })

  const upperBound = breakUpperBound, lowerBound = breakLowerBound

  const before = (new Date().getTime() < announceTime)

  const limit = (new Date().getTime() < 1623776400000) ? 1623776400000 : (new Date().getTime() < 1623862800000) ? 1623862800000 : 1623949200000

  const timer = useTimer(limit)
  const openTimer = useTimer(announceTime)

  useEffect(() => {
    const currentTime = new Date().getTime()

    if (currentTime < lastround) {
      setTimeout(() => {
        Router.push("/select")
      }, lastround - currentTime)
    }
  }, [])

  useEffect(() => {
    if (userData.audition && !isEmpty(userData.audition)) {
      setDesc(<></>)
      setBottomDesc(<></>)
      const values = Object.values(userData.audition)
      if (values.includes("passed")) {
        setDesc(<div className="px-6 mt-12 md:mt-20 text-center">
          <p className="text-TUCMC-gray-700">
            กดยืนยันสิทธิ์หรือสละสิทธิ์ชมรมที่ผ่านการ
            คัดเลือกภายในวันนี้ (เหลือเวลาอีก {timer.hour} ชั่วโมง {timer.min} นาที)
          </p>
          <p className="text-TUCMC-gray-700">
            หากไม่ดำเนินการใด ๆ ภายในเวลาที่กำหนด
            จะถือว่าสละสิทธิ์ชมรมที่ผ่านการคัดเลือกโดยอัตโนมัติ
          </p>
        </div>)
      }
      if ((values.includes("rejected") || values.includes("failed")) && (!values.includes("passed") && !values.includes("reserved"))) {
        setBottomDesc(
          <p className="text-TUCMC-gray-700 px-16 text-center mt-20 max-w-md mx-auto">
            กรุณารอเลือกเข้าชมรมที่ไม่มีการ Audition
            และยังมีที่นั่งว่างอยู่ ในวันที่ 18 มิ.ย. 64
          </p>
        )
      }
      if (values.includes("passed") && values.includes("reserved")) {
        setDesc(prevState => (
          <>
            {prevState}
            <h1 className="text-center text-TUCMC-gray-700 mt-6">หรือ</h1>
          </>
        ))
      }
      if (values.includes("reserved")) {
        setDesc(prevState => (
          <>
            {prevState}
            <div className="px-6 mt-6 flex flex-col items-center space-y-2">
              <p className="text-TUCMC-gray-700">รอลุ้นลำดับสำรอง 2 รอบ</p>
              <div>
                <div className="flex items-center space-x-1">
                  <div
                    className={classnames("w-4 h-4 flex items-center justify-center rounded-full text-[8px] font-medium text-white", new Date().getTime() >= 1623803400000 ? "bg-TUCMC-gray-700" : "bg-TUCMC-gray-500")}>1
                  </div>
                  <span className={classnames(new Date().getTime() >= 1623803400000 ? "text-TUCMC-gray-700" : "text-TUCMC-gray-500")}>16 มิ.ย. 64 เวลา 07.30 น.</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className={classnames("w-4 h-4 flex items-center justify-center rounded-full text-[8px] font-medium text-white", new Date().getTime() >= 1623889800000 ? "bg-TUCMC-gray-700" : "bg-TUCMC-gray-500")}>2
                  </div>
                  <span className={classnames(new Date().getTime() >= 1623889800000 ? "text-TUCMC-gray-700" : "text-TUCMC-gray-500")}>17 มิ.ย. 64 เวลา 07.30 น.</span>
                </div>
              </div>
            </div>
          </>
        ))
      }
    }
  }, [userData, timer])

  const clearState = () => {
    setModalState({open: false, data: {}})
  }


  return (
    (new Date().getTime() > upperBound || new Date().getTime() < lowerBound) ? <PageContainer>
      <Loader display={loader}/>
      <ConfirmModal onAgree={() => {
        setDataModal(true)
      }} clubData={modalState} TriggerDep={{
        dep: select.state, revert: () => {
          setSelect(prev => ({state: false, mode: prev.mode}))
        }
      }} mode={select.mode} setLoader={setLoader}/>
      <DataModal setLoader={setLoader} state={modalState} refetcher={reFetch} closeFunc={clearState}
                 TriggerDep={{
                   dep: dataModal, revert: () => {
                     setDataModal(false)
                   }
                 }} mode={select.mode}/>
      <div className="flex flex-col items-center pt-14 md:pt-20 min-h-screen">
        <div className="max-w-md px-4">
          <div className="flex flex-col items-center">
            {!before && <h1 className="font-medium text-TUCMC-gray-700 text-4xl">ประกาศผล</h1>}
          </div>
          <div className="mt-10 w-full px-14 minClubs:px-20">
            <AnnounceSplash className="w-full"/>
          </div>
          {
            !before ? desc : <div className="mb-20 pt-10 space-y-8">
              <div className="flex flex-col items-center text-TUCMC-gray-700">
                <h1 className="text-4xl">รอประกาศผล</h1>
                <h1 className="text-xl">15 มิ.ย. 2564 เวลา 7.30 น.</h1>
              </div>
              <div
                className="flex flex-row space-x-2 justify-center text-TUCMC-gray-700">
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg h-[52px] w-[56px] text-center">{openTimer.hour}</span>
                  <span className="text-white font-bold text-xs mt-2 text-TUCMC-gray-600">HOUR</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg h-[52px] w-[56px] text-center">{openTimer.min}</span>
                  <span className="text-white font-bold text-xs mt-2 text-TUCMC-gray-600">MIN</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg h-[52px] w-[56px] text-center">{openTimer.sec}</span>
                  <span className="text-white font-bold text-xs mt-2 text-TUCMC-gray-600">SEC</span>
                </div>
              </div>
            </div>
          }
        </div>
        {!before && <div className="mt-16 bg-TUCMC-gray-100 w-full pb-20 pt-12">
          <div className="space-y-4 px-4 max-w-md mx-auto">
            {
              (!before && userData.audition && !isEmpty(userData.audition)) ? Object.keys(userData.audition)
                                                                                     .map((key) => {
                                                                                       return <ClubStatus
                                                                                         selectTrigger={setSelect}
                                                                                         action={setModalState}
                                                                                         key={key} data={{
                                                                                         clubID: key,
                                                                                         status: userData.audition[key]
                                                                                       }}/>
                                                                                     }) : <div className="flex justify-center">
                <h1 className="text-TUCMC-gray-700 mt-5">ไม่มีชมรมที่ออดิชั่น</h1>
              </div>
            }
          </div>
          {!before && bottomDesc}
        </div>}
      </div>
    </PageContainer> : <WaitingScreen target={upperBound}/>
  )
}

export default Announce