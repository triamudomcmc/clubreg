import PageContainer from "@components/common/PageContainer"
import SelectSplash from "@vectors/decorations/SelectSplash"
import { XIcon } from "@heroicons/react/solid"
import ClubList from "@components/select/ClubList"
import ClubModal from "@components/select/ClubModal"
import { useEffect, useRef, useState } from "react"
import { FilterSearch } from "@components/common/Inputs/Search"
import Modal from "@components/common/Modals"
import ConfirmModal from "@components/select/ConfirmModal"
import DataModal from "@components/select/DataModal"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { GetServerSideProps, GetStaticProps } from "next"
import * as fs from "fs"
import { useWindowDimensions } from "@utilities/document"
import { fetchClub } from "@client/fetcher/club"
import { Loader } from "@components/common/Loader"
import { isEmpty, objToArr, searchKeyword, sortAudition, sortThaiDictionary } from "@utilities/object"
import { sliceArr } from "@utilities/array"
import { clubMap } from "../config/clubMap"
import { regClub } from "@client/userAction"
import { CatLoader } from "@components/common/CatLoader"
import { AnimatePresence, motion } from "framer-motion"
import { endLastRound, endRegClubTime, lastround, openTime, getFullDate, announceTime } from "@config/time"
import { useToast } from "@components/common/Toast/ToastContext"
import initialisedDB from "@server/firebase-admin"
import { ClubDisplay } from "@interfaces/clubDisplay"

/*const blockContent = (dataObj) => {
  let newObj = {}
  Object.keys(dataObj).forEach(val => {
    if (!dataObj[val].audition) {
      newObj[val] = {...dataObj[val], blocked: true}
    } else {
      newObj[val] = dataObj[val]
    }
  })
  return newObj
}*/

export interface IClubListData {
  name: string
  audition: boolean
  clubID: string
  imageURL: string
}

export const getStaticProps: GetStaticProps = async () => {
  // const files = fs.readdirSync("./public/assets/thumbnails/")

  const clubDisplayDocs = await initialisedDB.collection("clubDisplay").get()
  const clubList = clubDisplayDocs.docs.map((club) => {
    const data = club.data() as ClubDisplay

    return {
      name: data.nameTH,
      audition: data.audition,
      clubID: club.id,
      imageURL: data?.images?.mainImage || `/assets/thumbnails/${club.id}.jpg`,
    }
  })
  
  return {
    props: {
      clubList: clubList,
    },
  }
}

const Select = ({ clubList }) => {
  const { onReady, tracker, reFetch } = useAuth()
  const { width } = useWindowDimensions()

  const [modalState, setModalState] = useState({ open: false, data: {} })
  const [select, setSelect] = useState(false)
  const [dataModal, setDataModal] = useState(false)
  const [sortedData, setSortedData] = useState([])
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [rawSorted, setRawSorted] = useState([])
  const [clubData, setClubData] = useState({})
  const [auditionList, setAuditionList] = useState(<></>)
  const [loader, setLoader] = useState(false)
  const [initclub, setInitclub] = useState(false)
  const { addToast } = useToast()

  const auTrigger = useRef(null)
  const noAu = new Date().getTime() > lastround
  const time = new Date().getTime() > lastround ? endLastRound : endRegClubTime

  const { userData } = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
    } else {
      if (new Date().getTime() < openTime) {
        Router.push("/")
        return { userData }
      }

      if (userData.club !== "") {
        Router.push("/card")
      } else {
        if ((Object.keys(userData.audition).length <= 0 || new Date().getTime() > endLastRound) && new Date().getTime() > endRegClubTime) {
          localStorage.setItem("alert", "denied")
          return Router.push("/account")
        }
      }

      if (
        new Date().getTime() > endRegClubTime &&
        !(new Date().getTime() > lastround && new Date().getTime() < endLastRound)
      ) {
        Router.push("/announce")
        return { userData }
      }
    }
    return { userData }
  })

  useEffect(() => {
    const currentTime = new Date().getTime()

    if (currentTime < time) {
      setTimeout(() => {
        Router.reload()
      }, time - currentTime)
    }
  }, [])

  const apply = () => {
    const dataArr = objToArr(clubData, (val) => {
      if (!noAu) return val
      return val.audition ? null : val
    })

    switch (sortMode) {
      case "ascending":
        {
          const sorted = sortThaiDictionary(dataArr, (obj) => obj.title)
          setRawSorted(sorted)
        }
        break
      case "descending":
        {
          const sorted = sortThaiDictionary(dataArr, (obj) => obj.title, true)
          setRawSorted(sorted)
        }
        break
      case "hasAudition":
        {
          const sorted = sortAudition(dataArr)
          setRawSorted(sorted)
        }
        break
      case "notHasAudition": {
        const sorted = sortAudition(dataArr, true)
        setRawSorted(sorted)
      }
    }
  }

  useEffect(() => {
    const load = async () => {
      const value = await fetchClub()
      setClubData(value)
      setInitclub(true) 
    }

    userData && Object.keys(userData).length > 2 && load()
  }, [userData])

  useEffect(() => {
    userData &&
      "audition" in userData &&
      Object.keys(clubData).length > 0 &&
      setAuditionList(
        <>
          {Object.keys(userData.audition).map((val) => {
            return (
              <h1 key={val} className="border-t py-4 px-4">
                {clubData[val].title}
              </h1>
            )
          })}
        </>
      )
  }, [clubData, userData])

  useEffect(() => {
    apply()
  }, [sortMode, clubData, width])

  useEffect(() => {
    const escaped = searchContext.replace("ชมรม", "")
    if (escaped !== "") {
      const searchResult = searchKeyword(rawSorted, escaped, (obj) => obj.title)
      setSortedData(sliceArr(searchResult, width))
    } else {
      setSortedData(sliceArr(rawSorted, width))
    }
  }, [searchContext, rawSorted])

  const clearState = () => {
    setModalState({ open: false, data: {} })
  }

  const selectClub = () => {
    setSelect(true)
  }

  const confirmOld = () => {
    setModalState({
      open: false,
      data: { ...clubData[userData.old_club], clubID: userData.old_club, oldClubConfirm: true },
    })
    setSelect(true)
  }

  return (
    new Date().getTime() < time && (
      <PageContainer hide={!initclub}>
        <Loader display={loader} />
        <ConfirmModal
          onAgree={() => {
            setDataModal(true)
          }}
          clubData={modalState}
          TriggerDep={{
            dep: select,
            revert: () => {
              setSelect(false)
            },
          }}
          refetcher={reFetch}
          setLoader={setLoader}
        />
        <ClubModal
          state={modalState}
          userData={userData}
          closeAction={clearState}
          action={selectClub}
          clubList={clubList}
          confirmOldClub={confirmOld}
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
        />
        <AnimatePresence>
          {initclub ? (
            <div className="flex flex-col items-center py-14 px-4 md:flex-row md:items-start md:justify-center md:space-x-6">
              <div className="md:max-w-xs">
                <div className="flex flex-col items-center">
                  <h1 className="text-4xl font-medium">เลือกชมรม</h1>
                  <span className="text-sm tracking-tight">ภายในวันที่ {getFullDate(endRegClubTime,false)}</span>
                </div>
                <div className="mt-6 w-full min-w-[300px] px-8">
                  <SelectSplash />
                </div>
                <div className="mt-10 space-y-6 px-2">
                  {!noAu && userData && !isEmpty(userData.audition) && (
                    <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 py-6 shadow-md">
                      <h1 className="text-lg font-medium tracking-tight">คุณได้ลงชื่อ Audition ชมรมไว้</h1>
                      <p className="tracking-tight text-gray-600">
                        ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด โดยติดตามรายละเอียดการ Audition
                        จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง และรอการประกาศผลในวันที่ {getFullDate(announceTime)}
                      </p>
                      <div className="relative md:hidden">
                        <a ref={auTrigger} className="cursor-pointer tracking-tight text-TUCMC-pink-500">
                          ดูรายชื่อชมรมที่ลงชื่อ Audition ไว้ →
                        </a>
                        <Modal
                          TriggerRef={auTrigger}
                          CloseID="audiClose"
                          className="absolute z-20 mt-1 w-full rounded-lg shadow-md"
                        >
                          <div className="flex items-start justify-between rounded-t-lg bg-gray-50 py-2 px-4 text-sm text-gray-500">
                            <h1 className="mt-1">รายชื่อชมรมที่ลงชื่อ Audition ไว้</h1>
                            <XIcon id="audiClose" className="h-7 w-7 cursor-pointer text-TUCMC-gray-400" />
                          </div>
                          <div className="rounded-b-lg bg-white">{auditionList}</div>
                        </Modal>
                      </div>
                    </div>
                  )}
                  {!noAu && userData && !isEmpty(userData.audition) && (
                    <div className="z-20 mt-1 hidden rounded-lg shadow-md md:block">
                      <div className="flex items-start justify-between rounded-t-lg bg-gray-50 py-2 px-4 text-sm text-gray-500">
                        <h1 className="mt-1">รายชื่อชมรมที่ลงชื่อ Audition ไว้</h1>
                      </div>
                      <div className="rounded-b-lg bg-white">{auditionList}</div>
                    </div>
                  )}

                  {/* {!noAu &&
                    (!isEmpty(clubData) &&
                    userData &&
                    "old_club" in userData &&
                    userData.old_club !== "" &&
                    clubData[userData.old_club].old_count < clubData[userData.old_club].old_count_limit ? (
                      <div className="flex flex-col items-start space-y-4 rounded-lg bg-white p-4 py-6 shadow-md">
                        <h1 className="text-lg font-medium tracking-tight">โควตายืนยันสิทธิ์ชมรมเดิม</h1>
                        <p className="tracking-tight text-gray-600">
                          นักเรียนสามารถใช้โควตายืนยันสิทธิ์ชมรมเดิมได้ทันที [ชมรม{clubMap[userData.old_club]}]
                          *โควตามีจำนวนจำกัด
                        </p>
                        <a
                          onClick={confirmOld}
                          className="cursor-pointer whitespace-nowrap rounded-3xl bg-TUCMC-green-400 px-5 py-2.5 text-white shadow-md"
                        >
                          ยืนยันสิทธิ์ชมรมเดิม
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 py-6 shadow-md">
                        <h1 className="text-lg font-medium tracking-tight">โควตายืนยันสิทธิ์ชมรมเดิม</h1>
                        <p className="tracking-tight text-gray-600">
                          นักเรียนไม่สามารถยืนยันสิทธิ์ได้ (ชมรม{userData && clubMap[userData.old_club]}) เนื่องจากชมรม
                          {userData && clubData[userData.old_club]?.old_count_limit === 0
                            ? "ไม่อนุญาตให้ยืนยันสิทธิ์ชมรมเดิม"
                            : "ไม่มีโควตาสมาชิกเก่าเหลือแล้ว"}
                          หากต้องการอยู่ชมรมเดิม ให้กดลงทะเบียนเข้าชมรมเดิมในฐานะสมาชิกใหม่
                        </p>
                        <div className="relative md:hidden">
                          <a href="/FAQ" target="_blank" className="cursor-pointer tracking-tight text-TUCMC-gray-700">
                            ดูรายละเอียดเพิ่มเติม →
                          </a>
                        </div>
                      </div>
                    ))} */}
                </div>
              </div>
              <div style={width > 768 ? { width: width - 376, maxWidth: 952 } : {}} className="mt-16 md:mt-0">
                <div className="mx-4 border-b pb-5">
                  <div>
                    <FilterSearch setSearchContext={setSearchContext} sortMode={sortMode} setSortMode={setSortMode} />
                  </div>
                </div>
                <div className="mt-6 flex flex-col md:flex-row md:space-x-4">
                  <div className="space-y-2 md:w-1/2">
                    {sortedData[0]?.map((val) => {
                      return <ClubList key={val.clubID} data={val} action={setModalState} />
                    })}
                  </div>
                  <div className="mt-2 space-y-2 md:mt-0 md:w-1/2">
                    {sortedData[1]?.map((val) => {
                      return <ClubList key={val.clubID} data={val} action={setModalState} />
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CatLoader key="cat" />
          )}
        </AnimatePresence>
      </PageContainer>
    )
  )
}

export default Select
