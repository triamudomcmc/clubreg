import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {fetchMembers} from "@client/fetcher/panel";
import {useAuth} from "@client/auth";
import {useToast} from "@components/common/Toast/ToastContext";
import Router from "next/router";
import {sortThaiDictionary} from "@utilities/object";
import {clubMap} from "@config/clubMap";
import {jsPDF} from "jspdf"
import html2canvas from "html2canvas";
import pdfMake from "pdfmake"
import {sliceArrayIntoGroups, sliceArrN} from "@utilities/array";

const fetchMemberData = async (panelID: string, setMemberData: Dispatch<SetStateAction<{}>>, setToast, reFetch, setInitMem, setCount) => {
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
      sorted[key] = sorted[key].sort(function (x, y) { return parseInt(x.room) - parseInt(y.room) || parseInt(x.number) - parseInt(y.number); });
    })

    const slcied = sliceArrayIntoGroups([...sorted.m4,...sorted.m5,...sorted.m6], 35)
    setMemberData(slcied)
    setCount([...sorted.m4,...sorted.m5,...sorted.m6].length)
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
  const [count, setCount] = useState(0)
  const page = useRef([])
  const [display, setDisplay] = useState(<h1 className="animate-pulse">กำลังเตรียมไฟล์...</h1>)
  const [storedPDF, setStoredPDF] = useState()

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
    fetchMemberData(currentID, setMemberData, addToast, reFetch, setInitMember, setCount)
  }


  const redownload = () => {
    setDisplay(<h1 className="animate-pulse">กำลังเตรียมไฟล์...</h1>)
    try {
      // @ts-ignore
      storedPDF.download(`รายชื่อ${current}.pdf`, () => {
        setDisplay(<div className="flex flex-col items-center">
          <h1 className="text-TUCMC-gray-800">สร้างเอกสารเสร็จสมบูรณ์</h1>
          <p className="text-TUCMC-gray-600">หากเอกสารยังไม่ถูกดาวน์โหลด <a onClick={redownload} className="cursor-pointer hover:text-TUCMC-pink-400 underline">กดที่นี่</a></p>
        </div>)
      })
    } catch (_) {

    }
  }

  const downloadpdf = async () => {

    if (storedPDF === undefined) {
      let pagedata = []

      for (let data of page.current) {
        if (data) {
          const canvas = await html2canvas(data)
          pagedata.push(canvas.toDataURL())
        }
      }

      const pdf = pdfMake.createPdf({
        content: pagedata.map(item => ({
          image: item,
          width: 430
        })),
        pageMargins: [ 80, 60, 80, 60 ]
      })

      pdf.download(`รายชื่อ${current}.pdf`, () => {
        setDisplay(<div className="flex flex-col items-center">
          <h1 className="text-TUCMC-gray-800">สร้างเอกสารเสร็จสมบูรณ์</h1>
          <p className="text-TUCMC-gray-600">หากเอกสารยังไม่ถูกดาวน์โหลด <a onClick={redownload} className="cursor-pointer hover:text-TUCMC-pink-400 underline">กดที่นี่</a></p>
        </div>)
      })
      setStoredPDF(pdf)
    }

  }

  useEffect(() => {
    if (initmember) {
      downloadpdf()
    }
  }, [initmember])

  return (
    <div className="space-y-10">
      <div className="fix left-0 top-0 w-full min-h-screen bg-white flex items-center justify-center">
        {display}
      </div>
      {memberData.map((chunk, chunckc) => {
        return <div ref={e => {page.current[chunckc] = e}} className="space-y-6 fixed w-[680px] font-sarabun">
          <div className="flex flex-col items-center">
            <h1 className="text-center font-semibold text-[20px]">รายชื่อนักเรียนชมรม {current && clubMap[current]}</h1>
            <p className="text-[20px]">รหัสชมรม {current} จำนวน {count} คน</p>
          </div>
          <table className="min-w-[680px] mx-auto">
            <tr className="border-t-[0.3px] border-TUCMC-gray-900">
              <th></th>
              <th></th>
              <th></th>
              <th className="text-left"></th>
              <th className="text-left"></th>
              <th>ชั้น</th>
              <th>ห้อง</th>
              <th>เลขที่</th>
            </tr>
            {
              chunk.map((item, index) => {
                return <tr className="border-t-[0.3px] border-b-[0.3px] border-TUCMC-gray-900 text-center text-[18px]">
                  <td>{index + 1 + (35 * chunckc)}</td>
                  <td>{item.student_id}</td>
                  <td className="text-left">{item.title.replace("เด็กหญิง","ด.ญ.").replace("เด็กชาย","ด.ช.")}</td>
                  <td className="text-left">{item.firstname}</td>
                  <td className="text-left">{item.lastname}</td>
                  <td>ม.{item.level}</td>
                  <td>{item.room}</td>
                  <td>{item.number}</td>
                </tr>
              })
            }
          </table>

        </div>
      })}
    </div>
  )
}

export default Page