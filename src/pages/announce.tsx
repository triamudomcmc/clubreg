import PageContainer from "@components/common/PageContainer";
import SelectSplash from "@vectors/decorations/SelectSplash";
import Modal from "@components/common/Modals";
import {XIcon} from "@heroicons/react/solid";
import {AnnounceSplash} from "@vectors/decorations/AnnounceSplash";
import {FilterSearch} from "@components/common/Inputs/Search";
import ClubList from "@components/select/ClubList";
import ClubStatus from "@components/announce/ClubStatus";

const Announce = () => {
  return(
    <PageContainer>
      <div className="flex flex-col items-center pt-14 md:pt-20">
        <div className="max-w-md px-4">
          <div className="flex flex-col items-center">
            <h1 className="font-medium text-TUCMC-gray-700 text-4xl">ประกาศผล</h1>
          </div>
          <div className="mt-10 w-full px-14 minClubs:px-20">
            <AnnounceSplash />
          </div>
          <div className="px-6 mt-12 md:mt-20 text-center">
            <p className="text-TUCMC-gray-700">
              กดยืนยันสิทธิ์หรือสละสิทธิ์ชมรมที่ผ่านการ
              คัดเลือกภายในวันนี้ (เหลือเวลาอีก 12 ชั่วโมง 15 นาที)
            </p>
            <p className="text-TUCMC-gray-700">
              หากไม่ดำเนินการใด ๆ ภายในเวลาที่กำหนด
              จะถือว่าสละสิทธิ์ชมรมที่ผ่านการคัดเลือกโดยอัตโนมัติ
            </p>
          </div>
          <h1 className="text-center text-TUCMC-gray-700 my-6">หรือ</h1>
          <div className="px-6 flex flex-col items-center space-y-2">
            <p className="text-TUCMC-gray-700">รอลุ้นลำดับสำรอง 2 รอบ</p>
            <div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center rounded-full bg-TUCMC-gray-500 text-[8px] font-medium text-white">1</div>
                <span className="text-TUCMC-gray-500">26 พ.ค. 64 เวลา 8.00 น.</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center rounded-full bg-TUCMC-gray-500 text-[8px] font-medium text-white">2</div>
                <span className="text-TUCMC-gray-500">27 พ.ค. 64 เวลา 8.00 น.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 bg-TUCMC-gray-100 w-full pb-20 pt-12">
          <div className="space-y-2 px-4 max-w-md mx-auto">
            <ClubStatus title="ชมรมสีสรรพ์ภาษาต่างประเทศที่ 2 (French Chorus)" state="pass"/>
            <ClubStatus title="ชมรมพัฒนาศักยภาพทางวิทยาศาสตร์" state="pass"/>
            <ClubStatus title="ชมรมสังคมศึกษา (หลากทัศนะประวัติศาสตร์)" state="pass"/>
            <ClubStatus title="ชมรมสีสรรพ์ภาษาต่างประเทศที่ 2 (French Chorus)" state="pass"/>
            <ClubStatus title="ชมรมพัฒนาศักยภาพทางวิทยาศาสตร์" state="pass"/>
            <ClubStatus title="ชมรมสังคมศึกษา (หลากทัศนะประวัติศาสตร์)" state="failed"/>
          </div>
          <p className="text-TUCMC-gray-700 px-16 text-center mt-20 max-w-md mx-auto">
            กรุณารอเลือกเข้าชมรมที่ไม่มีการ Audition
            และยังมีที่นั่งว่างอยู่ ในวันที่ 28 พ.ค. 64
          </p>
        </div>
      </div>
    </PageContainer>
  )
}

export default Announce