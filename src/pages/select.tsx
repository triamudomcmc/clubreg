import PageContainer from "@components/common/PageContainer";
import SelectSplash from "@vectors/decorations/SelectSplash";
import {
  XIcon
} from '@heroicons/react/solid'
import ClubList from "@components/select/ClubList";
import ClubModal from "@components/select/ClubModal";
import {useEffect, useRef, useState} from "react";
import {FilterSearch} from "@components/common/Inputs/Search";
import Modal from "@components/common/Modals";
import ConfirmModal from "@components/select/ConfirmModal";
import DataModal from "@components/select/DataModal";
import Toast from "@components/common/Toast";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {GetServerSideProps, GetStaticProps} from "next";
import * as fs from "fs";
import {useWindowDimensions} from "@utilities/document";
import initialisedDB from "@server/firebase-admin"
import {fetchClub} from "@client/fetcher/club";
import {Loader} from "@components/common/Loader";
import {is} from "@babel/types";
import {
  isEmpty,
  objToArr,
  searchKeyword,
  sortAudition,
  sortThaiDictionary
} from "@utilities/object";
import {sliceArr} from "@utilities/array";
import Image from "next/image";
import {useToast} from "@components/common/Toast/ToastContext";

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

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("./public/assets/thumbnails/")
  return {
    props: {
      thumbPaths: files
    }
  }
}

const Select = ({thumbPaths}) => {

  const {onReady, tracker, reFetch} = useAuth()
  const {width} = useWindowDimensions()

  const [modalState, setModalState] = useState({open: false, data: {}})
  const [select, setSelect] = useState(false)
  const [dataModal, setDataModal] = useState(false)
  const [sortedData, setSortedData] = useState([])
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [rawSorted, setRawSorted] = useState([])
  const [clubData, setClubData] = useState({})
  const [auditionList, setAuditionList] = useState(<></>)
  const [loader, setLoader] = useState(false)

  const auTrigger = useRef(null)

  const {userData} = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
    } else {
      if (userData.club !== "") {
        Router.push("/card")
      }
    }
    return {userData}
  })

  const apply = () => {
    const dataArr = objToArr(clubData)
    switch (sortMode) {
      case "ascending": {
        const sorted = sortThaiDictionary(dataArr, obj => (obj.title))
        setRawSorted(sorted)
      }
        break
      case "descending": {
        const sorted = sortThaiDictionary(dataArr, obj => (obj.title), true)
        setRawSorted(sorted)
      }
        break
      case "hasAudition": {
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
    }

    userData && Object.keys(userData).length > 2 && load()
  }, [userData])

  useEffect(() => {

    (userData && "audition" in userData && Object.keys(clubData).length > 0) && setAuditionList(<>
      {
        Object.keys(userData.audition).map((val) => {
          return <h1 key={val} className="py-4 px-4 border-t">{clubData[val].title}</h1>
        })
      }
    </>)
  }, [clubData, userData])

  useEffect(() => {
    apply()
  }, [sortMode, clubData, width])

  useEffect(() => {
    const escaped = searchContext.replace("ชมรม", "")
    if (escaped !== "") {
      const searchResult = searchKeyword(rawSorted, escaped)
      setSortedData(sliceArr(searchResult, width))
    } else {
      setSortedData(sliceArr(rawSorted, width))
    }
  }, [searchContext, rawSorted])

  const clearState = () => {
    setModalState({open: false, data: {}})
  }

  const selectClub = () => {
    setSelect(true)
  }


  return (
    <PageContainer>
      <Loader display={loader}/>
      <ConfirmModal onAgree={() => {
        setDataModal(true)
      }} clubData={modalState} TriggerDep={{
        dep: select, revert: () => {
          setSelect(false)
        }
      }}/>
      <ClubModal state={modalState} userData={userData} closeAction={clearState} action={selectClub} thumbPaths={thumbPaths}/>
      <DataModal setLoader={setLoader} state={modalState} refetcher={reFetch} closeFunc={clearState}
                 TriggerDep={{
                   dep: dataModal, revert: () => {
                     setDataModal(false)
                   }
                 }}/>
      <div className="flex flex-col md:flex-row md:justify-center md:items-start md:space-x-6 items-center py-14 px-4">
        <div className="md:max-w-xs">
          <div className="flex flex-col items-center">
            <h1 className="font-medium text-4xl">เลือกชมรม</h1>
            <span className="text-sm tracking-tight">ภายในวันที่ 24 พ.ค. 64</span>
          </div>
          <div className="mt-6 w-full px-8">
            <SelectSplash/>
          </div>
          <div className="space-y-6 mt-10 px-2">
            {(userData && !isEmpty(userData.audition)) &&
            <div className="flex flex-col rounded-lg shadow-md bg-white p-4 py-6 space-y-4">
                <h1 className="text-lg font-medium tracking-tight">คุณได้ลงชื่อ Audition
                                                                   ชมรมไว้</h1>
                <p className="text-gray-600 tracking-tight">ให้ไปทำการ Audition
                                                            ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด โดยติดตามรายละเอียดการ Audition
                                                            จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง
                                                            และรอการประกาศผลในวันที่ 25 พ.ค. 2564 เวลา 8.00 น.</p>
                <div className="md:hidden relative">
                    <a ref={auTrigger}
                       className="text-TUCMC-pink-500 tracking-tight cursor-pointer">ดูรายชื่อชมรมที่ลงชื่อ
                                                                                     Audition ไว้ →</a>
                    <Modal TriggerRef={auTrigger} CloseID="audiClose"
                           className="shadow-md rounded-lg absolute w-full mt-1 z-20">
                        <div
                            className="flex items-start rounded-t-lg text-sm justify-between bg-gray-50 text-gray-500 py-2 px-4">
                            <h1 className="mt-1">รายชื่อชมรมที่ลงชื่อ Audition ไว้</h1>
                            <XIcon id="audiClose"
                                   className="w-7 h-7 cursor-pointer text-TUCMC-gray-400"/>
                        </div>
                        <div className="bg-white rounded-b-lg">
                          {
                            auditionList
                          }
                        </div>
                    </Modal>
                </div>
            </div>}
            {(userData && !isEmpty(userData.audition)) &&
            <div className="hidden md:block shadow-md rounded-lg mt-1 z-20">
                <div
                    className="flex items-start rounded-t-lg text-sm justify-between bg-gray-50 text-gray-500 py-2 px-4">
                    <h1 className="mt-1">รายชื่อชมรมที่ลงชื่อ Audition ไว้</h1>
                </div>
                <div className="bg-white rounded-b-lg">
                  {
                    auditionList
                  }
                </div>
            </div>}
            <div onClick={() => {
              tracker.push("click", "testbutton")
            }}
                 className="flex flex-col items-start rounded-lg shadow-md bg-white p-4 py-6 space-y-4">
              <h1 className="text-lg font-medium tracking-tight">โควตายืนยันสิทธิ์ชมรมเดิม</h1>
              <p
                className="text-gray-600 tracking-tight">นักเรียนสามารถใช้โควตายืนยันสิทธิ์ชมรมเดิมได้ทันที
                                                         (ชมรม...) *โควตามีจำนวนจำกัด</p>
              <a
                className="bg-TUCMC-green-400 text-white whitespace-nowrap rounded-3xl shadow-md px-5 py-2.5">ยืนยันสิทธิ์ชมรมเดิม</a>
            </div>
          </div>
        </div>
        <div style={width > 768 ? {width: width - 376, maxWidth: 952} : {}}
             className="mt-16 md:mt-0">
          <div className="border-b pb-5 mx-4">
            <div>
              <FilterSearch setSearchContext={setSearchContext} sortMode={sortMode}
                            setSortMode={setSortMode}/>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
            <div className="space-y-2 md:w-1/2">
              {
                sortedData[0]?.map((val) => {
                  return <ClubList key={val.clubID} data={val} action={setModalState}/>
                })
              }
            </div>
            <div className="mt-2 md:mt-0 space-y-2 md:w-1/2">
              {
                sortedData[1]?.map((val) => {
                  return <ClubList key={val.clubID} data={val} action={setModalState}/>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Select