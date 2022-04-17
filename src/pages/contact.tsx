import PageContainer from "@components/common/PageContainer"
import { LocationMarkerIcon } from "@heroicons/react/solid"
import ContactSplash from "@vectors/decorations/ContactSplash"
import { SocialFacebook, SocialInstagram } from "@vectors/icons/Socials"

const Contact = () => {
  return (
    <PageContainer>
      <div className="mx-auto min-h-screen max-w-6xl pb-10">
        <div className="flex flex-col items-center px-6">
          <h1 className="mt-8 text-xl font-bold md:mt-16">ติดต่อ</h1>
          <div className="flex flex-col items-center md:flex-row">
            <div className="mx-8 mt-6 flex flex-col items-start px-8 md:w-full md:max-w-6xl md:py-10 xl:px-0">
              <ContactSplash className="w-[250px] md:mr-12 md:mt-0 md:w-[300px] md:max-w-sm lg:max-w-none" />
            </div>
            <div className="my-8 flex flex-col items-start py-0 font-medium md:h-full md:max-h-96 md:w-full md:items-start md:py-5 lg:py-0">
              <div className="flex flex-col items-start space-y-4 px-1 ">
                <div className="mb-1">งานกิจกรรมพัฒนาผู้เรียน (กช.)</div>
                <div className="flex flex-row space-x-2">
                  <SocialFacebook className="h-6 w-6 text-black" />
                  <a target="_blank" href="https://www.facebook.com/triamudomclubs" className="hover:underline">
                    TUCMC
                  </a>
                </div>
                <div className="flex flex-row space-x-2">
                  <SocialInstagram className="h-6 w-6 text-black" />
                  <a target="_blank" href="https://instagram.com/tucmc_official" className="hover:underline">
                    tucmc_official
                  </a>
                </div>
                <div className="flex flex-row space-x-2">
                  <LocationMarkerIcon className="h-6 w-6" />
                  <h2>ตึก 50 ปี ชั้น 1 โรงเรียนเตรียมอุดมศึกษา</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Contact
