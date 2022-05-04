import PageContainer from "@components/common/PageContainer"
import ContactSplash from "@vectors/decorations/ContactSplash"
import { NextPage } from "next"
import Link from "next/link"
import Page from "./auth/[id]"

const NotFoundPage: NextPage = () => {
  return (
    <PageContainer>
      <main className="flex min-h-screen flex-col items-center space-y-2 pt-24">
        <p className="text-center text-[120px] font-bold text-TUCMC-pink-400 md:text-[150px]">404</p>
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-center text-2xl font-semibold">ไม่พบหน้าดังกล่าว</h1>
          <Link href="/" passHref>
            <a className="rounded-md border border-gray-300 px-12 py-2 transition-colors hover:bg-gray-50 sm:px-6">
              กลับสู่หน้าหลัก
            </a>
          </Link>
        </div>
      </main>
    </PageContainer>
  )
}

export default NotFoundPage
