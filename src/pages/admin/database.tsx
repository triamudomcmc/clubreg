import PageContainer from "@components/common/PageContainer";
import {QueryField} from "@components/admin/QueryField";
import {
  CheckIcon,
  ChevronDownIcon,
  DatabaseIcon,
  DocumentSearchIcon,
  FingerPrintIcon,
  QrcodeIcon,
  SearchIcon
} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {Button} from "@components/common/Inputs/Button";
import classnames from "classnames";
import {useAuth} from "@client/auth";
import {DataBox} from "@components/admin/DataBox";
import {fieldUpdate, query as doQuery, rollback} from "@client/admin/query";
import Router from "next/router";
import {Input} from "@components/auth/Input";
import {useToast} from "@components/common/Toast/ToastContext";
import {Ellipsis} from "@vectors/Loaders/Ellipsis";

const Database = () => {

  const {onReady} = useAuth()

  const [query, setQuery] = useState({field: "student_id", operator: "==", context: ""})
  const [isValid, setValidity] = useState(false)
  const [clear, setClear] = useState(false)
  const [display, setDisplay] = useState({})
  const [querying, setQuerying] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [edit, setEdit] = useState({refID: "", field: "", data: ""})
  const {addToast} = useToast()

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
        response.data.forEach(item => {
          obj[item.refID] = item
        })
        setDisplay(obj)
      }
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

  const clearEdit = () => {
    setEdit({refID: "", field: "", data: ""})
  }

  const updateEditingField = async () => {

    setUpdating(true)

    const response = await fieldUpdate(edit)

    if (response.status) {

      addToast({
        theme: "modern",
        icon: "tick",
        title: "Field updated successfully",
        text: <span>To revert this action <span onClick={() => {rollbackUpdate(response.data.cacheID)}} className="underline cursor-pointer whitespace-nowrap">click here</span></span>,
      })

      setDisplay(prevState => (
        {...prevState, [response.data.updated.refID]: response.data.updated}
      ))
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
        text: "Successfully reverted your latest changes."
      })
      setDisplay(prevState => (
        {...prevState, [response.data.updated.refID]: response.data.updated}
      ))
    }
  }

  return (
    <PageContainer>
      {
        userData.safeMode ? <>
            <div className={classnames("fixed top-0 flex items-center justify-center left-0 z-60 bg-TUCMC-gray-700 bg-opacity-50 w-full min-h-screen px-4", edit.field !== "" ? "block" : "hidden")}>
              <div className="bg-white rounded-md py-6 px-6 space-y-4">
                <div>
                  <span className="text-gray-700 tracking-tight">{edit.field}</span>
                  <input
                    type="text"
                    onChange={event => {setEdit(prevState => ({...prevState, data: event.target.value}))}}
                    value={edit.data}
                    className={classnames("appearance-none outline-none border shadow-sm border-gray-300 rounded-md px-4 py-1.5 my-1 w-full focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 text-lg placeholder-gray-500")}/>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-row items-center space-x-1">
                    <span className="font-medium">Type:</span> <span className="font-medium text-TUCMC-orange-500">string</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <Button onClick={clearEdit} className="border border-gray-300 px-4 py-2 rounded-md">
                      Cancel
                    </Button>
                    <Button onClick={updateEditingField} disabled={updating} className="border border-gray-300 px-4 py-2 rounded-md">
                      <span className={classnames(updating && "hidden")}>Update</span>
                      <Ellipsis className={classnames("w-[3rem] h-6", !updating && "hidden")} inverted={true}/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-screen py-10 space-y-10 max-w-[632px] mx-auto">
              <h1 className="text-2xl font-medium text-center">Database</h1>
              <div className="px-6 space-y-8">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <SearchIcon className="w-5 h-5"/>
                    <h1 className="text-lg font-medium">Database Search</h1>
                  </div>
                  <QueryField clear={clear} setClear={setClear} updateQuery={setQuery}/>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <div className="flex space-x-2 items-center">
                        <div className={classnames("rounded-md text-white", isValid ? "bg-TUCMC-green-400" : "bg-TUCMC-red-400")}>
                          <CheckIcon className="w-5 h-5"/>
                        </div>
                        <span className={classnames(isValid?"text-TUCMC-green-500":"text-TUCMC-red-500")}>{isValid ? "Valid Query" : "Invalid Query"}</span>
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
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DocumentSearchIcon className="w-5 h-5"/>
                    <h1 className="text-lg font-medium">Search Result</h1>
                  </div>
                  <div className="space-y-4">
                    {
                      Object.values(display).length > 0 ? Object.values(display).map(data => {
                        return <DataBox data={data} setEdit={setEdit}/>
                      }) : <div className="py-8 border-t border-b">
                        <h1 className="text-center text-TUCMC-gray-700">No result</h1>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
          :<div className="flex justify-center items-center min-h-screen px-4">
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

export default Database