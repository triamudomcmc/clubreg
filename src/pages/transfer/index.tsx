import { useAuth } from "@client/auth"
import Router from "next/router"
import PageContainer from "@components/common/PageContainer"
import { useEffect, useState } from "react"
import { loadTransferStatusBridge } from "@init/transfer"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { ChevronDoubleDownIcon, ExclamationIcon } from "@heroicons/react/solid"
import { clubMap } from "@config/clubMap"
import { PuzzleIcon } from "@heroicons/react/outline"
import { useToast } from "@components/common/Toast/ToastContext"

const Transfer = () => {
  const { onReady } = useAuth()

  const [traD, setTraD] = useState([])
  const [panel, setPanel] = useState("")

  const userData = onReady((logged, userData) => {
    if (logged) {
      if (!userData.panelID) {
        Router.push("/")
      }
      return userData
    } else {
      Router.push("/auth")
    }
  })

  const load = async () => {
    let currPanel = localStorage.getItem("currentPanel") || userData.panelID[0]
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get()
    const res = await loadTransferStatusBridge.call({ panelID: currPanel, fp: fingerPrint.visitorId })
    if (res.status) {
      setTraD(res.data)
    }
  }

  useEffect(() => {
    setPanel(localStorage.getItem("currentPanel") || userData.panelID[0])

    if (userData?.panelID) {
      load()
    }
  }, [userData])

  return (
    <PageContainer>
      <div className="flex min-h-screen flex-col items-center py-6 px-4">
        {traD.length > 0 && (
          <div>
            <h1 className="text-TUCMc-gray-800 text-xl font-semibold">สถานะคำขอโอนสิทธิ์</h1>
            <h1 className="text-TUCMc-gray-800 mb-6 text-xl font-semibold">ผู้เข้าถึงแผงควบคุม</h1>
          </div>
        )}
        {traD.map((item) => {
          return (
            <div className="max-w-lg space-y-3 rounded-lg bg-white py-3 px-6 pt-4 text-TUCMC-gray-900 shadow-lg">
              <div className="flex items-center justify-between space-x-2">
                <h1 className="text-lg font-medium">ชมรม{clubMap[item.club]}</h1>
                <h1 className="text-sm">
                  สถานะ:{" "}
                  {item.status === "waiting" ? (
                    <span className="font-medium text-yellow-500">รอการตอบรับ</span>
                  ) : item.status === "accept" ? (
                    <span className="font-medium text-green-500">โอนย้ายสำเร็จ</span>
                  ) : (
                    <span className="font-medium text-red-500">คำขอถูกปฏิเสธ</span>
                  )}
                </h1>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col justify-center rounded-md bg-[#1f2937] py-4 px-4">
                  <div className="mx-auto">
                    <span className="font-medium text-gray-300">
                      <span className="font-semibold text-white">ผู้ขอ:</span> {item.data.from.title}
                      {item.data.from.firstname} {item.data.from.lastname} ห้อง {item.data.from.room} เลขที่{" "}
                      {item.data.from.number}
                    </span>
                    <ChevronDoubleDownIcon className="my-1 mx-auto h-6 w-6 animate-pulse text-red-600" />
                    <span className="font-medium text-gray-300">
                      <span className="font-semibold text-white">โอนให้:</span> {item.data.to.title}
                      {item.data.to.firstname} {item.data.to.lastname} ห้อง {item.data.to.room} เลขที่{" "}
                      {item.data.to.number}
                    </span>
                  </div>
                </div>
                <p className="rounded-md border border-TUCMC-orange-500 bg-TUCMC-orange-100 py-2 px-4 text-TUCMC-gray-700">
                  <span className="font-medium text-TUCMC-gray-900">เหตุผล:</span> {item.data.reason}
                </p>
                <div className="flex justify-end space-x-2"></div>
              </div>
            </div>
          )
        })}
        {traD.length === 0 && (
          <div className="my-auto px-4">
            <PuzzleIcon className="mx-auto h-36 w-36 text-TUCMC-gray-900" />
            <p className="rounded-md py-2 px-2 text-center text-TUCMC-gray-900">
              ขณะนี้ชมรม{clubMap[panel]} ไม่ได้มีคำขอโอนสิทธิ์การเข้าถึงแผงควบคุม
              <br />
              หากคุณต้องการโอนสิทธิ์การเข้าถึงแผงควบคุมให้แก่ผู้อื่นกรุณาติดต่อ กช. เพื่อขอดำเนินการ
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export default Transfer
