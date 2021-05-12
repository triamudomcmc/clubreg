import PageContainer from "@components/common/PageContainer";
import React, {Fragment, useEffect, useState} from "react";
import {DefaultCard} from "@components/common/Cards";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import Router from "next/router";
import LoginSection from "@components/auth/LoginSection";
import {useAuth} from "@client/auth";
import {Input} from "@components/auth/Input";
import RegisterSection from "@components/auth/RegisterSection";
import {Loader} from "@components/common/Loader"
import Toast from "@components/common/Toast";


const Auth = ({query}) => {

  const {onReady} = useAuth()
  const [action, setAction] = useState(("register" in query) ? "register" : "login")
  const [toast, setToast] = useState({})
  const [loader, setLoader] = useState(false)

  onReady((logged, userData) => {
    if(logged) {
      if (userData.club !== "") {
        return Router.push("/card")
      }
      const lastVisited = localStorage.getItem("lastVisited")
      if (lastVisited !== "") return Router.push(lastVisited)
      Router.push("/select")
    }
  })

  const goRegister = () => {
    Router.push({
        pathname: '',
        query: "register"
      },
      undefined, { shallow: true }
    )
    setAction("register")
  }

  useEffect(() => {
    const cause = localStorage.getItem("beforeExit")

    switch (cause) {
      case "sessionError" :
        setToast({
          theme:"modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
        })
        break
      case "sessionRejected" :
        setToast({
          theme:"modern",
          icon: "cross",
          title: "เซสชั่นของเบราว์เซอร์นี้ถูกปฏิเสธ",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง หากยังไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อทาง กช. โดยเร็ว"
        })
        break
      case "sessionExpired" :
        setToast({
          theme:"modern",
          icon: "info",
          title: "เซสชั่นก่อนหน้าได้หมดอายุไปแล้ว",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
        })
        break
      case "missingCookie" :
        setToast({
          theme:"modern",
          icon: "info",
          title: "ไม่พบข้อมูลเซสชั่นบนเบราว์เซอร์",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
        })
        break
      case "userNotFound" :
        setToast({
          theme:"modern",
          icon: "cross",
          title: "ไม่พบข้อมูลผู้ใช้งานนี้บนฐานข้อมูล",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง หากยังไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อทาง กช. โดยเร็ว"
        })
        break
    }
    localStorage.setItem("beforeExit","")
  }, [])

  return (
    <PageContainer footer={false}>
      <Loader display={loader}/>
      <Toast newToast={toast}/>
      <div style={{maxWidth: "26rem"}} className="mx-auto my-6 mb-16 md:my-10 md:mb-10 space-y-8 min-h-screen">
        <DefaultCard>
          <p className="font-normal">นักเรียน ม.5 และ ม.6 จะไม่สามารถล็อกอินเข้าสู่ระบบด้วยบัญชีเดิมในปีการศึกษาที่ผ่านมาได้ ต้องยืนยันตัวตนและสร้างบัญชีใหม่ทั้งหมด เนื่องจากมีการออกแบบระบบใหม่</p>
        </DefaultCard>
        {action == "login" && <LoginSection primaryAction={goRegister} setLoader={setLoader} setToast={setToast}/>}
        {action == "register" && <RegisterSection swapFunction={() => {setAction("login")}} setLoader={setLoader} setToast={setToast}/>}
      </div>
    </PageContainer>
  )
}

Auth.getInitialProps = ({query}) => {
  return {query}
}

export default Auth