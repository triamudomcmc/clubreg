import PageContainer from "@components/common/PageContainer";
import React, {Fragment, useState} from "react";
import {DefaultCard} from "@components/common/Cards";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import Router from "next/router";
import LoginSection from "@components/auth/LoginSection";
import {useAuth} from "@client/auth";
import {Input} from "@components/auth/Input";
import RegisterSection from "@components/auth/RegisterSection";


const Auth = ({query}) => {

  const {onReady} = useAuth()
  const [action, setAction] = useState(("register" in query) ? "register" : "login")

  onReady(logged => {
    if(logged) {
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

  return (
    <PageContainer footer={false}>
      <div style={{maxWidth: "26rem"}} className="mx-auto my-6 mb-16 md:my-10 md:mb-10 space-y-8 min-h-screen">
        <DefaultCard>
          <p className="font-normal">นักเรียน ม.5 และ ม.6 จะไม่สามารถล็อกอินเข้าสู่ระบบด้วยบัญชีเดิมในปีการศึกษาที่ผ่านมาได้ ต้องยืนยันตัวตนและสร้างบัญชีใหม่ทั้งหมด เนื่องจากมีการออกแบบระบบใหม่</p>
        </DefaultCard>
        {action == "login" && <LoginSection primaryAction={goRegister}/>}
        {action == "register" && <RegisterSection/>}
      </div>
    </PageContainer>
  )
}

Auth.getInitialProps = ({query}) => {
  return {query}
}

export default Auth