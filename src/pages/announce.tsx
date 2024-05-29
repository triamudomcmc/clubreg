import PageContainer from "@components/common/PageContainer"
import { AnnounceSplash } from "@vectors/decorations/AnnounceSplash"
import ClubStatus from "@components/announce/ClubStatus"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { isEmpty } from "@utilities/object"
import React, { useEffect, useState } from "react"
import ConfirmModal from "@components/select/ConfirmModal"
import DataModal from "@components/select/DataModal"
import { Loader } from "@components/common/Loader"
import { useTimer } from "@utilities/timers"
import classnames from "classnames"
import { fetchAllClubData } from "@handlers/client/fetcher/club"
import {
  announceTime,
  endAnnounceTime,
  endFirstRoundTime,
  endLastRound,
  endRegClubTime,
  endSecondRoundTime,
  firstRoundTime,
  getFullDate,
  lastround,
  secondRoundTime,
} from "@config/time"
import { WaitingScreen } from "@components/common/WaitingScreen"
import { async } from "crypto-random-string"

const Announce = () => {
  const { onReady, reFetch } = useAuth()
  const [desc, setDesc] = useState(<></>)
  const [bottomDesc, setBottomDesc] = useState(<></>)

  const [modalState, setModalState] = useState({ open: false, data: {} })
  const [select, setSelect] = useState({ state: false, mode: "confirm" })
  const [allClubData, setAllClubData] = useState([])
  const [dataModal, setDataModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
    } else {
      if (userData.club !== "") {
        Router.push("/card")
      }

      if (new Date().getTime() < lastround) {
        return userData
      }

      if (new Date().getTime() < endLastRound) {
        Router.push("/select")
      } else {
        Router.push("/account")
      }
    }
    return userData
  })

  const before = new Date().getTime() < announceTime

  const limit =
    new Date().getTime() < endAnnounceTime
      ? endAnnounceTime
      : new Date().getTime() < endFirstRoundTime
      ? endFirstRoundTime
      : endSecondRoundTime

  const slimit =
    new Date().getTime() < firstRoundTime
      ? firstRoundTime
      : new Date().getTime() < secondRoundTime
      ? secondRoundTime
      : lastround

  const elimit =
    new Date().getTime() < firstRoundTime
      ? endAnnounceTime
      : new Date().getTime() < secondRoundTime
      ? endFirstRoundTime
      : endSecondRoundTime

  const upperBound = slimit,
    lowerBound = elimit

  const timer = useTimer(limit)
  const openTimer = useTimer(announceTime)

  useEffect(() => {
    const currentTime = new Date().getTime()

    if (currentTime < lastround) {
      setTimeout(() => {
        Router.push("/select")
      }, lastround - currentTime)
    }

    if (currentTime < elimit) {
      setTimeout(() => {
        Router.reload()
      }, elimit - currentTime)
    }

    if (before) {
      setTimeout(() => {
        reFetch()
      }, announceTime - currentTime)
    }
  }, [])

  useEffect(() => {
    if (userData.audition && !isEmpty(userData.audition)) {
      setDesc(<></>)
      setBottomDesc(<></>)
      const values = Object.values(userData.audition)
      if (values.includes("passed")) {
        setDesc(
          <div className="mt-12 px-6 text-center md:mt-20">
            <p className="text-TUCMC-gray-700">
              กดยืนยันสิทธิ์หรือสละสิทธิ์ชมรมที่ผ่านการ คัดเลือกภายในวันนี้ (เหลือเวลาอีก {timer.hour} ชั่วโมง{" "}
              {timer.min} นาที)
            </p>
            <p className="text-TUCMC-gray-700">
              หากไม่ดำเนินการใด ๆ ภายในเวลาที่กำหนด จะถือว่าสละสิทธิ์ชมรมที่ผ่านการคัดเลือกโดยอัตโนมัติ
            </p>
          </div>
        )
      }
      if (
        (values.includes("rejected") || values.includes("failed") || values.includes("waiting")) &&
        !values.includes("passed") &&
        !values.includes("reserved")
      ) {
        setBottomDesc(
          <p className="mx-auto mt-20 max-w-md px-16 text-center text-TUCMC-gray-700">
            กรุณารอเลือกเข้าชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่ ในวันที่ {getFullDate(lastround, false)}
          </p>
        )
      }
      if (values.includes("passed") && values.includes("reserved")) {
        setDesc((prevState) => (
          <>
            {prevState}
            <h1 className="mt-6 text-center text-TUCMC-gray-700">หรือ</h1>
          </>
        ))
      }
      if (values.includes("reserved")) {
        setDesc((prevState) => (
          <>
            {prevState}
            <div className="mt-6 flex flex-col items-center space-y-2 px-6">
              <p className="text-TUCMC-gray-700">รอลุ้นลำดับสำรอง 2 รอบ</p>
              <div>
                <div className="flex items-center space-x-1">
                  <div
                    className={classnames(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-medium text-white",
                      new Date().getTime() >= firstRoundTime ? "bg-TUCMC-gray-700" : "bg-TUCMC-gray-500"
                    )}
                  >
                    1
                  </div>
                  <span
                    className={classnames(
                      new Date().getTime() >= firstRoundTime ? "text-TUCMC-gray-700" : "text-TUCMC-gray-500"
                    )}
                  >
                    {getFullDate(firstRoundTime)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className={classnames(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-medium text-white",
                      new Date().getTime() >= secondRoundTime ? "bg-TUCMC-gray-700" : "bg-TUCMC-gray-500"
                    )}
                  >
                    2
                  </div>
                  <span
                    className={classnames(
                      new Date().getTime() >= secondRoundTime ? "text-TUCMC-gray-700" : "text-TUCMC-gray-500"
                    )}
                  >
                    {getFullDate(secondRoundTime)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ))
      }
    }
  }, [userData, timer])

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllClubData("")
      setAllClubData(data.data)
    }

    getData()
  }, [])

  const clearState = () => {
    setModalState({ open: false, data: {} })
  }

  return new Date().getTime() > upperBound || new Date().getTime() < lowerBound ? (
    <PageContainer>
      <Loader display={loader} />
      <ConfirmModal
        onAgree={() => {
          setDataModal(true)
        }}
        clubData={modalState}
        TriggerDep={{
          dep: select.state,
          revert: () => {
            setSelect((prev) => ({ state: false, mode: prev.mode }))
          },
        }}
        mode={select.mode}
        setLoader={setLoader}
      />
      <DataModal
        setLoader={setLoader}
        state={modalState}
        refetcher={reFetch}
        closeFunc={clearState}
        TriggerDep={{
          dep: dataModal,
          revert: () => {
            setDataModal(false)
          },
        }}
        mode={select.mode}
      />
      <div className="flex min-h-screen flex-col items-center pt-14 md:pt-20">
        <div className="max-w-md px-4">
          <div className="flex flex-col items-center">
            {!before && <h1 className="text-4xl font-medium text-TUCMC-gray-700">ประกาศผล</h1>}
          </div>
          <div className="mt-10 w-full px-14 minClubs:px-20">
            <AnnounceSplash className="w-full" />
          </div>
          {!before ? (
            desc
          ) : (
            <div className="mb-20 space-y-8 pt-10">
              <div className="flex flex-col items-center text-TUCMC-gray-700">
                <h1 className="text-4xl">รอประกาศผล</h1>
                <h1 className="text-xl">{getFullDate(announceTime)}</h1>
              </div>
              <div className="flex flex-row justify-center space-x-2 text-TUCMC-gray-700">
              <div className="flex flex-col items-center">
                  <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                    {openTimer.day}
                  </span>
                  <span className="mt-2 text-xs font-bold text-TUCMC-gray-600">DAY</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                    {openTimer.hour}
                  </span>
                  <span className="mt-2 text-xs font-bold text-TUCMC-gray-600">HOUR</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                    {openTimer.min}
                  </span>
                  <span className="mt-2 text-xs font-bold text-TUCMC-gray-600">MIN</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                    {openTimer.sec}
                  </span>
                  <span className="mt-2 text-xs font-bold text-TUCMC-gray-600">SEC</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {!before && (
          <div className="mt-16 w-full bg-TUCMC-gray-100 pb-20 pt-12">
            <div className="mx-auto max-w-md space-y-4 px-4">
              {!before && userData.audition && !isEmpty(userData.audition) ? (
                Object.keys(userData.audition).map((key) => {
                  return (
                    <ClubStatus
                      selectTrigger={setSelect}
                      action={setModalState}
                      key={key}
                      data={{
                        clubID: key,
                        status: userData.audition[key],
                        position: userData.position ? userData.position[key] : null,
                        fromPos:
                          allClubData.filter((e) => e.clubID === key).length > 0
                            ? typeof allClubData.filter((e) => e.clubID === key)[0].maxPos === "number"
                              ? allClubData.filter((e) => e.clubID === key)[0].maxPos
                              : userData.section
                              ? userData.section[key] in (allClubData.filter((e) => e.clubID === key)[0].maxPos || {})
                                ? allClubData.filter((e) => e.clubID === key)[0].maxPos[userData.section[key]]
                                : undefined
                              : undefined
                            : 0,
                        section: userData.section ? userData.section[key] : null,
                      }}
                    />
                  )
                })
              ) : (
                <div className="flex justify-center">
                  <h1 className="mt-5 text-TUCMC-gray-700">ไม่มีชมรมที่ออดิชั่น</h1>
                </div>
              )}
            </div>
            {!before && bottomDesc}
          </div>
        )}
      </div>
    </PageContainer>
  ) : (
    <WaitingScreen target={upperBound} />
  )
}

export default Announce
