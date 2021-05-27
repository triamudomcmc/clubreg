import PageContainer from "@components/common/PageContainer";
import Image from "next/image"
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';

import "swiper/swiper-bundle.css"
import {useWindowDimensions} from "@utilities/document";
import {ChartBarIcon, WifiIcon} from "@heroicons/react/solid";
import {RefreshIcon} from "@heroicons/react/outline";

SwiperCore.use([Pagination]);
const TUCMC = () => {

  const {width} = useWindowDimensions()

  const isMD = width >= 768

  return (
    <PageContainer>
      <div className="bg-TUCMC-pink-500">
        <div className="flex flex-col items-center space-y-6 md:space-y-10 text-white px-6">
          <div className="px-4 mb-[-50%] pic:mb-[-200px] max-w-[400px]">
            <Image src="/assets/images/placeholder/yeeta.png" width={500} height={500} className="object-cover circle-clip"/>
          </div>
          <h1 className="font-bold text-4xl text-center pt-4">กช. คืออะไร ?</h1>
          <p className="text-lg text-center max-w-lg mx-auto">
            คณะกรรมการงานกิจกรรมพัฒนาผู้เรียน (กช.) คือ องค์กรนักเรียนที่บริหารจัดการดูแลชมรมทุกชมรม (ตามชื่อเดิม กช. = คณะกรรมการกิจกรรมชมรม) กช. จึงเป็นผู้ดูแลระบบลงทะเบียนชมรม และกิจกรรมที่เกี่ยวกับชมรมในโรงเรียนเตรียมอุดมศึกษา รวมถึงดูแลเกี่ยวกับกิจกรรมเพื่อสังคมและสาธารณประโยชน์ ซึ่งเป็นงานที่ทุกห้องเรียนจะทำเป็นประจำทุกภาคเรียน นอกจากนี้ กช .ยังเป็นผู้จัดนิทรรศการวิชาการ (Triam Udom Open House) ซึ่งเป็นงานที่จัดแสดงผลงานของชมรมทุกปีอีกด้วย
          </p>
        </div>
        <div className="relative bg-white text-TUCMC-pink-500 mt-36 md:mt-44 space-y-36 md:space-y-44 pb-20">
          <div className="space-y-4">
            <div className="relative -top-24 -mb-24">
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={4}
                pagination={{clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-6xl">01</h1>
                <p className="text-xl w-min text-center font-bold leading-5">
                  กิจกรรม
                  ชมรม
                </p>
              </div>
              <p className="text-center">
                ส่วนหนึ่งของกิจกรรมพัฒนาผู้เรียน ดำเนินการโดยงานกิจกรรมพัฒนาผู้เรียน (กช.) ภายใต้การดูแลของฝ่ายวิชาการ โรงเรียนเตรียมอุดมศึกษา มีจุดประสงค์ให้นักเรียนที่มีความสนใจเดียวกันได้ทำกิจกรรมร่วมกัน เพื่อสนับสนุนให้นักเรียนได้พัฒนาศักยภาพของตนเอง การลงทะเบียนชมรมนั้นจะเริ่มขึ้นตั้งแต่ช่วงแรกของการเปิดภาคเรียนที่ 1 โดยนักเรียนทุกคนจะต้องเป็นสมาชิกชมรมคนละ 1 ชมรม
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={4}
                pagination={{clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-6xl">02</h1>
                <p className="text-xl w-min text-center font-bold leading-5">
                  กิจกรรม
                  เพื่อสังคม และ
                  สาธารณประโยชน์
                </p>
              </div>
              <p className="text-center">
                กิจกรรมสาธารณประโยชน์เป็นกิจกรรมที่ส่งเสริมให้ผู้เรียนได้สร้างประโยชน์ต่อครอบครัว ชุมชน และสังคม ในลักษณะของอาสาสมัคร โดยในแต่ละภาคเรียน ทุกห้องเรียนจะต้องมีการทำกิจกรรมสาธารณประโยชน์ให้กับหน่วยงานหรือองค์กรต่าง ๆ ไม่ว่าจะเป็นภายในหรือนอกโรงเรียน ซึ่งงานกิจกรรมพัฒนาผู้เรียน (กช.) จะเป็นผู้คอยดูแล และประสานงานกับหัวหน้าห้องเรียนต่าง ๆ ในการจัดกิจกรรมเพื่อให้สามารถดำเนินไปด้วยความเรียบร้อย
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={4}
                pagination={{clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-6xl">03</h1>
                <p className="text-xl w-min text-center font-bold leading-5">
                  <p className="whitespace-nowrap">
                    Triam Udom
                  </p>
                  <p className="whitespace-nowrap">
                    Open House
                  </p>
                </p>
              </div>
              <p className="text-center">
                กิจกรรมเปิดบ้านแนะแนวสายการเรียนและชมรมของโรงเรียนเตรียมอุดมศึกษา ให้นักเรียนที่สนใจศึกษาต่อได้รู้แนวทางของตนเองและได้รู้จักโรงเรียนในมุมมองใหม่ ๆ เป็นกิจกรรมที่เปิดโอกาสให้ผู้ที่สนใจ ไม่ว่าจะเป็นนักเรียน ผู้ปกครอง หรือคุณครู ได้พูดคุยและแลกเปลี่ยนข้อมูลแนวทางการศึกษาต่อกับนักเรียนจากแต่ละสายการเรียนโดยตรง เพื่อไขข้อสงสัยที่มีเกี่ยวกับโรงเรียนเตรียมอุดมฯ รวมถึงรับชมผลงานจากชมรมต่าง ๆ ซึ่งจะจัดขึ้นเป็นประจำทุกปี
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={4}
                pagination={{clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "256px"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-6xl">04</h1>
                <p className="text-xl w-min text-center font-bold leading-5">
                  <p className="whitespace-nowrap">
                    ตารางสอน และ
                  </p>
                  <p>ตารางสอบ</p>
                </p>
              </div>
              <p className="text-center">
                กช. ได้นำตารางสอนและตารางสอบที่โรงเรียนเป็นผู้จัดทำมาสร้างสรรค์ในรูปแบบใหม่ให้น่าอ่านและเข้าใจง่ายมากยิ่งขึ้น โดยนำมาปรับขนาดให้เหมาะกับการตั้งเป็น wallpaper หน้าจอบน Smart Phone / iPad ในส่วนของตารางสอบได้มีการทำแยกตามสายการเรียนต่าง ๆ เพื่อให้เกิดความสะดวกต่อการใช้งานของนักเรียน
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 space-y-6">
          <h1 className="text-white font-bold text-2xl text-center">อยากเป็นกช.ต้องทำยังไง ?</h1>
          <p className="text-center px-5 max-w-2xl mx-auto text-white">
            หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้หยุดสร้างต้นไม้้
          </p>
          <div className="w-[312px] h-[232px] bg-TUCMC-gray-900 mx-auto rounded-t-[48px]">
            <div className="relative bg-white w-[284px] h-[218px] rounded-t-[34px] left-[14px] top-[14px]">
              <div className="flex justify-center w-full absolute top-0">
                <div className="bg-TUCMC-gray-900 w-[140px] h-[26px] z-10 rounded-b-[16px]">

                </div>
              </div>
              <div className="relative bg-[#F6F6F6] w-[284px] h-[77px] rounded-t-[34px]">
                <span className="absolute left-6 top-1.5 font-medium text-[14px] tracking-tight">18.06</span>
                <span className="flex space-x-[2px] items-center absolute right-5 top-2.5 font-medium text-[14px] tracking-tight">
                  <ChartBarIcon className="w-3.5 h-3.5"/>
                  <WifiIcon className="w-3.5 h-3.5"/>
                  <svg width="16" height="7.38" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="10" height="4" rx="1" fill="#111827"/>
<path d="M13 3.5C13 3.77614 12.7761 4 12.5 4L12 4L12 2L12.5 2C12.7761 2 13 2.22386 13 2.5L13 3.5Z" fill="#111827"/>
<rect x="0.1" y="0.1" width="11.8" height="5.8" rx="0.9" stroke="#111827" stroke-width="0.2"/>
</svg>

                </span>
                <div className="relative top-9 w-full h-[30px] px-2">
                  <div className="flex items-center justify-between bg-[#E3E3E4] w-full h-full rounded-[8px] px-2">
                    <span className="font-medium">
                      <span className="text-[11px]">A</span>
                      <span className="text-[15px]">A</span>
                    </span>
                    <span className="text-[13px]">
                      ติดตาม กช. ได้ที่
                    </span>
                    <RefreshIcon className="w-4 h-4"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default TUCMC