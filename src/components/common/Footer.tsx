import {SocialFacebook, SocialInstagram} from "@vectors/icons/Socials";
import {WhiteLogo} from "@vectors/Logo";
import Link from "next/link"

const Footer = () => {
  return (
    <>
      <div
        className="flex flex-col items-center space-y-24 justify-center bg-TUCMC-gray-900 py-14 md:space-y-0 md:py-8">
        <div className="md:hidden flex flex-col items-center text-white text-xl space-y-4">
          <Link href="/">
            <a>หน้าแรก</a>
          </Link>
          <Link href="/auth">
            <a>ลงทะเบียนชมรม</a>
          </Link>
          <Link href="/clubs">
            <a>ชมรม</a>
          </Link>
          <a>วิธีลงทะเบียน</a>
          <a>คำถามที่พบบ่อย</a>
          <a>ข้อตกลงและเงื่อนไขการใช้งาน</a>
          <a>ทำความรู้จัก กช.</a>
        </div>
        <div className="md:flex md:justify-center md:w-full">
          <div
            className="flex flex-col items-center space-y-8 md:flex-row-reverse md:justify-between md:space-y-0 md:w-full md:max-w-6xl md:px-6">
            <div className="flex flex-row space-x-6 md:space-x-3">
              <SocialFacebook className="w-10 h-10 md:w-6 md:h-6"/>
              <SocialInstagram className="w-10 h-10 md:w-6 md:h-6"/>
            </div>
            <div
              className="hidden md:flex flex-row whitespace-nowrap text-white font-medium space-x-10">
              <Link href="/">
                <a>หน้าแรก</a>
              </Link>
              <a>วิธีใช้</a>
              <Link href="/clubs">
                <a>ชมรม</a>
              </Link>
              <a>FAQ</a>
              <a>กช.</a>
              <a>ติดต่อ</a>
            </div>
            <WhiteLogo/>
          </div>
        </div>
      </div>
      <div
        className="bg-black hidden md:flex flex-row justify-center text-xs text-white space-x-2 py-5">
        <a>ข้อตกลงและเงื่อนไขการใช้งาน</a>
        <span>|</span>
        <a>นโยบายความปลอดภัย</a>
      </div>
    </>
  )
}

export default Footer