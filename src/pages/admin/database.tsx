import PageContainer from "@components/common/PageContainer"
import { QueryField } from "@components/admin/QueryField"
import {
  CheckIcon,
  ChevronDownIcon,
  DatabaseIcon,
  DocumentSearchIcon,
  FingerPrintIcon,
  QrcodeIcon,
  SearchIcon,
} from "@heroicons/react/solid"
import React, { useEffect, useState } from "react"
import { Button } from "@components/common/Inputs/Button"
import classnames from "classnames"
import { useAuth } from "@client/auth"
import { DataBox } from "@components/admin/DataBox"
import { fieldUpdate, query as doQuery, rollback } from "@client/admin/query"
import Router from "next/router"
import { Input } from "@components/auth/Input"
import { useToast } from "@components/common/Toast/ToastContext"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"

const Database = () => {
  const { onReady } = useAuth()

  const [query, setQuery] = useState({ field: "student_id", operator: "==", context: "" })
  const [isValid, setValidity] = useState(false)
  const [clear, setClear] = useState(false)
  const [display, setDisplay] = useState({})
  const [querying, setQuerying] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [edit, setEdit] = useState({ refID: "", field: "", data: "" })
  const { addToast } = useToast()

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
    return userData
  })

  useEffect(() => {
    if (!query.field || !query.operator || !query.context) {
      return setValidity(false)
    }
    setValidity(true)
  }, [query])

  const clearQuery = () => {
    setClear(true)
  }

  const performQuery = async () => {
    if (isValid) {
      setQuerying(true)

      const response = await doQuery(query)
      if (response.status) {
        let obj = {}
        response.data.forEach((item) => {
          obj[item.refID] = item
        })
        setDisplay(obj)
      }
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

  const clearEdit = () => {
    setEdit({ refID: "", field: "", data: "" })
  }

  const updateEditingField = async () => {
    setUpdating(true)

    const response = await fieldUpdate(edit)

    if (response.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "Field updated successfully",
        text: (
          <span>
            To revert this action{" "}
            <span
              onClick={() => {
                rollbackUpdate(response.data.cacheID)
              }}
              className="cursor-pointer whitespace-nowrap underline"
            >
              click here
            </span>
          </span>
        ),
      })

      setDisplay((prevState) => ({ ...prevState, [response.data.updated.refID]: response.data.updated }))
      clearEdit()
    }

    setUpdating(false)
  }

  const rollbackUpdate = async (cacheID) => {
    const response = await rollback(cacheID)
    if (response.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "Field reverted successfully",
        text: "Successfully reverted your latest changes.",
      })
      setDisplay((prevState) => ({ ...prevState, [response.data.updated.refID]: response.data.updated }))
    }
  }

  return (
    <PageContainer>
      {userData.safeMode ? (
        <>
          <div
            className={classnames(
              "z-60 fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-TUCMC-gray-700 bg-opacity-50 px-4",
              edit.field !== "" ? "block" : "hidden"
            )}
          >
            <div className="space-y-4 rounded-md bg-white py-6 px-6">
              <div>
                <span className="tracking-tight text-gray-700">{edit.field}</span>
                <input
                  type="text"
                  onChange={(event) => {
                    setEdit((prevState) => ({ ...prevState, data: event.target.value }))
                  }}
                  value={edit.data}
                  className={classnames(
                    "outline-none my-1 w-full appearance-none rounded-md border border-gray-300 px-4 py-1.5 text-lg placeholder-gray-500 shadow-sm focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
                  )}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-row items-center space-x-1">
                  <span className="font-medium">Type:</span>{" "}
                  <span className="font-medium text-TUCMC-orange-500">string</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={clearEdit} className="rounded-md border border-gray-300 px-4 py-2">
                    Cancel
                  </Button>
                  <Button
                    onClick={updateEditingField}
                    disabled={updating}
                    className="rounded-md border border-gray-300 px-4 py-2"
                  >
                    <span className={classnames(updating && "hidden")}>Update</span>
                    <Ellipsis className={classnames("h-6 w-[3rem]", !updating && "hidden")} inverted={true} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto min-h-screen max-w-[632px] space-y-10 py-10">
            <h1 className="text-center text-2xl font-medium">Database</h1>
            <div className="space-y-8 px-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <SearchIcon className="h-5 w-5" />
                  <h1 className="text-lg font-medium">Database Search</h1>
                </div>
                <QueryField clear={clear} setClear={setClear} updateQuery={setQuery} />
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <div className="flex items-center space-x-2">
                      <div
                        className={classnames(
                          "rounded-md text-white",
                          isValid ? "bg-TUCMC-green-400" : "bg-TUCMC-red-400"
                        )}
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
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DocumentSearchIcon className="h-5 w-5" />
                  <h1 className="text-lg font-medium">Search Result</h1>
                </div>
                <div className="space-y-4">
                  {Object.values(display).length > 0 ? (
                    Object.values(display).map((data) => {
                      return <DataBox data={data} setEdit={setEdit} />
                    })
                  ) : (
                    <div className="border-t border-b py-8">
                      <h1 className="text-center text-TUCMC-gray-700">No result</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
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

export default Database
