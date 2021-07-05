import PageContainer from "@components/common/PageContainer";
import {CheckIcon, QrcodeIcon} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {getTrackingHistory, query as doQuery} from "@client/admin/query";
import {Button} from "@components/common/Inputs/Button";
import classnames from "classnames";
import {Ellipsis} from "@vectors/Loaders/Ellipsis";
import {isNumeric} from "@utilities/texts";
import {useToast} from "@components/common/Toast/ToastContext";
import {addZero} from "@utilities/timers";
import Modal from "@components/common/Modals";
import dynamic from "next/dynamic";
import {useAuth} from "@client/auth";
import Router from "next/router";

const fetchTrackingHistory = async (id, setHistory) => {
  const res = await getTrackingHistory(id)
  if (res.status) {
    setHistory(res.data)
  }
}

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Tracker = () => {

  const {addToast} = useToast()
  const [history, setHistory] = useState([])
  const [query, setQuery] = useState("")
  const [sorted, setSorted] = useState([])
  const [scanner, setScanner] = useState(false)
  const [isValid, setValidity] = useState(false)
  const [querying, setQuerying] = useState(false)

  const {onReady, reFetch} = useAuth()

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
    return userData
  })

  const handleScan = (data) => {
    if (data.length == 20) {
      setQuery(data)
    }
  }

  const clearQuery = () => {

  }

  const performQuery = async () => {
    if (isValid) {
      setQuerying(true)
      await fetchTrackingHistory(query, setHistory)
    }else{
      addToast({
        theme: "modern",
        icon: "cross",
        title: "Unable to execute requested field operation",
        text: "Please check your query syntax before submit the request."
      })
    }

    setQuerying(false)
  }

  useEffect(() => {
    if (query.length == 5 || query.length == 20) {
      if (query.length == 5 && !isNumeric(query)){
        setValidity(false)
      }else{
        setValidity(true)
      }
    }else{
      setValidity(false)
    }
  }, [query])

  useEffect(() => {
    setSorted(history.sort((a, b) => (parseInt(b.timestamp) - parseInt(a.timestamp))))
  },[history])

  let QrReader = dynamic(() => import('modern-react-qr-reader'),{ ssr: false })

  useEffect(() => {
    if (scanner) {
      QrReader = dynamic(() => import('modern-react-qr-reader'),{ ssr: false })
    }
  },[scanner])

  return (
    <PageContainer>
      <Modal overlayClassName="fixed w-screen min-h-screen top-0 left-0 bg-TUCMC-gray-600 bg-opacity-50 flex items-center justify-center" className="bg-white rounded-md p-4" TriggerDep={{dep: scanner, revert: () => {setScanner(false)}}}>
        <div className="w-[400px] height-[600px] mx-8 max-w-sm border border-TUCMC-gray-600">
          {scanner && <QrReader
            // @ts-ignore
              delay={300}
              facingMode="environment"
              showViewFinder={false}
              onScan={handleScan}
              style={{width: "100%"}}
          />}
        </div>
      </Modal>

      {userData.safeMode ?
      <div className="py-10 px-4 min-h-screen max-w-[520px] mx-auto">
        <h1 className="text-center font-medium text-xl">Tracker</h1>
        <div className="space-y-2">
          <div>
            <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
              Identifiers
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="iden"
                id="iden"
                value={query}
                onChange={e => {setQuery(e.target.value)}}
                autoComplete="false"
                className="focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-full pr-10 border-gray-300 rounded-md"
                placeholder="UserID or Student ID"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-[20]">
                <QrcodeIcon onClick={() => {setScanner(true)}} className="h-6 w-6 text-gray-400" aria-hidden="true"/>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="flex space-x-2 items-center">
                <div className={classnames("rounded-md text-white", isValid ? "bg-TUCMC-green-400" : "bg-TUCMC-red-400")}>
                  <CheckIcon className="w-5 h-5"/>
                </div>
                <span
                  className={classnames(isValid ? "text-TUCMC-green-500" : "text-TUCMC-red-500")}>{isValid ? "Valid Query" : "Invalid Query"}</span>
              </div>
            </div>
            <div className="space-x-2 flex items-center">
              <Button onClick={clearQuery} className="bg-white border border-gray-300 rounded-md px-4 py-1">
                Clear
              </Button>
              <Button onClick={performQuery} disabled={querying} className="bg-white border border-gray-300 rounded-md px-4 py-1">
                <span className={classnames(querying && "hidden")}>Query</span>
                <Ellipsis className={classnames("w-[2.4rem] h-6", !querying && "hidden")} inverted={true}/>
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-10">
          {history.map(item => {
            const date = new Date(item.timestamp)
            return <div className="flex justify-between rounded-md shadow-md">
              <div className="pl-4 py-4">
                <h1>Timestamp: <span className="text-TUCMC-gray-600">{date.getDate()} {months[date.getMonth()]} {date.getFullYear()} {addZero(date.getHours())}:{addZero(date.getMinutes())}:{addZero(date.getSeconds())}</span></h1>
                <h1>Context: <span className="text-TUCMC-gray-600">{item.context}</span></h1>
                <h1>Fingerprint: <span className="text-TUCMC-gray-600">{item.fingerPrint || "missing"}</span></h1>
              </div>
              <div className={classnames("w-4 rounded-r-md shadow-r-md flex-shrink-0", item.type == "click" ? "bg-TUCMC-orange-400" : item.type == "system" ? "bg-blue-500" : "bg-TUCMC-gray-400")}>

              </div>
            </div>
          })}
        </div>
      </div>:<div className="flex justify-center items-center min-h-screen px-4">
      <div className="shadow-md rounded-md px-6 py-4 max-w-[420px] space-y-2">
        <h1 className="text-lg font-medium">แจ้งการปรับเปลี่ยนระบบความปลอดภัย</h1>
        <p className="text-TUCMC-gray-700">เนื่องจากบัญชีนี้เป็นบัญชี่ที่สามารถใช้เข้าถึงฐานข้อมูลได้และเพื่อความปลอดภัยสูงสุดของฐานข้อมูล ทางระบบจำเป็นจะต้องให้ผู้ใช้บัญชีนี้เปิดโหมดความปลอดภัยสูงเพื่อป้องกันการถูกเข้าถึงบัญชีจากบุคคลที่ไม่ได้รับอนุญาติ</p>
        <div className="flex justify-center py-2">
          <Button href="/account" className="px-4 py-1 rounded-md border text-TUCMC-gray-700 border-TUCMC-gray-400 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white">
            ไปยังหน้าจัดการบัญชี
          </Button>
        </div>
      </div>
    </div>
            }
    </PageContainer>
  )
}

export default Tracker