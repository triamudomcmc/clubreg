import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchMembers} from "@client/fetcher/panel";
import {useAuth} from "@client/auth";
import {useToast} from "@components/common/Toast/ToastContext";
import Router from "next/router";
import {sortThaiDictionary} from "@utilities/object";
import {clubMap} from "@config/clubMap";

const fetchMemberData = async (panelID: string, setMemberData: Dispatch<SetStateAction<{}>>, setToast, reFetch, setInitMem) => {
  const data = await fetchMembers(panelID, false)

  let sorted = {
    m4: [],
    m5: [],
    m6: []
  }

  if (data.status) {
    data.data.forEach((item) => {
      if (item.level.replace("ม.", "") === "4") {
        sorted.m4.push(item)
      }
      if (item.level.replace("ม.", "") === "5") {
        sorted.m5.push(item)
      }
      if (item.level.replace("ม.", "") === "6") {
        sorted.m6.push(item)
      }
    })

    Object.keys(sorted).forEach(key => {
      sorted[key] = sortThaiDictionary(sorted[key],(obj) => (obj.firstname + obj.lastname))
    })

    setMemberData([...sorted.m4,...sorted.m5,...sorted.m6])
    setInitMem(true)
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

const Page = () => {

  const {reFetch, onReady} = useAuth()
  const {addToast} = useToast()

  const [memberData, setMemberData] = useState([])
  const [current, setCurrentID] = useState("")

  const [initmember, setInitMember] = useState(false)

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth");
      return userData
    }
    if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/select");
      return userData
    }
    return userData
  })

  useEffect(() => {
    if (userData && userData.panelID) {
      refetch()
    }
  }, [userData])

  const refetch = () => {
    const currentID = localStorage.getItem("currentPanel") || userData.panelID[0]
    setCurrentID(currentID)
    fetchMemberData(currentID, setMemberData, addToast, reFetch, setInitMember)
  }

  console.log(memberData)

  return (
    <div className="space-y-6 py-10">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-[18px]">รายชื่อนักเรียนชมรม {current && clubMap[current]}</h1>
        <p className="text-[16px]">รหัสชมรม {current} จำนวน {memberData.length} คน</p>
      </div>
      <table className="min-w-[760px] mx-auto">
        {
          memberData.map((item, index) => {
            return <tr className="border-t border-b border-TUCMC-gray-900 text-center">
              <td>{index + 1}</td>
              <td>{item.student_id}</td>
              <td>{item.room}</td>
              <td>{item.number}</td>
              <td>{item.title}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
            </tr>
          })
        }
      </table>
    </div>
  )
}

export default Page