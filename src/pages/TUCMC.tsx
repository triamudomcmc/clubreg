import PageContainer from "@components/common/PageContainer";
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import "swiper/swiper-bundle.css"
SwiperCore.use([ Pagination]);
const TUCMC = () => {
  return (
    <PageContainer>
      <div className="bg-TUCMC-pink-500">
        <div className="space-y-6 text-white px-6">
          <div className="w-full px-4 mb-[-50%]">
            <Image src="/assets/images/placeholder/yeeta.png" width={500} height={500} className="object-cover circle-clip"/>
          </div>
          <h1 className="font-bold text-4xl text-center pt-4">กช. คืออะไร ?</h1>
          <p className="text-lg text-center">
            คณะกรรมการงานกิจกรรมพัฒนาผู้เรียน (กช.) มีหน้าที่กำกับดูแลกิจกรรมของงานกิจกรรมพัฒนาผู้เรียน ได้แก่ งานเปิดบ้านเตรียมอุดมฯ (Open House) กิจกรรมเพื่อสังคมและสาธารณประโยชน์ กิจกรรมชมรม คทากรโรงเรียน และกิจกรรมอื่น ๆ ที่กลุ่มบริหารวิชาการบอมหมาย
          </p>
        </div>
        <div className="relative bg-white text-TUCMC-pink-500 mt-36 space-y-32 mb-20">
          <div className="space-y-4">
            <div className="relative -top-24 -mb-24">
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={2}
                pagination={{ clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-6xl">01</h1>
                <p className="text-xl w-min text-center font-bold leading-5">
                  กิจกรรม
                  ชมรม
                </p>
              </div>
              <p className="text-center">
                คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={2}
                pagination={{ clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-6xl">02</h1>
                <p className="text-xl w-min text-center font-bold leading-5">
                  กิจกรรม
                  เพื่อสังคม และ
                  สาธารณประโยชน์
                </p>
              </div>
              <p className="text-center">
                คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={2}
                pagination={{ clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6">
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
                คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Swiper
                slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} initialSlide={2}
                pagination={{ clickable: true, bulletActiveClass: "swiper-pink"}}
              >
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{width: "60%"}}>
                  <div className="w-[256px]">
                    <Image
                      width="456" height="302"
                      src="/assets/images/placeholder/maew.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="space-y-5 px-6">
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
                คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default TUCMC