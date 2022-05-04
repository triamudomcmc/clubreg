import { SocialFacebook, SocialInstagram } from "@vectors/icons/Socials"
import { WhiteLogo } from "@vectors/Logo"
import Link from "next/link"

const Footer = () => {
  return (
    <>
      <div className="flex select-none flex-col items-center justify-center space-y-24 bg-TUCMC-gray-900 py-14 md:space-y-0 md:py-8">
        <div className="flex flex-col items-center space-y-4 text-xl text-white md:hidden">
          <Link href="/">
            <a>หน้าแรก</a>
          </Link>
          <Link href="/auth">
            <a>ลงทะเบียนชมรม</a>
          </Link>
          <Link href="/clubs">
            <a>ชมรม</a>
          </Link>
          <Link href="/instructions">
            <a>วิธีลงทะเบียน</a>
          </Link>
          <Link href="/FAQ">
            <a>คำถามที่พบบ่อย</a>
          </Link>
          <a>ข้อตกลงและเงื่อนไขการใช้งาน</a>
          <Link href="/TUCMC">
            <a>ทำความรู้จัก กช.</a>
          </Link>
        </div>
        <div className="md:flex md:w-full md:justify-center">
          <div className="flex flex-col items-center space-y-8 md:w-full md:max-w-6xl md:flex-row-reverse md:justify-between md:space-y-0 md:px-6">
            <div className="flex flex-row space-x-6 md:space-x-3">
              <a target="_blank" href="https://www.facebook.com/triamudomclubs">
                <SocialFacebook className="h-10 w-10 text-white md:h-6 md:w-6" />
              </a>
              <a target="_blank" href="https://instagram.com/tucmc_official">
                <SocialInstagram className="h-10 w-10 text-white md:h-6 md:w-6" />
              </a>
            </div>
            <div className="hidden flex-row space-x-10 whitespace-nowrap font-medium text-white md:flex">
              <Link href="/">
                <a>หน้าแรก</a>
              </Link>
              <Link href="/instructions">
                <a>วิธีใช้</a>
              </Link>
              <Link href="/clubs">
                <a>ชมรม</a>
              </Link>
              <Link href="/FAQ">
                <a>FAQ</a>
              </Link>
              <Link href="/TUCMC">
                <a>กช.</a>
              </Link>
              <Link href="/contact">
                <a>ติดต่อ</a>
              </Link>
            </div>
            <Link href="/">
              <div className="cursor-pointer">
                <WhiteLogo />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden flex-row justify-center space-x-2 bg-black py-5 text-xs text-white md:flex">
        <Link href="/terms-of-service">
          <a>ข้อตกลงและเงื่อนไขการใช้งาน</a>
        </Link>
        <span>|</span>
        <Link href="/privacy-policy">
          <a>นโยบายความปลอดภัย</a>
        </Link>
      </div>
    </>
  )
}

export default Footer
