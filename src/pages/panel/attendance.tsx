import PageContainer from "@components/common/PageContainer"
import { AnimatePresence } from "framer-motion"
import classnames from "classnames"
import { clubMap } from "@config/clubMap"
import Modal from "@components/common/Modals"
import { Button } from "@components/common/Inputs/Button"
import { isEmpty, searchKeyword, sortNumber, sortThaiDictionary } from "@utilities/object"
import { CatLoader } from "@components/common/CatLoader"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import {
  ArrowCircleDownIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CloudIcon,
  ExclamationIcon,
  PaperClipIcon,
  PlusCircleIcon,
  RefreshIcon,
  XCircleIcon,
} from "@heroicons/react/solid"
import { XCircleIcon as XOutline } from "@heroicons/react/outline"
import { FilterSearch } from "@components/common/Inputs/Search"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { fetchFiles, getFileTempURL } from "@client/fetcher/files"
import { request } from "@client/utilities/request"
import { fetchMembers } from "@client/fetcher/panel"
import { useToast } from "@components/common/Toast/ToastContext"
import { PendingElement } from "@components/panel/element/PendingElement"
import { CheckElement } from "@components/panel/element/CheckElement"
import { isNumeric } from "@utilities/texts"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"
import { fetchChecks, submitChecks } from "@client/fetcher/checks"
import { getPrevMonday } from "@config/time"
import { convertMiliseconds } from "@utilities/timers"

const fetchFilesData = async (fileUpdate, panelID, addToast, reFetch, query) => {
  const data = await fetchFiles(panelID, query.access || undefined)
  if (data["status"]) {
    fileUpdate(data["data"].sort((a, b) => a.timestamp - b.timestamp))
  } else {
    switch (data["report"]) {
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
    }
  }
}

const fetchMemberData = async (
  panelID: string,
  setMemberData: Dispatch<SetStateAction<{}>>,
  setToast,
  reFetch,
  setInitMem
) => {
  const data = await fetchMembers(panelID, false)

  if (data.status) {
    setMemberData(data.data.filter((i) => i.level !== "9"))
    setTimeout(() => {
      setInitMem(true)
    }, 1000)
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

const fetchCheckData = async (panelID: string, setCheckData, addToast, reFetch, setInit, query) => {
  const data = await fetchChecks(panelID, query.access || undefined)
  if (data.status) {
    setCheckData(data.data)
    setInit(true)
  } else {
    switch (data.report) {
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
    }
  }
}

const Attendance = ({ query }) => {
  const { onReady, reFetch } = useAuth()
  const [initClub, setInitClub] = useState(false)
  const [files, setFiles] = useState([])
  const uploader = useRef(null)
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [initmember, setInitMember] = useState(false)
  const [accept, setAccept] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState({})
  const [memberData, setMemberData] = useState([])
  const { addToast } = useToast()
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [del, setDel] = useState([])
  const [pending, setPending] = useState(false)
  const [checkData, setCheckData] = useState({})
  const [previewURL, setPreviewURL] = useState("")
  const [openPre, setOpenPre] = useState(false)
  const [previewName, setPreviewName] = useState("")

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")

    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/account")
    }

    return userData
  })

  const applySort = () => {
    const data = memberData || []

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
  }, [sortMode, memberData])

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

  const uploadPhoto = async (e) => {
    const file = e.target.files[0]
    const filename = encodeURIComponent(file.name)
    const currentID = query.route || localStorage.getItem("currentPanel") || userData.panelID[0]
    const res = await request("uploader", "uploadFile", { panelID: currentID, file: filename })

    const { url, fields } = res.data
    const formData = new FormData()

    setFiles((prev) => [...prev, { filename: file.name, loading: true }])

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value)
    })

    const upload = await fetch(url, {
      mode: "cors",
      method: "POST",
      body: formData,
    })

    if (upload.ok) {
      refetch()
    } else {
      console.error("Upload failed.")
    }
  }

  const refetch = () => {
    const currentID = query.route || localStorage.getItem("currentPanel") || userData.panelID[0]
    fetchFilesData(setFiles, currentID, addToast, reFetch, query)
    fetchCheckData(currentID, setCheckData, addToast, reFetch, setInitClub, query)
  }

  useEffect(() => {
    if ("panelID" in userData && userData.panelID.length > 0) {
      refetch()
      const currentID = query.route || localStorage.getItem("currentPanel") || userData.panelID[0]
      fetchMemberData(currentID, setMemberData, addToast, reFetch, setInitMember)
    }
  }, [userData])

  const deleteID = async (id) => {
    const currentID = query.route || localStorage.getItem("currentPanel") || userData.panelID[0]
    const req = await request("database/files", "deleteFile", { panelID: currentID, id: id })

    setDel((prevState) => [...prevState, id])

    if (req.status) {
      refetch()
    }
  }

  const allpass = () => {
    let obj = {}
    memberData.forEach((item) => {
      obj[item.student_id] = { action: "passed" }
    })
    setPendingUpdate(obj)
  }

  const allfailed = () => {
    let obj = {}
    memberData.forEach((item) => {
      obj[item.student_id] = { action: "failed" }
    })
    setPendingUpdate(obj)
  }

  useEffect(() => {
    if (!isEmpty(checkData)) {
      setPendingUpdate(checkData)
    }
  }, [checkData])

  const submitCheck = async () => {
    const currentID = query.route || localStorage.getItem("currentPanel") || userData.panelID[0]
    setPending(true)

    if (!accept) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "กรุณากดยืนยันว่าข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้ว",
        text: "กรุณากดยืนยันว่าข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้วทุกครั้งก่อนส่งข้อมูล",
      })
      setPending(false)
      return
    }

    if (Object.keys(pendingUpdate).length < memberData.length) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ข้อมูลที่จะอัปเดทไม่ถูกต้อง",
        text: "กรุณาเลือกสถานะให้สมาชิกทั้งหมดก่อนกดส่งข้อมูล",
      })
      setPending(false)
      return
    }

    const res = await submitChecks(currentID, pendingUpdate, query.access || undefined)
    if (res.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "อัปเดทข้อมูลสำเร็จแล้ว",
        text: "ข้อมูลที่ถูกส่งไป ได้รับการอัปเดทบนฐานข้อมูลแล้ว",
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
      }
    }
    setPending(false)
  }

  const prevMonday = new Date(parseInt(query.targetTime) || getPrevMonday())
  const month = {
    1: "มกราคม",
    2: "กุมภาพันธ์",
    3: "มีนาคม",
    4: "เมษายน",
    5: "พฤษภาคม",
    6: "มิถุนายน",
    7: "กรกฎาคม",
    8: "สิงหาคม",
    9: "กันยายน",
    10: "ตุลาคม",
    11: "พฤศจิกายน",
    12: "ธันวาคม",
  }

  const previewFile = async (fileID, filename) => {
    const currentID = query.route || localStorage.getItem("currentPanel") || userData.panelID[0]
    const response = await getFileTempURL(fileID, currentID)

    if (response.status) {
      setPreviewName(filename)
      setPreviewURL(response.data.url)
      setOpenPre(true)
    } else {
      switch (response.report) {
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
      }
    }
  }

  const [cd, setCd] = useState({ h: 0, m: 0 })
  const [redirect, setRedirect] = useState(5)

  useEffect(() => {
    if (query.expire) {
      if (query.expire > new Date().getTime()) {
        setInterval(() => {
          const ts = query.expire - new Date().getTime()
          const t = convertMiliseconds(ts)
          setCd({
            m: t.m,
            h: t.h,
          })
        }, 1000)
      } else {
        setInterval(() => {
          setRedirect((prevState) => prevState - 1)
        }, 1000)
      }
    }
  }, [query])

  useEffect(() => {
    if (redirect <= 0) {
      Router.push("/panel")
    }
  }, [redirect])

  return (
    <PageContainer hide={!initClub}>
      {query.access && query.route && query.targetTime && (
        <div className="fixed top-0 left-[50vw] z-[100] mx-auto ml-[-137px]">
          <div className="flex items-center space-x-2 rounded-md bg-TUCMC-red-600 py-2 pl-4 pr-6 shadow-md">
            {query.expire > new Date().getTime() ? (
              <ExclamationIcon className="mt-2 h-10 w-10 animate-pulse text-white" />
            ) : (
              <XCircleIcon className="h-10 w-10 animate-pulse text-white" />
            )}
            {query.expire > new Date().getTime() ? (
              <div>
                <div className="flex items-center space-x-2 font-medium text-white">
                  <h1>คุณกำลังแก้ไขข้อมูลย้อนหลัง</h1>
                </div>
                <div className="flex justify-center text-sm text-white">
                  <p>
                    ลิงก์จะหมดอายุใน <span className="animate-pulse">{cd.h}</span> ชม.{" "}
                    <span className="animate-pulse">{cd.m}</span> นาที
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 font-medium text-white">
                  <h1>ลิงก์นี้ได้หมดอายุไปแล้ว</h1>
                </div>
                <div className="flex justify-center text-sm text-white">
                  <p>
                    ระบบจะนำคุณกลับในอีก <span className="animate-pulse">{redirect}</span> วินาที
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <AnimatePresence>
        <div className={classnames("min-h-screen", !initClub && "opacity-0")}>
          <Modal
            className="relative w-[80vw]"
            closeClickOutside={true}
            CloseID="closePreview"
            TriggerDep={{
              dep: openPre,
              revert: () => {
                setOpenPre(false)
              },
            }}
            overlayClassName="fixed top-0 left-0 min-w-screen min-h-screen w-full bg-gray-700 bg-opacity-50 z-60 flex justify-center items-center"
          >
            <div className="absolute right-[-14px] top-[-20px]">
              <XOutline id="closePreview" className="h-6 w-6 cursor-pointer text-white" />
            </div>
            <div className="px-2">
              <img src={previewURL} />
            </div>
          </Modal>
          <div className="relative bg-TUCMC-gray-100 pt-10 pb-14">
            <h1 className="text-center text-4xl text-TUCMC-gray-900">รายงาน</h1>
            <div className="absolute -bottom-5 w-full px-4">
              <div className="relative mx-auto flex max-w-md justify-center rounded-lg border border-gray-300 bg-white shadow-sm">
                <div className="flex h-full w-full justify-end rounded-lg bg-TUCMC-gray-700">
                  <div className="flex w-full justify-center overflow-hidden overflow-clip py-[0.54rem]">
                    <span className="whitespace-nowrap text-white">
                      วันจันทร์ที่ {prevMonday.getDate()} {month[prevMonday.getMonth() + 1]}{" "}
                      {prevMonday.getFullYear() + 543}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-4xl px-4 pt-14 pb-10">
            <div className="space-y-1">
              <h1 className="text-gray-500">ภาพหลักฐานการจัดการเรียนการสอนชมรม</h1>
              <div className="flex flex-col rounded-lg border border-gray-200">
                {files.map((item, index) => {
                  if (index == 0) {
                    return (
                      <div className="flex justify-between py-3 px-4">
                        <div className="flex flex-shrink justify-between space-x-3">
                          <PaperClipIcon className="h-6 w-6 text-gray-400" />
                          <h1
                            onClick={() => {
                              previewFile(item.id, item.filename)
                            }}
                            className="w-[70vw] max-w-[770px] cursor-pointer truncate text-[16px] text-gray-900 hover:underline"
                          >
                            {item.filename}
                          </h1>
                        </div>
                        <div className="flex items-center">
                          {item.loading ? (
                            <CloudIcon className="h-5 w-5 animate-pulse text-TUCMC-gray-500" />
                          ) : del.includes(item.id) ? (
                            <RefreshIcon className="h-5 w-5 animate-spin text-TUCMC-gray-400" />
                          ) : (
                            <span
                              onClick={() => {
                                deleteID(item.id)
                              }}
                              className="cursor-pointer text-TUCMC-gray-400"
                            >
                              ลบ
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className="flex justify-between border-t border-gray-200 py-3 px-4">
                        <div className="flex justify-between space-x-3">
                          <PaperClipIcon className="h-6 w-6 text-gray-400" />
                          <h1
                            onClick={() => {
                              previewFile(item.id, item.filename)
                            }}
                            className="w-[70vw] max-w-[770px] cursor-pointer truncate text-[16px] text-gray-900 hover:underline"
                          >
                            {item.filename}
                          </h1>
                        </div>
                        <div className="flex items-center">
                          {item.loading ? (
                            <CloudIcon className="h-5 w-5 animate-pulse text-TUCMC-gray-500" />
                          ) : del.includes(item.id) ? (
                            <RefreshIcon className="h-5 w-5 animate-spin text-TUCMC-gray-400" />
                          ) : (
                            <span
                              onClick={() => {
                                deleteID(item.id)
                              }}
                              className="cursor-pointer text-TUCMC-gray-400"
                            >
                              ลบ
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              <div>
                <input
                  className="hidden"
                  ref={uploader}
                  onChange={uploadPhoto}
                  type="file"
                  accept="image/png, image/jpeg, image/heif"
                />
                <Button
                  onClick={() => {
                    uploader.current.click()
                  }}
                  className="mt-3 flex w-full items-center justify-center space-x-1 rounded-md border border-gray-200 py-3 text-TUCMC-gray-600"
                >
                  <PlusCircleIcon className="h-[1.1rem] w-[1.1rem]" />
                  <span>เพิ่มไฟล์</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full border-b border-gray-200"></div>
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="my-10 text-center text-xl text-TUCMC-gray-900">เช็กชื่อ</h1>
            <div className="mx-auto max-w-lg space-y-2">
              <div className="flex space-x-2">
                <div
                  onClick={() => {
                    allpass()
                  }}
                  className="flex w-1/2 cursor-pointer items-center justify-center space-x-1 rounded-md border border-gray-200 py-2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-TUCMC-green-400" />
                  <h1 className="text-TUCMC-gray-900">มาทั้งหมด</h1>
                </div>
                <div
                  onClick={() => {
                    allfailed()
                  }}
                  className="flex w-1/2 cursor-pointer items-center justify-center space-x-1 rounded-md border border-gray-200 py-2"
                >
                  <XCircleIcon className="h-5 w-5 text-TUCMC-red-400" />
                  <h1 className="text-TUCMC-gray-900">ขาดทั้งหมด</h1>
                </div>
              </div>
              <div>
                <FilterSearch
                  normal={false}
                  sortMode={sortMode}
                  setSortMode={setSortMode}
                  setSearchContext={setSearchContext}
                />
              </div>
            </div>
            <div className="mb-6 space-y-2 py-8">
              {sortedData.length > 0 ? (
                sortedData.map((item, index) => {
                  return (
                    <CheckElement
                      key={`pending-${item.student_id}`}
                      userData={item}
                      pendingUpdate={pendingUpdate}
                      setPendingUpdate={setPendingUpdate}
                    />
                  )
                })
              ) : (
                <h1 className="mt-20 mb-20 text-center text-TUCMC-gray-600">ขณะนี้ไม่มีรายชื่อที่รอคำตอบรับ</h1>
              )}
            </div>
            <div className="mb-20 flex items-center justify-between space-x-10">
              <div className="flex flex-row">
                <input
                  className="mr-2 h-6 w-6 rounded-md border border-gray-200 ring-0"
                  onChange={(e) => {
                    setAccept(e.target.checked)
                  }}
                  type="checkbox"
                  required
                />
                <span className="text-gray-700">ข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้ว</span>
              </div>
              <Button
                disabled={pending}
                onClick={!pending && submitCheck}
                className={classnames(
                  "rounded-full bg-TUCMC-pink-400 px-10 text-white",
                  !pending ? "py-3" : "cursor-default py-[8px]"
                )}
              >
                <span className={classnames(pending && "hidden")}>ยืนยัน</span>
                <Ellipsis className={classnames("h-8 w-[2.4rem]", !pending && "hidden")} />
              </Button>
            </div>
          </div>
        </div>
        {!initClub && <CatLoader key="cat" />}
      </AnimatePresence>
    </PageContainer>
  )
}

Attendance.getInitialProps = ({ query }) => {
  return { query }
}

export default Attendance
