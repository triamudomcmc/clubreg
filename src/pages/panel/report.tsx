import { FilterSearch } from "@components/common/Inputs/Search"
import PageContainer from "@components/common/PageContainer"
import { ArrowCircleDownIcon, ExclamationCircleIcon } from "@heroicons/react/solid"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { fetchClub, fetchMembers } from "@client/fetcher/panel"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { useToast } from "@components/common/Toast/ToastContext"
import { clubMap } from "@config/clubMap"
import { ListElement } from "@components/panel/element/ListElement"
import { searchKeyword, sortNumber, sortThaiDictionary } from "@utilities/object"
import { isNumeric } from "@utilities/texts"
import ReactTooltip from "react-tooltip"
import classnames from "classnames"
import css from "@components/panel/element/bubble.module.css"
import { CatLoader } from "@components/common/CatLoader"
import { AnimatePresence, motion } from "framer-motion"
import { WaitingScreen } from "@components/common/WaitingScreen"
import Link from "next/link"

const fetchMemberData = async (
  panelID: string,
  setMemberData: Dispatch<SetStateAction<{}>>,
  setToast,
  reFetch,
  setInitMem
) => {
  const data = await fetchMembers(panelID, false)

  let sorted = {
    m4: [],
    m5: [],
    m6: [],
  }

  if (data.status) {
    data.data.forEach((item) => {
      if (item.level.replace("ม.", "") === "4") {
        sorted.m4.push(item)
      }
      if (item.level.replace("ม.", "") === "5") {
        sorted.m5.push(item)
      }
      if (item.level.replace("ม.", "") === "6") {
        sorted.m6.push(item)
      }
    })
    setMemberData(sorted)
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

const Report = () => {
  const { addToast } = useToast()

  const { onReady, reFetch } = useAuth()
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [initmember, setInitMember] = useState(false)

  const [memberData, setMemberData] = useState({
    m4: [],
    m5: [],
    m6: [],
  })

  const [clubData, setClubData] = useState({
    new_count: 0,
    new_count_limit: 0,
    old_count: 0,
    old_count_limit: 0,
    call_count: 0,
    count_limit: 0,
    committees: []
  })

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

  const refetch = () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]

    fetchMemberData(currentID, setMemberData, addToast, reFetch, setInitMember)
    fetchClubData(currentID, setClubData)
  }

  useEffect(() => {
    applySort()
  }, [sortMode, memberData])

  const applySort = () => {
    const data = [...memberData.m4, ...memberData.m5, ...memberData.m6]

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
    if (userData && userData.panelID) {
      refetch()
    }
  }, [userData])

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

  return (
    <PageContainer hide={!initmember}>
      <AnimatePresence>
        {initmember ? (
          <>
            <div className="mx-auto max-w-6xl pt-10 pb-14">
              <h1 className="text-center text-2xl font-medium">สมาชิกชมรม</h1>
              <div className="flex justify-center">
                <div className="absolute w-full px-4 pt-8">
                  <div className="mx-auto flex max-w-xl justify-center rounded-lg border border-gray-300 bg-white shadow-md ">
                    <div className="flex h-full w-full justify-end">
                      <div className="flex w-full justify-center overflow-hidden overflow-clip py-[0.54rem]">
                        <h1 className="whitespace-nowrap text-xl text-TUCMC-gray-600">
                          {userData && "panelID" in userData && clubMap[localStorage.getItem("currentPanel")]}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-screen bg-TUCMC-gray-100 px-4 pt-16 pb-20">
              <div className="mx-auto flex flex-col space-y-4 md:max-w-4xl">
                <div className="flex flex-col space-y-4 md:w-full md:flex-row md:justify-center md:space-y-0 md:space-x-4">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-3.5 text-xl text-TUCMC-gray-600 shadow-md md:w-1/3">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="flex items-center space-x-2">
                        <span>สมาชิกทั้งหมด</span>
                        <div className="relative h-5 w-5">
                          <div className="absolute z-30 h-5 w-5 opacity-0 hover:opacity-100">
                            <div className="absolute -top-9 left-[-8.13rem]">
                              <div
                                className={classnames(
                                  "w-[280px] rounded-md bg-white p-2 text-xs text-black shadow-md",
                                  css.tooltip2
                                )}
                              >
                                <h1 className="text-center">จำนวนนี้ไม่รวมกรรมการชมรม ({clubData.committees.length} คน)</h1>
                              </div>
                            </div>
                            <ExclamationCircleIcon className="h-5 w-5 text-TUCMC-gray-600" />
                          </div>
                          <ExclamationCircleIcon className="absolute z-[29] h-5 w-5 text-TUCMC-gray-600" />
                        </div>
                      </div>
                      <div className="flex flex-row items-end">
                        <h1 className="text-3xl font-bold text-TUCMC-gray-900">
                          {clubData.old_count + 0}
                        </h1>
                        <h2 className="text-TUCMC-gray-500">/{clubData.count_limit}</h2>
                      </div>
                      <div>คน</div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center  justify-center divide-x-2 divide-gray-300 rounded-lg bg-white px-4  py-3.5 text-xl text-TUCMC-gray-600 shadow-md md:w-2/3">
                    <div className="flex w-full items-center justify-center py-2 ">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="flex items-center space-x-2">
                          <span>สมาชิกเก่า</span>
                          <div className="relative h-5 w-5">
                            <div className="absolute z-30 h-5 w-5 opacity-0 hover:opacity-100">
                              <div className="absolute -top-9 left-[-8.13rem]">
                                <div
                                  className={classnames(
                                    "w-[280px] rounded-md bg-white p-2 text-xs text-black shadow-md",
                                    css.tooltip2
                                  )}
                                >
                                  <h1 className="text-center">จำนวนนี้ไม่รวมกรรมการชมรม ({clubData.committees.length} คน)</h1>
                                </div>
                              </div>
                              <ExclamationCircleIcon className="h-5 w-5 text-TUCMC-gray-600" />
                            </div>
                            <ExclamationCircleIcon className="absolute z-[29] h-5 w-5 text-TUCMC-gray-600" />
                          </div>
                        </div>
                        <div className="flex flex-row items-end">
                          <h1 className="text-3xl font-bold text-TUCMC-gray-900">{clubData.old_count}</h1>
                          <h2 className="text-TUCMC-gray-500">/{clubData.old_count_limit}</h2>
                        </div>
                        <div>คน</div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-center py-2">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div>สมาชิกใหม่</div>
                        <div className="flex flex-row items-end">
                          <h1 className="text-3xl font-bold text-TUCMC-gray-900">{0}</h1>
                          <h2 className="text-TUCMC-gray-500">/{clubData.count_limit - clubData.old_count_limit}</h2>
                        </div>
                        <div>คน</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex w-full flex-row items-center justify-center divide-x-2 divide-gray-300 rounded-lg bg-white px-4 py-3.5 text-xl text-TUCMC-gray-600 shadow-md">
                    <div className="flex w-full items-center justify-center py-2">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div>ม.4</div>
                        <div className="flex ">
                          <h1 className="text-3xl font-bold text-TUCMC-gray-900">{memberData.m4.length}</h1>
                        </div>
                        <div>คน</div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-center py-2">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div>ม.5</div>
                        <div className="flex ">
                          <h1 className="text-3xl font-bold text-TUCMC-gray-900">{memberData.m5.length}</h1>
                        </div>
                        <div>คน</div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-center py-2">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div>ม.6</div>
                        <div className="flex">
                          <h1 className="text-3xl font-bold text-TUCMC-gray-900">{memberData.m6.length}</h1>
                        </div>
                        <div>คน</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="relative flex justify-center">
                <div className="absolute -top-8 w-full px-4 pb-8">
                  <a href="/panel/print" target="_blank">
                    <div className="mx-auto flex max-w-md cursor-pointer items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white p-5 text-TUCMC-gray-700">
                      <ArrowCircleDownIcon className="h-5 w-5" />
                      <span>ดาวน์โหลดรายชื่อสมาชิก</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-6xl pt-10 pb-14">
              <h1 className="pt-16 pb-10 text-center text-xl text-TUCMC-gray-700">รายชื่อ</h1>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-sm md:max-w-xl">
                  <FilterSearch
                    setSearchContext={setSearchContext}
                    setSortMode={setSortMode}
                    sortMode={sortMode}
                    normal={false}
                  />
                </div>
                <div className="mt-6 mb-6 w-full max-w-5xl">
                  {sortedData.map((item, index) => {
                    return (
                      <ListElement
                        key={`report-${index}`}
                        userData={item}
                        editable={false}
                        editFunc={() => {}}
                        noStatus={true}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <CatLoader key="cat" />
        )}
      </AnimatePresence>
    </PageContainer>
  )
}

export default Report
