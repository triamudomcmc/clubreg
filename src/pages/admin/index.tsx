import PageContainer from "@components/common/PageContainer";
import {DatabaseIcon, FingerPrintIcon, QrcodeIcon} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import Router from "next/router";
import {useAuth} from "@client/auth";
import {useState} from "react";
import {use} from "ast-types";

const Admin = () => {

  const {onReady} = useAuth()

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
    return userData
  })

  return (
    <PageContainer>
      {
        userData.safeMode ? <div className="min-h-screen py-10 space-y-10">
          <h1 className="text-xl font-medium text-center">Control Panel</h1>
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-row space-x-4">
                <Button type="div" href="/admin/database" className="flex flex-col justify-center border items-center w-32 h-32 bg-white rounded-md shadow-lg space-y-2">
                  <DatabaseIcon className="w-10 h-10"/>
                  <h1 className="font">Database</h1>
                </Button>
                <Button type="div" className="flex flex-col justify-center border items-center w-32 h-32 bg-white rounded-md shadow-lg space-y-2">
                  <FingerPrintIcon className="w-10 h-10"/>
                  <h1 className="font">Tracker</h1>
                </Button>
              </div>
              <div className="px-10 hidden md:block">
                <div className="border-l h-full"/>
              </div>
              <Button type="div" className="flex flex-col justify-center border items-center w-32 h-32 bg-white rounded-md shadow-lg space-y-2">
                <QrcodeIcon className="w-10 h-10"/>
                <h1 className="font">QR Validator</h1>
              </Button>
            </div>
          </div>
        </div>
          :<div className="flex justify-center items-center min-h-screen px-4">
            <div className="shadow-md rounded-md px-6 py-4 max-w-[420px] space-y-2">
              <h1 className="text-lg font-medium">แจ้งการปรับเปลี่ยนระบบความปลอดภัย</h1>
              <p className="text-TUCMC-gray-700">เนื่องจากบัญชีนี้เป็นบัญชี่ที่สามารถใช้เข้าถึงฐานข้อมูลได้และเพื่อความปลอดภัยสูงสุดของฐานข้อมูล ทางระบบจำเป้นจะต้องให้ผู้ใช้บัญชีนี้เปิดโหมดความปลอดภัยสูงเพื่อป้องกันการถูกเข้าถึงบัญชีจากบุคคลที่ไม่ได้รับอนุญาติ</p>
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

export default Admin