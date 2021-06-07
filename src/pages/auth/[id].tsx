import {GetServerSideProps} from "next";
import initialisedDB from "@server/firebase-admin";
import React, {useEffect, useState} from "react";
import PageContainer from "@components/common/PageContainer";
import {Loader} from "@components/common/Loader";
import {Input} from "@components/auth/Input";
import {Button} from "@components/common/Inputs/Button";
import Error from "next/error";
import Router from "next/router";
import {resetPassword} from "@client/fetcher/user";
import {useToast} from "@components/common/Toast/ToastContext";

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const rawActionID = params.id.toString()

  let actionID = "forbidden"

  if (rawActionID.includes("reset") && rawActionID !== "reset") {
    const trimmed = rawActionID.replace("reset", "")
    const doc = await initialisedDB.collection("tasks").doc(trimmed).get()
    if (doc.exists) {
      if (doc.get("expire") > new Date().getTime()) {
        actionID = trimmed
      }else{
        await doc.ref.delete()
      }
    }
  }

  return {
    props: {
      actionID: actionID
    }
  }

}

const Page = ({actionID}) => {

  const [loader, setLoader] = useState(false)
  const [password, setPassword] = useState("")
  const [conpass, setConpass] = useState("")

  const {addToast} = useToast()

  useEffect(() => {
    if (actionID === "forbidden") {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
        text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช.",
        crossPage: true
      })
      Router.push("/auth")
    }
  },[actionID])

  const submit = async (e) => {
    e.preventDefault()
    const res = await resetPassword(password, conpass, actionID)
    if (res.status){
      addToast({
        theme: "modern",
        icon: "tick",
        title: "รหัสผ่านถูกเปลี่ยนแล้ว",
        text: "รหัสผ่านของบัญชีนี้ได้ถูกเปลี่ยนแล้ว กรุณาลองเข้าสู่ระบบด้วยรหัสใหม่",
        crossPage: true
      })
      Router.push("/auth")
    }else{
      switch (res.report) {
        case "missing_email":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบอีเมลนี้บนฐานข้อมูล",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช. เพื่อขอตรวจสอบข้อมูล"
          })
          break
        case "mismatch_password":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ช่องรหัสผ่านและช่องยืนยันรหัสผ่านไม่ตรงกัน",
            text: "ข้อมูลในช่องรหัสผ่านและช่องยืนยันรหัสผ่านจะต้องเหมือนกัน กรุณาลองใหม่อีกครั้ง"
          })
          break
        default:
          addToast({
            theme: "modern",
            icon: "cross",
            title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช."
          })
      }
    }
  }

  return (
    actionID !== "forbidden" ? <PageContainer>
      <Loader display={loader}/>
      <div style={{maxWidth: "26rem"}} className="mx-auto py-10 mb-16 md:my-10 md:mb-14 space-y-8 min-h-screen px-6">
        <h1 className="text-4xl">เปลี่ยนรหัสผ่าน</h1>
        <form onSubmit={submit}>
          <div className="space-y-6">
            <Input title="รหัสผ่าน" type="password" stateUpdate={setPassword} required={true}/>
            <Input title="ยืนยันรหัสผ่าน" type="password" stateUpdate={setConpass} required={true}/>
          </div>
          <div className="flex justify-end w-full mt-8">
            <Button type="submit" className="cursor-pointer shadow-md bg-TUCMC-pink-400 text-white tracking-tight rounded-md px-5 py-3">
              <span>เปลี่ยนรหัสผ่าน</span>
            </Button>
          </div>
        </form>
      </div>
    </PageContainer> : <Error statusCode={404}/>
  )
}

export default Page