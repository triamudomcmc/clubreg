import {SocialFacebook, SocialInstagram} from "@vectors/icons/Socials";
import {WhiteLogo} from "@vectors/Logo";

const Footer = () => {
  return (
    <div className="flex flex-col items-center space-y-24 justify-center bg-TUCMC-gray-900 py-14">
      <div className="flex flex-col items-center text-white text-xl space-y-4">
        <a>หน้าแรก</a>
        <a>ลงทะเบียนชมรม</a>
        <a>ชมรม</a>
        <a>วิธีลงทะเบียน</a>
        <a>คำถามที่พบบ่อย</a>
        <a>ข้อตกลงและเงื่อนไขการใช้งาน</a>
        <a>ทำความรู้จัก กช.</a>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-row space-x-6">
          <SocialFacebook/>
          <SocialInstagram/>
        </div>
        <WhiteLogo/>
      </div>
    </div>
  )
}

export default Footer