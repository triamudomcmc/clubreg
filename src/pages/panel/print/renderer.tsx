import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { fetchMembers } from "@client/fetcher/panel"
import { useAuth } from "@client/auth"
import { useToast } from "@components/common/Toast/ToastContext"
import Router from "next/router"
import { sortThaiDictionary } from "@utilities/object"
import { clubMap } from "@config/clubMap"
import { GetServerSideProps } from "next"
import initialisedDB from "@server/firebase-admin"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const path = query.path?.toString() || null

  if (path) {
    const data = await initialisedDB.collection("printReport").doc(path).get()
    if (data.exists) {
      return {
        props: {
          printData: JSON.parse(data.get("data") || "[]"),
          meta: data.get("meta") || null,
        },
      }
    }
  }

  return {
    props: {
      printData: null,
      meta: null,
    },
  }
}

const Page = ({ printData, meta }) => {
  const [memberData, setMemberData] = useState([])
  const page = useRef([])
  const [display, setDisplay] = useState(
    <div className="animate-pulse">
      กำลังเตรียมไฟล์...
    </div>
  )
  const [storedPDF, setStoredPDF] = useState()
  const [initmember, setInitMember] = useState(false)

  useEffect(() => {
    if (printData) {
      setMemberData(printData)
    }
  }, [printData])

  return (
    <div className="space-y-60 px-14">
      {memberData.map((chunk, chunckc) => {
        return (
          <div
            ref={(e) => {
              page.current[chunckc] = e
            }}
            className="w-[660px] space-y-6 font-sarabun"
          >
            {chunckc > 0 && (
              <div className=""></div>
            )}
            <div className="flex flex-col items-center">
              <h1 className="text-center text-[20px] font-semibold">รายชื่อนักเรียนชมรม {meta?.clubName}</h1>
              <p className="text-[20px]">
                รหัสชมรม {meta?.clubID} จำนวน {meta?.count} คน
              </p>
            </div>
            <table className="mx-auto min-w-[680px]">
              <tr className="border-t-[1px] border-TUCMC-gray-900">
                <th></th>
                <th></th>
                <th></th>
                {/* <th className="text-left"></th>
                <th className="text-left"></th> */}
                <th>ชั้น</th>
                <th>ห้อง</th>
                <th>เลขที่</th> 
                <th>หมายเหตุ</th>
              </tr>
              {chunk.map((item, index) => {
                return (
                  <tr className="border-t-[1px] border-b-[1px] border-TUCMC-gray-900 text-center text-[18px]">
                    <td>{index + 1 + 30 * chunckc}</td>
                    <td>{item.student_id}</td>
                    <td className="text-left">
                      {item.title.replace("เด็กหญิง", "ด.ญ.").replace("เด็กชาย", "ด.ช.") + ' '}
                      {item.firstname} {item.lastname}
                    </td>
                    {/* <td className="text-left">{item.firstname}</td>
                    <td className="text-left">{item.lastname}</td> */}
                    <td>ม.{item.level}</td>
                    <td>{item.room}</td>
                    <td>{item.number}</td>
                    <td></td>
                  </tr>
                )
              })}
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default Page
