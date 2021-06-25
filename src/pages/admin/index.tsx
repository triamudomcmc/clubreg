import PageContainer from "@components/common/PageContainer";
import {DatabaseIcon, FingerPrintIcon, QrcodeIcon} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import Router from "next/router";
import {useAuth} from "@client/auth";

const Admin = () => {

  const {onReady} = useAuth()

  onReady((logged, userData) => {
    if (!logged) return Router.push("/auth")
    if (!userData.admin) return Router.push("/account")
  })

  return (
    <PageContainer>
      <div className="min-h-screen py-10 space-y-10">
        <h1 className="text-xl font-medium text-center">Control Panel</h1>
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
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
    </PageContainer>
  )
}

export default Admin