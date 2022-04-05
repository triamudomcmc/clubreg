import PageContainer from "@components/common/PageContainer"
import { ClipboardCheckIcon, DatabaseIcon, FingerPrintIcon, QrcodeIcon } from "@heroicons/react/solid"
import { Button } from "@components/common/Inputs/Button"
import Router from "next/router"
import { useAuth } from "@client/auth"
import { useState } from "react"
import { use } from "ast-types"

const Admin = () => {
  const { onReady } = useAuth()

  const userData = onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
    return userData
  })

  return (
    <PageContainer>
      {userData.safeMode ? (
        <div className="min-h-screen space-y-10 py-10">
          <h1 className="text-center text-xl font-medium">Control Panel</h1>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex flex-row space-x-4">
                <Button
                  type="div"
                  href="/admin/database"
                  className="flex h-32 w-32 flex-col items-center justify-center space-y-2 rounded-md border bg-white shadow-lg"
                >
                  <DatabaseIcon className="h-10 w-10" />
                  <h1 className="font">Database</h1>
                </Button>
                <Button
                  type="div"
                  href="/admin/tracker"
                  className="flex h-32 w-32 flex-col items-center justify-center space-y-2 rounded-md border bg-white shadow-lg"
                >
                  <FingerPrintIcon className="h-10 w-10" />
                  <h1 className="font">Tracker</h1>
                </Button>
              </div>
              <div className="hidden px-10 md:block">
                <div className="h-full border-l" />
              </div>
              <Button
                type="div"
                className="flex h-32 w-32 flex-col items-center justify-center space-y-2 rounded-md border bg-white shadow-lg"
              >
                <QrcodeIcon className="h-10 w-10" />
                <h1 className="font">QR Validator</h1>
              </Button>
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex flex-row space-x-4">
                <Button
                  type="div"
                  href="/admin/report"
                  className="flex h-32 w-32 flex-col items-center justify-center space-y-2 rounded-md border bg-white shadow-lg"
                >
                  <ClipboardCheckIcon className="h-10 w-10" />
                  <h1 className="font">Report</h1>
                </Button>
                <Button
                  type="div"
                  className="flex h-32 w-32 flex-col items-center justify-center space-y-2 rounded-md border bg-white opacity-0 shadow-lg"
                >
                  <FingerPrintIcon className="h-10 w-10" />
                  <h1 className="font">Tracker</h1>
                </Button>
              </div>
              <div className="hidden px-10 opacity-0 md:block">
                <div className="h-full border-l" />
              </div>
              <Button
                type="div"
                className="flex h-32 w-32 flex-col items-center justify-center space-y-2 rounded-md border bg-white opacity-0 shadow-lg"
              >
                <QrcodeIcon className="h-10 w-10" />
                <h1 className="font">QR Validator</h1>
              </Button>
            </div>
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

export default Admin
