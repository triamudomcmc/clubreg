import PageContainer from "@components/common/PageContainer";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import ContactSplash from "@vectors/decorations/ContactSplash";
import { SocialFacebook, SocialInstagram } from "@vectors/icons/Socials";

const Contact = () => {
  return (
    <PageContainer footer={false}>
      <div className="max-w-6xl pb-10 mx-auto md:min-h-screen">
        <div className="flex flex-col items-center px-6">
          <h1 className="mt-8 text-xl font-bold md:mt-16">ติดต่อ</h1>
          <div className="flex flex-col items-center md:flex-row">
            <div className="flex flex-col items-start px-8 mx-8 mt-6 md:w-full md:max-w-6xl md:py-10 xl:px-0">
              <ContactSplash className="w-[250px] md:w-[300px] md:mr-12 md:mt-0 md:max-w-sm lg:max-w-none" />
            </div>
            <div className="flex flex-col items-start py-0 my-8 font-medium md:py-5 lg:py-0 md:items-start md:h-full md:max-h-96 md:w-full">
              <div className="flex flex-col items-start px-1 space-y-4 ">
                <div className="mb-1">งานกิจกรรมพัฒนาผู้เรียน (กช.)</div>
                <div className="flex flex-row space-x-2">
                  <SocialFacebook className="w-6 h-6 text-black" />
                  <h2>TUCMC</h2>
                </div>
                <div className="flex flex-row space-x-2">
                  <SocialInstagram className="w-6 h-6 text-black" />
                  <h2>tucmc_official</h2>
                </div>
                <div className="flex flex-row space-x-2">
                  <LocationMarkerIcon className="w-6 h-6" />
                  <h2>ตึก 50 ปี ชั้น 1 โรงเรียนเตรียมอุดมศึกษา</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Contact;
