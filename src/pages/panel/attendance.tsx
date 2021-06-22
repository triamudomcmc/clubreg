import PageContainer from "@components/common/PageContainer";
import {AnimatePresence} from "framer-motion";
import classnames from "classnames";
import {clubMap} from "@config/clubMap";
import Modal from "@components/common/Modals";
import {Button} from "@components/common/Inputs/Button";
import {isEmpty, searchKeyword, sortNumber, sortThaiDictionary} from "@utilities/object";
import {CatLoader} from "@components/common/CatLoader";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {
  ArrowCircleDownIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CloudIcon,
  PaperClipIcon,
  PlusCircleIcon,
  RefreshIcon,
  XCircleIcon
} from "@heroicons/react/solid";
import {XCircleIcon as XOutline} from "@heroicons/react/outline";
import {FilterSearch} from "@components/common/Inputs/Search";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {fetchFiles, getFileTempURL} from "@client/fetcher/files";
import {request} from "@client/utilities/request";
import {fetchMembers} from "@client/fetcher/panel";
import {useToast} from "@components/common/Toast/ToastContext";
import {PendingElement} from "@components/panel/element/PendingElement";
import {CheckElement} from "@components/panel/element/CheckElement";
import {isNumeric} from "@utilities/texts";
import {Ellipsis} from "@vectors/Loaders/Ellipsis";
import {fetchChecks, submitChecks} from "@client/fetcher/checks";
import {getPrevMonday} from "@config/time";

const fetchFilesData = async (fileUpdate, panelID, addToast, reFetch) => {
  const data = await fetchFiles(panelID)
  if (data["status"]) {
    fileUpdate(data["data"].sort((a, b) => (a.timestamp - b.timestamp)))
  }else{
    switch (data["report"]) {
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

const fetchMemberData = async (panelID: string, setMemberData: Dispatch<SetStateAction<{}>>, setToast, reFetch, setInitMem) => {
  const data = await fetchMembers(panelID, false)

  if (data.status) {
    setMemberData(data.data.filter(i => (i.level !== "9")))
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

const fetchCheckData = async (panelID: string, setCheckData, addToast, reFetch, setInit) => {
  const data = await fetchChecks(panelID)
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

const Attendance = () => {

  const {onReady, reFetch} = useAuth()
  const [initClub, setInitClub] = useState(false)
  const [files, setFiles] = useState([])
  const uploader = useRef(null)
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [initmember, setInitMember] = useState(false)
  const [accept, setAccept] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState({})
  const [memberData, setMemberData] = useState([])
  const {addToast} = useToast()
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [del, setDel] = useState([])
  const [pending ,setPending] = useState(false)
  const [checkData, setCheckData] = useState({})
  const [previewURL, setPreviewURL] = useState("")
  const [openPre, setOpenPre] = useState(false)
  const [previewName, setPreviewName] = useState("")

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")

    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/account");
    }

    return userData
  })

  const applySort = () => {

    const data = memberData || []

    switch (sortMode) {
      case "ascending": {
        const sorted = sortThaiDictionary( data, obj => (obj.firstname))
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
  },[sortMode, memberData])

  useEffect(() => {
    const escaped = searchContext.replace(/ /g,"")
    if (escaped !== "") {
      let searchResult;

      if(isNumeric(escaped)){
        searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.student_id))
      }else{
        searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.firstname + obj.lastname))
      }

      setSortedData(searchResult)
    } else {
      setSortedData(rawSorted)
    }
  }, [searchContext, rawSorted])

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const res = await request("uploader","uploadFile", {panelID: currentID, file: filename})

    const { url, fields } = res.data
    const formData = new FormData();

    setFiles(prev => ([...prev, {filename: file.name, loading: true}]))

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      mode: "cors",
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      refetch()
    } else {
      console.error('Upload failed.');
    }
  };

  const refetch = () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    fetchFilesData(setFiles, currentID, addToast, reFetch)
    fetchCheckData(currentID, setCheckData, addToast, reFetch, setInitClub)
  }

  useEffect(() => {
    if (("panelID" in userData) && userData.panelID.length > 0) {
      refetch()
      const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
      fetchMemberData(currentID, setMemberData, addToast, reFetch, setInitMember)
    }
  }, [userData])

  const deleteID = async (id) => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const req = await request("database/files","deleteFile",{panelID: currentID, id: id})

    setDel(prevState => ([...prevState, id]))

    if (req.status) {
      refetch()
    }
  }

  const allpass = () => {
    let obj = {}
    memberData.forEach(item => {
      obj[item.student_id] = {action: "passed"}
    })
    setPendingUpdate(obj)
  }

  const allfailed = () => {
    let obj = {}
    memberData.forEach(item => {
      obj[item.student_id] = {action: "failed"}
    })
    setPendingUpdate(obj)
  }

  useEffect(() => {
    if (!isEmpty(checkData)) {
      setPendingUpdate(checkData)
    }
  },[checkData])

  const submitCheck = async () => {
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

    if (Object.keys(pendingUpdate).length < memberData.length) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ข้อมูลที่จะอัพเดทไม่ถูกต้อง",
        text: "กรุณาเลือกสถานะให้สมาชิกทั้งหมดก่อนกดส่งข้อมูล"
      })
      setPending(false)
      return
    }

    const res = await submitChecks(currentID, pendingUpdate)
    if (res.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "อัพเดทข้อมูลสำเร็จแล้ว",
        text: "ข้อมูลที่ถูกส่งไป ได้รับการอัพเดทบนฐานข้อมูลแล้ว"
      })
    }else{
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

  const prevMonday = new Date(getPrevMonday())
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
      12: "ธันวาคม"
  }

  const previewFile = async (fileID, filename) => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const response = await getFileTempURL(fileID, currentID)

    if (response.status) {
      setPreviewName(filename)
      setPreviewURL(response.data.url)
      setOpenPre(true)
    }else{
      switch (response.report) {
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

  return (
    <PageContainer hide={!initClub}>
      <AnimatePresence>
        <div className={classnames("min-h-screen", !initClub && "opacity-0")}>
          <Modal className="relative w-[80vw]" closeClickOutside={true} CloseID="closePreview" TriggerDep={{dep: openPre, revert: () => {setOpenPre(false)}}} overlayClassName="fixed top-0 left-0 min-w-screen min-h-screen w-full bg-gray-700 bg-opacity-50 z-60 flex justify-center items-center">
            <div className="absolute right-[-14px] top-[-20px]">
              <XOutline id="closePreview" className="w-6 h-6 text-white cursor-pointer"/>
            </div>
            <div className="px-2">
              <img src={previewURL}/>
            </div>
          </Modal>
          <div className="relative pt-10 pb-14 bg-TUCMC-gray-100">
            <h1 className="text-4xl text-center text-TUCMC-gray-900">รายงาน</h1>
            <div className="absolute w-full px-4 -bottom-5">
              <div className="relative max-w-md mx-auto rounded-lg bg-white shadow-sm border border-gray-300 flex justify-center">
                <div className="flex justify-end w-full h-full rounded-lg bg-TUCMC-gray-700">
                  <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                    <span
                      className="text-white whitespace-nowrap">วันจันทร์ที่ {prevMonday.getDate()} {month[prevMonday.getMonth() + 1]} {prevMonday.getFullYear() + 543}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14 pb-10 px-4 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h1 className="text-gray-500">ภาพหลักฐานการจัดการเรียนการสอนชมรม</h1>
              <div className="flex flex-col rounded-lg border border-gray-200">
                {files.map((item, index) => {
                  if (index == 0) {
                    return<div className="flex justify-between py-3 px-4">
                      <div className="flex justify-between space-x-3 flex-shrink">
                        <PaperClipIcon className="w-6 h-6 text-gray-400"/>
                        <h1 onClick={() => {previewFile(item.id, item.filename)}} className="text-gray-900 text-[16px] truncate w-[70vw] max-w-[770px] cursor-pointer hover:underline">
                          {item.filename}
                        </h1>
                      </div>
                      <div className="flex items-center">
                        {item.loading ? <CloudIcon className="text-TUCMC-gray-500 animate-pulse w-5 h-5"/> : del.includes(item.id) ? <RefreshIcon className="text-TUCMC-gray-400 animate-spin h-5 w-5"/> : <span onClick={() => {deleteID(item.id)}} className="text-TUCMC-gray-400 cursor-pointer">ลบ</span>}
                      </div>
                    </div>
                  }else{
                    return <div className="flex justify-between py-3 px-4 border-t border-gray-200">
                      <div className="flex justify-between space-x-3">
                        <PaperClipIcon className="w-6 h-6 text-gray-400"/>
                        <h1 onClick={() => {previewFile(item.id, item.filename)}} className="text-gray-900 text-[16px] truncate w-[70vw] max-w-[770px] cursor-pointer hover:underline">
                          {item.filename}
                        </h1>
                      </div>
                      <div className="flex items-center">
                        {item.loading ? <CloudIcon className="text-TUCMC-gray-500 animate-pulse w-5 h-5"/> : del.includes(item.id) ? <RefreshIcon className="text-TUCMC-gray-400 animate-spin h-5 w-5"/> : <span onClick={() => {deleteID(item.id)}} className="text-TUCMC-gray-400 cursor-pointer">ลบ</span>}
                      </div>
                    </div>
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
                <Button onClick={() => {uploader.current.click()}} className="border border-gray-200 flex items-center w-full justify-center space-x-1 py-3 text-TUCMC-gray-600 rounded-md mt-3">
                  <PlusCircleIcon className="w-[1.1rem] h-[1.1rem]"/>
                  <span>เพิ่มไฟล์</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 w-full"></div>
          <div className="px-4 max-w-6xl mx-auto">
            <h1 className="text-center text-xl text-TUCMC-gray-900 my-10">เช็กชื่อ</h1>
            <div className="space-y-2 max-w-lg mx-auto">
              <div className="flex space-x-2">
                <div onClick={() => {allpass()}} className="flex border border-gray-200 rounded-md py-2 space-x-1 items-center w-1/2 justify-center cursor-pointer">
                  <CheckCircleIcon className="w-5 h-5 text-TUCMC-green-400"/>
                  <h1 className="text-TUCMC-gray-900">มาทั้งหมด</h1>
                </div>
                <div onClick={() => {allfailed()}} className="flex border border-gray-200 rounded-md py-2 space-x-1 items-center w-1/2 justify-center cursor-pointer">
                  <XCircleIcon className="w-5 h-5 text-TUCMC-red-400"/>
                  <h1 className="text-TUCMC-gray-900">ขาดทั้งหมด</h1>
                </div>
              </div>
              <div>
                <FilterSearch normal={false} sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
              </div>
            </div>
            <div className="space-y-2 py-8 mb-6">
              {
                sortedData.length > 0 ? sortedData.map((item, index) => {
                  return <CheckElement key={`pending-${item.student_id}`} userData={item} pendingUpdate={pendingUpdate}
                                         setPendingUpdate={setPendingUpdate}/>
                }) : <h1 className="text-center mt-20 mb-20 text-TUCMC-gray-600">ขณะนี้ไม่มีรายชื่อที่รอคำตอบรับ</h1>
              }
            </div>
            <div className="flex justify-between items-center mb-20 space-x-10">
              <div className="flex flex-row">
                <input className="w-6 h-6 border rounded-md border-gray-200 ring-0 mr-2"
                       onChange={(e) => {setAccept(e.target.checked)}}
                       type="checkbox" required/>
                <span className="text-gray-700">ข้อมูลทั้งหมดได้รับการตรวจสอบจากครูที่ปรึกษาแล้ว</span>
              </div>
              <Button disabled={pending} onClick={!pending && submitCheck} className={classnames("px-10 text-white rounded-full bg-TUCMC-pink-400", !pending ? "py-3" : "py-[8px] cursor-default")}>
                <span className={classnames(pending && "hidden")}>ยืนยัน</span>
                <Ellipsis className={classnames("w-[2.4rem] h-8", !pending && "hidden")}/>
              </Button>
            </div>
          </div>
        </div>
        {!initClub && <CatLoader key="cat"/>}
      </AnimatePresence>
    </PageContainer>
  )
}

export default Attendance