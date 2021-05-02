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

const sliceObj = (obj, partitions) => {
  const size = Object.keys(obj).length
  const partSize = Math.floor(size / partitions)
  let leftOver = size - (partSize * partitions)
  let result = []
  let initialPointer = 0
  for (let i = 0; i < partitions; i++) {
    let data = []
    const partSizeFinal = partSize + (leftOver > 0 ? 1 : 0)
    Object.keys(obj).slice(initialPointer, initialPointer + partSizeFinal).forEach(val => {
      data.push({
        clubID: val,
        ...obj[val]
      })
    })
    initialPointer += partSizeFinal
    result.push(data)
    leftOver -= 1
  }
  return result
}

const sortThaiDictionary = (arr: any, objAction: (obj: any) => string, inverted = false) => {
  return arr.sort((a, b) => a.title.localeCompare(b.title, 'th') * (inverted ? -1 : 1))
            .map((val) => {
              return val
            })
}

const blockContent = (dataObj) => {
  let newObj = {}
  Object.keys(dataObj).forEach(val => {
    if (!dataObj[val].audition) {
      newObj[val] = {...dataObj[val], blocked: true}
    } else {
      newObj[val] = dataObj[val]
    }
  })
  return newObj
}

const sortAudition = (arr: any, inverted = false) => {
  let top = [], bottom = []
  arr.forEach((val) => {
    if (val.audition === !inverted) return top.push(val)
    return bottom.push(val)
  })
  return [...top, ...bottom]
}

const searchKeyword = (arr: any, keyword: string) => {
  let top = [], bottom = []
  const keyLength = keyword.length
  arr.forEach((val) => {
    if (keyword === val.title.slice(0, keyLength)) return top.push(val)
    return bottom.push(val)
  })
  if (top.length < 1) {
    top = []
    bottom = []
    arr.forEach((val) => {
      if (val.title.includes(keyword)) return top.push(val)
      return bottom.push(val)
    })
  }
  return [...top, ...bottom]
}

const objToArr = (obj: any) => {
  return Object.keys(obj).map(key => {
    return {clubID: key, ...obj[key]}
  })
}

const sliceArr = (arr: Array<any>, screenWidth) => {
  const breakPoint = 768
  const halfSize = Math.floor(arr.length / 2)
  let odd = [], even = []
  arr.forEach((value, index) => {
    if ((index + 1) % 2 == 0) return even.push(value)
    return odd.push(value)
  })
  if (screenWidth <= breakPoint) return [arr.slice(0, halfSize), arr.slice(halfSize, arr.length)]
  return [odd, even]
}

const Select = () => {

  const {onReady, tracker, reFetch} = useAuth()
  const {width} = useWindowDimensions()

  const [modalState, setModalState] = useState({open: false, data: {}})
  const [select, setSelect] = useState(false)
  const [dataModal, setDataModal] = useState(false)
  const [toast, setToast] = useState({})
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
    load()
  }, [])

  useEffect(() => {
    userData && userData.audition !== {} && setClubData(blockContent(clubData))
  }, [userData])

  useEffect(() => {

    (userData && Object.keys(clubData).length > 0) && setAuditionList(<>
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
      <Toast newToast={toast}/>
      <ConfirmModal onAgree={() => {
        setDataModal(true)
      }} clubData={modalState} TriggerDep={{
        dep: select, revert: () => {
          setSelect(false)
        }
      }}/>
      <ClubModal state={modalState} closeAction={clearState} action={selectClub}/>
      <DataModal setLoader={setLoader} state={modalState} refetcher={reFetch} setToast={setToast} closeFunc={clearState}
                 TriggerDep={{
                   dep: dataModal, revert: () => {
                     setDataModal(false)
                   }
                 }}/>
      <div
        className="flex flex-col md:flex-row md:justify-center md:items-start md:space-x-6 items-center py-14 px-4">
        <div className="md:max-w-xs">
          <div className="flex flex-col items-center">
            <h1 className="font-medium text-4xl">เลือกชมรม</h1>
            <span className="text-sm tracking-tight">ภายในวันที่ 24 พ.ค. 64</span>
          </div>
          <div className="mt-6 w-full px-8">
            <SelectSplash/>
          </div>
          <div className="space-y-6 mt-10 px-2">
            {(userData && userData.audition !== {}) &&
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
            {(userData && userData.audition !== {}) &&
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
                  return <ClubList key={val.clubID} setToast={setToast} data={val} action={setModalState}/>
                })
              }
            </div>
            <div className="mt-2 md:mt-0 space-y-2 md:w-1/2">
              {
                sortedData[1]?.map((val) => {
                  return <ClubList key={val.clubID} setToast={setToast} data={val} action={setModalState}/>
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