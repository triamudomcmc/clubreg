import PageContainer from "@components/common/PageContainer"
import { CheckIcon, QrcodeIcon } from "@heroicons/react/solid"
import React, { useEffect, useState } from "react"
import { getTrackingHistory, getUserIDfromCardID, query as doQuery } from "@client/admin/query"
import { Button } from "@components/common/Inputs/Button"
import classnames from "classnames"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"
import { isNumeric } from "@utilities/texts"
import { useToast } from "@components/common/Toast/ToastContext"
import { addZero } from "@utilities/timers"
import Modal from "@components/common/Modals"
import dynamic from "next/dynamic"
import { useAuth } from "@client/auth"
import Router from "next/router"
import { useUserCred } from "handlers/hooks/useUserCred"

const fetchTrackingHistory = async (id, setHistory) => {
  const res = await getTrackingHistory(id)
  if (res.status) {
    setHistory(res.data)
  }
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const Tracker = () => {
  const { addToast } = useToast()
  const [history, setHistory] = useState([])
  const [query, setQuery] = useState("")
  const [sorted, setSorted] = useState([])
  const [close, setClose] = useState(false)
  const [scanner, setScanner] = useState(false)
  const [reader, setReader] = useState(<></>)
  const [isValid, setValidity] = useState(false)
  const [querying, setQuerying] = useState(false)

  const { onReady, reFetch } = useAuth()
  const { userCred } = useUserCred()

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
    return userData
  })

  const handleScan = (data) => {
    if (data) {
      const code = data.replace("https://register.clubs.triamudom.ac.th/card/", "")
      if (code.length == 20) {
        getUserIDfromCardID(code).then((response) => {
          if (response.status) {
            setQuery(response.data.userID)
            performQuery(true, response.data.userID)
          }
        })
        setClose(true)
      }
    }
  }

  const clearQuery = () => {
    setQuery("")
  }

  const performQuery = async (bypass = false, id = "") => {
    if (bypass || isValid) {
      setQuerying(true)
      await fetchTrackingHistory(bypass ? id : query, setHistory)
    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "Unable to execute requested field operation",
        text: "Please check your query syntax before submit the request.",
      })
    }

    setQuerying(false)
  }

  useEffect(() => {
    if (query.length == 5 || query.length == 20) {
      if (query.length == 5 && !isNumeric(query)) {
        setValidity(false)
      } else {
        setValidity(true)
      }
    } else {
      setValidity(false)
    }
  }, [query])

  useEffect(() => {
    setSorted(history.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)))
  }, [history])

  useEffect(() => {
    if (scanner) {
      const QrReader = dynamic(() => import("modern-react-qr-reader"), { ssr: false })
      setTimeout(() => {
        setReader(
          <QrReader
            // @ts-ignore
            delay={300}
            facingMode="environment"
            showViewFinder={false}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        )
      }, 500)
    } else {
      setReader(<></>)
    }
  }, [scanner])

  return (
    <PageContainer>
      <Modal
        reloadChildren={true}
        CloseDep={{
          dep: close,
          revert: () => {
            setClose(false)
          },
        }}
        overlayClassName="fixed w-screen min-h-screen top-0 left-0 bg-TUCMC-gray-600 bg-opacity-50 flex items-center justify-center px-8"
        className="w-full max-w-[382px] rounded-md bg-white py-4"
        TriggerDep={{
          dep: scanner,
          revert: () => {
            setScanner(false)
          },
        }}
      >
        <div className="height-[80vw] mx-8 max-w-sm border border-TUCMC-gray-600">{reader}</div>
      </Modal>

      {userCred.safeMode ? (
        <div className="mx-auto min-h-screen max-w-[520px] py-10 px-4">
          <h1 className="text-center text-xl font-medium">Tracker</h1>
          <div className="space-y-2">
            <div>
              <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                Identifiers
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="iden"
                  id="iden"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                  autoComplete="false"
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
                  placeholder="UserID or Student ID"
                />
                <div className="absolute inset-y-0 right-0 z-[20] flex items-center pr-3">
                  <QrcodeIcon
                    onClick={() => {
                      setScanner(true)
                    }}
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="flex items-center space-x-2">
                  <div
                    className={classnames("rounded-md text-white", isValid ? "bg-TUCMC-green-400" : "bg-TUCMC-red-400")}
                  >
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <span className={classnames(isValid ? "text-TUCMC-green-500" : "text-TUCMC-red-500")}>
                    {isValid ? "Valid Query" : "Invalid Query"}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={clearQuery} className="rounded-md border border-gray-300 bg-white px-4 py-1">
                  Clear
                </Button>
                <Button
                  onClick={performQuery}
                  disabled={querying}
                  className="rounded-md border border-gray-300 bg-white px-4 py-1"
                >
                  <span className={classnames(querying && "hidden")}>Query</span>
                  <Ellipsis className={classnames("h-6 w-[2.4rem]", !querying && "hidden")} inverted={true} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-10 space-y-2">
            {history.map((item) => {
              const date = new Date(item.timestamp)
              return (
                <div className="flex justify-between space-x-4 rounded-md shadow-md">
                  <div className="py-4 pl-4">
                    <p>
                      Timestamp:{" "}
                      <span className="break-all text-TUCMC-gray-600">
                        {date.getDate()} {months[date.getMonth()]} {date.getFullYear()} {addZero(date.getHours())}:
                        {addZero(date.getMinutes())}:{addZero(date.getSeconds())}
                      </span>
                    </p>
                    <p>
                      Context: <span className="break-all text-TUCMC-gray-600">{item.context}</span>
                    </p>
                    <p>
                      Fingerprint:{" "}
                      <span className="break-all text-TUCMC-gray-600">{item.fingerPrint || "missing"}</span>
                    </p>
                  </div>
                  <div
                    className={classnames(
                      "shadow-r-md w-4 flex-shrink-0 rounded-r-md",
                      item.type == "click"
                        ? "bg-TUCMC-orange-400"
                        : item.type == "system"
                        ? "bg-blue-500"
                        : "bg-TUCMC-gray-400"
                    )}
                  ></div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-[420px] space-y-2 rounded-md px-6 py-4 shadow-md">
            <h1 className="text-lg font-medium">แจ้งการปรับเปลี่ยนระบบความปลอดภัย</h1>
            <p className="text-TUCMC-gray-700">
              เนื่องจากบัญชีนี้เป็นบัญชี่ที่สามารถใช้เข้าถึงฐานข้อมูลได้และเพื่อความปลอดภัยสูงสุดของฐานข้อมูล
              ทางระบบจำเป็นจะต้องให้ผู้ใช้บัญชีนี้เปิดโหมดความปลอดภัยสูงเพื่อป้องกันการถูกเข้าถึงบัญชีจากบุคคลที่ไม่ได้รับอนุญาติ
            </p>
            <div className="flex justify-center py-2">
              <Button
                href="/account"
                className="rounded-md border border-TUCMC-gray-400 px-4 py-1 text-TUCMC-gray-700 hover:border-yellow-400 hover:bg-yellow-400 hover:text-white"
              >
                ไปยังหน้าจัดการบัญชี
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}

export default Tracker
