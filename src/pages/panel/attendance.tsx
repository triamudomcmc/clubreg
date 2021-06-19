import PageContainer from "@components/common/PageContainer";
import {AnimatePresence} from "framer-motion";
import classnames from "classnames";
import {clubMap} from "@config/clubMap";
import Modal from "@components/common/Modals";
import {Button} from "@components/common/Inputs/Button";
import {isEmpty} from "@utilities/object";
import {CatLoader} from "@components/common/CatLoader";
import {useEffect, useRef, useState} from "react";
import {CheckCircleIcon, PaperClipIcon, PlusCircleIcon, XCircleIcon} from "@heroicons/react/solid";
import {FilterSearch} from "@components/common/Inputs/Search";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {fetchFiles} from "@client/fetcher/files";
import {request} from "@client/utilities/request";

const fetchFilesData = async (fileUpdate, panelID) => {
  const data = await fetchFiles(panelID)
  if (data["status"]) {
    fileUpdate(data["data"])
  }
}

const Attendance = () => {

  const {onReady} = useAuth()
  const [initClub, setInitClub] = useState(true)
  const [files, setFiles] = useState([])
  const uploader = useRef(null)

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")

    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/account");
    }

    return userData
  })

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    const res = await request("uploader","uploadFile", {panelID: currentID, file: filename})

    const { url, fields } = res.data
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.error('Upload failed.');
    }

    refetch()
  };

  const refetch = () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    fetchFilesData(setFiles, currentID)
  }

  useEffect(() => {
    if (("panelID" in userData) && userData.panelID.length > 0) {
      refetch()
    }
  }, [userData])

  return (
    <PageContainer hide={!initClub}>
      <AnimatePresence>
        <div className={classnames("min-h-screen", !initClub && "opacity-0")}>
          <div className="relative pt-10 pb-14 bg-TUCMC-gray-100">
            <h1 className="text-4xl text-center text-TUCMC-gray-900">รายงาน</h1>
            <div className="absolute w-full px-4 -bottom-5">
              <div className="relative max-w-xl mx-auto rounded-lg bg-white shadow-sm border border-gray-300 flex justify-center">
                <div className="flex justify-end w-full h-full rounded-lg bg-TUCMC-gray-700">
                  <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                    <span
                      className="text-white whitespace-nowrap">วันจันทร์ที่ 21 มิถุนายน 2564</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14 pb-10 px-4 max-w-6xl mx-auto">
            <div className="space-y-1">
              <h1 className="text-gray-500">ภาพหลักฐานการจัดการเรียนการสอนชมรม</h1>
              <div className="flex flex-col rounded-lg border border-gray-200">
                {files.map((item, index) => {
                  if (index == 0) {
                    return<div className="flex justify-between py-3 px-4">
                      <div className="flex justify-between space-x-3">
                        <PaperClipIcon className="w-6 h-6 text-gray-400"/>
                        <h1 className="text-gray-900 text-[16px]">
                          {item.filename}
                        </h1>
                      </div>
                      <div>
                        <span className="text-TUCMC-gray-400">ลบ</span>
                      </div>
                    </div>
                  }else{
                    return <div className="flex justify-between py-3 px-4 border-t border-gray-200">
                      <div className="flex justify-between space-x-3">
                        <PaperClipIcon className="w-6 h-6 text-gray-400"/>
                        <h1 className="text-gray-900 text-[16px]">
                          {item.filename}
                        </h1>
                      </div>
                      <div>
                        <span className="text-TUCMC-gray-400">ลบ</span>
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
                  accept="image/png, image/jpeg"
                />
                <Button onClick={() => {uploader.current.click()}} className="border border-gray-200 flex items-center w-full justify-center space-x-1 py-3 text-TUCMC-gray-600 rounded-md mt-3">
                  <PlusCircleIcon className="w-[1.1rem] h-[1.1rem]"/>
                  <span>เพิ่มไฟล์</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 w-full"></div>
          <div className="px-4">
            <h1 className="text-center text-xl text-TUCMC-gray-900 my-10">เช็กชื่อ</h1>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Button className="flex border border-gray-200 rounded-md py-2.5 space-x-1 items-center w-1/2 justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-TUCMC-green-400"/>
                  <h1 className="text-TUCMC-gray-900">มาทั้งหมด</h1>
                </Button>
                <Button className="flex border border-gray-200 rounded-md py-2.5 space-x-1 items-center w-1/2 justify-center">
                  <XCircleIcon className="w-5 h-5 text-TUCMC-red-400"/>
                  <h1 className="text-TUCMC-gray-900">ขาดทั้งหมด</h1>
                </Button>
              </div>
              <FilterSearch normal={false}/>
            </div>
          </div>
        </div>
        {!initClub && <CatLoader key="cat"/>}
      </AnimatePresence>
    </PageContainer>
  )
}

export default Attendance