import PageContainer from "@components/common/PageContainer";
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import "swiper/swiper-bundle.css"
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Zoomable} from "@components/common/Zoomable";
import {useRef, useState} from "react";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Index = () => {

  const [zoomOverlay ,setZoomOverlay] = useState(<></>)

  return (
    <PageContainer>
      {zoomOverlay}
      <div className="max-w-6xl mx-auto pt-8 pb-16">
        <h1 className="mb-6 text-2xl font-bold md:my-12 text-center">วิธีลงทะเบียน</h1>
        <div className="flex flex-col items-center px-8 text-TUCMC-gray-700 space-y-8 font-texts">
          <div className="flex justify-center w-[100vw] max-w-[400px] md:w-full md:max-w-[unset] md:space-x-6">
            <Swiper
              slidesPerView={1}
              navigation={{
                nextEl: '.swipe-button-next',
                prevEl: '.swipe-button-prev',
              }}
              className="w-[78vw] max-w-[400px] md:w-[400px] md:max-w-[400px]"
              pagination={{ clickable: true, bulletActiveClass: "swiper-pink"}}
            >
              <SwiperSlide>
                <div className="w-[78vw] max-w-[400px] md:w-[400px] md:max-w-[400px]">
                  <Zoomable
                    updateOverlay={setZoomOverlay}
                    width={400} height={500}
                    src="/assets/images/instruction/instruction_1.jpg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-[78vw] max-w-[400px] md:w-[400px] md:max-w-[400px]">
                  <Zoomable
                    updateOverlay={setZoomOverlay}
                    width={400} height={500}
                    src="/assets/images/instruction/instruction_2.jpg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-[78vw] max-w-[400px] md:w-[400px] md:max-w-[400px]">
                  <Zoomable
                    updateOverlay={setZoomOverlay}
                    width={400} height={500}
                    src="/assets/images/instruction/instruction_3.jpg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-[78vw] max-w-[400px] md:w-[400px] md:max-w-[400px]">
                  <Zoomable
                    updateOverlay={setZoomOverlay}
                    width={400} height={500}
                    src="/assets/images/instruction/instruction_4.jpg"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="flex flex-col space-y-10">
            <div className="flex space-x-4">
              <h1>1.</h1>
              <p>
                เข้าสู่ระบบ : นักเรียน<span className="underline">ทุกระดับชั้น</span>จะต้องสร้างบัญชีผู้ใช้งานใหม่ โดยการกดที่ปุ่ม ‘เข้าสู่ระบบ’ {">"} สร้างบัญชีใหม่ {">"} กรอกรายละเอียดตามที่ระบุไว้ {">"} กดที่ปุ่ม ‘ยืนยันตัวตน’
              </p>
            </div>
            <div className="flex space-x-4">
              <h1>2.</h1>
              <p>
                เมื่อเข้าสู่ระบบแล้ว จะเจอหน้าเลือกชมรม
              </p>
            </div>
            <div className="flex mx-auto space-x-1">
              <div className="max-w-[300px] shadow-md">
                <Image src="/assets/images/instruction/screen1.jpg" width="1080" height="3498"/>
              </div>
              <div className="max-w-[300px] shadow-md">
                <Image src="/assets/images/instruction/screen2.jpg" width="1080" height="3498"/>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>2.</h1>
              <div>
                <p>
                  สามารถดูข้อมูล รีวิว และรายละเอียดต่าง ๆ ของชมรมประกอบการตัดสินใจได้โดยการกดเข้าไปที่ชมรมที่ต้องการ จากนั้นกดปุ่ม ‘ดูรายละเอียดชมรม’
                </p>
                <p>
                  2.1. สำหรับนักเรียน ม.4 ให้เลือกลงทะเบียนชมรมที่สนใจ หากเป็นชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่ สามารถกดปุ่ม ‘ลงทะเบียน’ เพื่อเข้าชมรมนั้นได้ทันที แต่หากเป็นชมรมที่มีการ Audition นักเรียนจะต้องกดปุ่ม ‘ลงชื่อ Audition’ ไว้ก่อน แล้วจึงไป Audition ตามวันเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด
                </p>
                <p>
                  2.2. สำหรับนักเรียน ม.5 และ ม.6 ให้เลือกว่าจะอยู่ชมรมเดิมหรือเลือกชมรมใหม่ หากต้องการอยู่ชมรมเดิม ให้กดปุ่มยืนยันสิทธิ์ชมรมเดิมเพื่อเข้าชมรมเดิมได้ทันที (นักเรียนบางคนจะไม่มีปุ่มยืนยันสิทธิ์ชมรมเดิม เนื่องจากบางชมรมไม่มีโควตายืนยันสิทธิ์ชมรมเดิมสำหรับกับสมาชิกเก่าในชมรม) หากต้องการเลือกชมรมใหม่  ให้เลือกลงทะเบียนชมรมที่สนใจ หากเป็นชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่ สามารถกดปุ่ม 'ลงทะเบียน' เพื่อเข้าชมรมนั้นได้ทันที แต่หากเป็นชมรมที่มีการ Audition นักเรียนจะต้องกดปุ่ม 'ลงชื่อ Audition' ไว้ก่อน แล้วจึงไป Audition ตามวันเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด โดยติดตามรายละเอียดการ Audition ได้จากช่องทางประชาสัมพันธ์ของชมรมนั้น ๆ โดยตรง
                </p>
                <p className="text-TUCMC-green-500">
                  *สามารถลงชื่อ Audition กี่ชมรมก็ได้
                </p>
                <p className="text-TUCMC-red-500">*นักเรียน ม.5 และ ม.6 สามารถเลือกใช้โควตายืนยันสิทธิ์ชมรมเดิมได้ภายในวันที่  14 มิ.ย. 2564 เท่านั้น</p>
                <p className="text-TUCMC-red-500">*สามารถเลือกชมรมที่สนใจได้จนถึงวันที่ 14 มิ.ย. 2564 เวลา 23.59 น. เท่านั้น นักเรียนที่ไม่ลงชื่อ Audition หรือลงทะเบียนเข้าชมรมใดเลย ระบบจะทำการสุ่มชมรมให้อัตโนมัติ ในวันที่ 19 มิ.ย. 2564 โดยจะสุ่มเป็นชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่เท่านั้น</p>
                <p className="text-TUCMC-red-500">*เมื่อใช้โควตายืนยันสิทธิ์ชมรมเดิมหรือลงทะเบียนชมรมที่ไม่มีการ Audition ไปแล้ว จะถือว่าเสร็จสิ้นการลงทะเบียนชมรม จะไม่สามารถเลือกชมรมอื่น หรือไป Audition ชมรมใดได้อีก</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>3.</h1>
              <div>สำหรับนักเรียนที่ลงชื่อ Audition เอาไว้ ให้ไป Audition ตามวันเเละเวลาที่แต่ละชมรมกำหนด และรอติดตามประกาศผลการ Audition ในวันที่ 15 มิ.ย. 2564 เวลา 7.30 น.
                 <p>
                   *ถ้าไม่ลงชื่อ Audition บนหน้าเว็บระบบลงทะเบียนชมรม จะไม่สามารถเป็นสมาชิกของชมรมได้ ถึงแม้จะผ่านการ Audition เนื่องจากไม่มีชื่ออยู่ในระบบ
                 </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>4.</h1>
              <div>ทุกชมรมประกาศผลการ Audition พร้อมกันบนเว็บไซต์ในวันที่ 15 มิ.ย. 2564 เวลา 7.30 น.
                <p className="text-TUCMC-green-500">โดยนักเรียนสามารถตรวจสอบผลได้หลังจากเข้าสู่ระบบแล้ว</p>
              </div>
            </div>
            <div className="flex mx-auto">
              <div className="max-w-[300px] shadow-md">
                <Image src="/assets/images/instruction/screen3.jpg" width="1080" height="3581"/>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1 className="opacity-0">4.</h1>
              <div>
                <p>
                  4.1. หากผ่านการ Audition ให้เลือกว่าจะยืนยันสิทธิ์กับชมรมใด
                </p>
                <p>
                  4.2. หากมีทั้งชมรมที่ผ่านการ Audition และติดสำรอง นักเรียนสามารถเลือกได้ว่าจะเข้าชมรมที่ผ่านการ Audition เลย หรือรอลุ้นผลสำรองในวันที่ 16 และ 17 มิ.ย. 2564 เวลา 7.30 น.
                </p>
                <p className="text-TUCMC-red-500">
                  *หากไม่ยืนยันสิทธิ์ชมรมที่ผ่านการ Audition ภายในวันที่ 15 มิ.ย. 2564 เวลา 23.59 น. จะถือว่าสละสิทธิ์ชมรมที่ผ่านการ Audition โดยอัตโนมัติ และจะไม่สามารถกลับมายืนยันสิทธิ์ชมรมนั้นได้อีก
                </p>
                <p>
                  4.3. หากติดสำรองทุกชมรมที่ลงชื่อ Audition ไว้ ให้รอลุ้นผลสำรองสองรอบในวันที่ 16 และ 17 มิ.ย. 2564 เวลา 7.30 น.
                </p>
                <p>
                  4.4. หากไม่ผ่านการ Audition และไม่ติดสำรองชมรมใดเลย ให้เลือกเข้าชมรมที่ไม่มีการ Audition เเละยังมีที่ว่างเหลืออยู่ในวันที่ 18 มิ.ย. 2564
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>5.</h1>
              <p>
                การประกาศผลสำรองจะมีทั้งหมด 2 รอบ รอบแรกในวันที่ 16 มิ.ย. 2564 เวลา 7.30 น. และรอบ 2 ในวันที่ 17 มิ.ย. 2564 เวลา 7.30 น. <span className="text-TUCMC-green-500">โดยนักเรียนสามารถตรวจสอบผลได้หลังจากเข้าสู่ระบบแล้ว</span>
              </p>
            </div>
            <div className="flex mx-auto">
              <div className="max-w-[300px] shadow-md">
                <Image src="/assets/images/instruction/screen4.jpg" width="1080" height="3500"/>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1 className="opacity-0">5.</h1>
              <div>
                <p>
                  5.1. หากผ่านการ Audition (สำรองรอบที่ 1) ให้เลือกว่าจะยืนยันสิทธิ์กับชมรมใด
                </p>
                <p>
                  5.2. หากมีทั้งชมรมที่ผ่านการ Audition (สำรองรอบที่ 1) และชมรมที่ยังคงติดสำรองอยู่ (กรณี Audition หลายชมรม) นักเรียนสามารถเลือกได้ว่าจะเข้าชมรมที่ผ่านการ Audition (สำรองรอบที่ 1) เลย หรือรอลุ้นผลสำรองรอบที่ 2 ในวันที่ 17 มิ.ย. 2564 เวลา 7.30 น.
                </p>
                <p className="text-TUCMC-red-500">
                  *หากไม่ยืนยันสิทธิ์ชมรมที่ผ่านการ Audition ภายในวันที่ 16 มิ.ย. 2564 เวลา 23.59 น. จะถือว่าสละสิทธิ์ชมรมที่ผ่านการ Audition (สำรองรอบที่ 1) โดยอัตโนมัติ และจะไม่สามารถกลับมายืนยันสิทธิ์ชมรมนั้นได้อีก
                </p>
                <p>
                  5.3. หากยังไม่ถูกเรียกสำรองรอบที่ 1 สามารถรอลุ้นผลสำรองรอบที่ 2 ในวันที่ 17 มิ.ย. 2564 เวลา 7.30 น.
                </p>
                <p>
                  5.4. หลังจากประกาศผลสำรองรอบที่ 2 หากผ่านการ Audition (สำรองรอบที่ 2) ให้เลือกยืนยันสิทธิ์ หรือสละสิทธิ์ชมรมนั้น ๆ
                </p>
                <p className="text-TUCMC-red-500">
                  *หากไม่ยืนยันสิทธิ์ชมรมที่ผ่านการ Audition ภายในวันที่ 17 มิ.ย. 2564 เวลา 23.59 น. จะถือว่าสละสิทธิ์ชมรมที่ผ่านการ Audition (สำรองรอบที่ 2) โดยอัตโนมัติ และจะไม่สามารถกลับมายืนยันสิทธิ์ชมรมนั้นได้อีก
                </p>
                <p>
                  5.5. หลังจากประกาศผลสำรองรอบที่ 2 หากไม่ผ่านการ Audition ชมรมใดเลย ให้เลือกเข้าชมรมที่ไม่มีการ Audition เเละยังมีที่ว่างเหลืออยู่ในวันที่ 18 มิ.ย. 2564
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>6.</h1>
              <p>สำหรับนักเรียนที่ไม่ผ่านการ Audition ชมรมใดเลย หรือสละสิทธิ์ทุกชมรมที่ผ่านการ Audition  ให้เลือกเข้าชมรมที่ไม่มีการ Audition และยังมีที่ว่างเหลืออยู่ </p>
            </div>
            <div className="flex mx-auto">
              <div className="max-w-[300px] shadow-md">
                <Image src="/assets/images/instruction/screen6.jpg" width="1080" height="2818"/>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1 className="opacity-0">6.</h1>
              <div>
                <p>
                  สามารถดูข้อมูล รีวิว และรายละเอียดต่าง ๆ ของชมรมประกอบการตัดสินใจได้โดยการกดเข้าไปที่ชมรมที่ต้องการ จากนั้นกดปุ่ม 'ดูรายละเอียดชมรม'
                </p>
                <p>
                  6.1. หากเลือกชมรมที่ต้องการได้แล้ว ให้กดปุ่ม ‘ลงทะเบียน’ เพื่อเข้าชมรมนั้นได้เลย
                </p>
                <p className="text-TUCMC-red-500">
                  *หากไม่เลือกลงทะเบียนชมรมภายในวันที่ 18 มิ.ย. 2564 เวลา 23.59 น. ระบบจะทำการสุ่มชมรมให้โดยอัตโนมัติ และจะไม่สามารถกดเลือกชมรมใดได้อีก
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>7.</h1>
              <p>
                เมื่อยืนยันการลงทะเบียนแล้ว จะถือว่าเสร็จสิ้นการลงทะเบียนชมรม และเป็นสมาชิกของชมรมนั้นแล้ว ให้ดาวน์โหลดรูปภาพหรือถ่ายภาพหน้าจอเก็บไว้เป็นหลักฐาน
              </p>
            </div>
            <div className="flex mx-auto">
              <div className="max-w-[300px] shadow-md">
                <Image src="/assets/images/instruction/screen5.jpg" width="1080" height="2641"/>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>8.</h1>
              <div>
                <p>
                  ตรวจสอบความถูกต้องของชมรมตนเอง หากมีข้อสงสัย สามารถติดต่อชมรมได้โดยตรง หรือติดต่องานกิจกรรมพัฒนาผู้เรียน (กช.) ผ่านทาง
                </p>
                <p>
                  Facebook : <a target="_blank" href="https://www.facebook.com/triamudomclubs" className="hover:text-TUCMC-pink-500 hover:underline">@triamudomclubs</a>
                </p>
                <p>
                  Instagram : <a target="_blank" href="https://instagram.com/tucmc_official" className="hover:text-TUCMC-pink-500 hover:underline">@tucmc_official</a>
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <h1>9.</h1>
              <p>
                เริ่มเรียนชมรมคาบแรกในวันที่ 21 มิ.ย. 2564 ตรวจสอบรายละเอียดเกี่ยวกับสถานที่เรียนชมรม หรือกิจกรรมของชมรมได้ผ่านทางช่องทางประชาสัมพันธ์ของชมรม
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
