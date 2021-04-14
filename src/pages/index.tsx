import Navigation from "@components/common/Navigation";
import IndexSplash from "@vectors/decorations/IndexSplash";
import {FilledInfo} from "@vectors/icons/Info";
import {MenuList1} from "@vectors/decorations/IndexMenu";
import {FilledStar} from "@vectors/icons/Star";
import {FilledClipboard} from "@vectors/icons/Clipboard";
import {FilledUsergroup} from "@vectors/icons/Usergroup";
import {Line} from "@components/index/timeline/Line";
import TimelineTag from "@components/index/timeline/TimelineTag";
import {Plus} from "@vectors/buttons/Symbols";
import FAQ from "@components/index/FAQ";
import React from "react";
import IndexBottom from "@vectors/decorations/IndexBottom";
import Footer from "@components/common/Footer";

const Index = () => {
  return (
    <div className="font-display">
      <Navigation/>
      <div className="h-full bg-TUCMC-pink-400">
        <div className="flex flex-col items-center">
          <IndexSplash className="mt-10"/>
          <div className="flex flex-col my-8 items-center">
            <h1 className="font-black tracking-tight text-3xl text-white">ระบบลงทะเบียนชมรม</h1>
            <h1 className="font-regular tracking-normal text-2xl text-white">โรงเรียนเตรียมอุดมศึกษา</h1>
            <p className="tracking-tight text-white mt-2">ปีการศึกษา 2564</p>
          </div>
        </div>
        <div className="bg-white h-full rounded-t-5xl mt-8">
          <div className="flex flex-row space-x-2 relative -top-6 justify-center text-TUCMC-gray-900">
            <div className="flex flex-col items-center">
              <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
              <span className="text-gray-500 font-bold text-xs mt-2">DAY</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
              <span className="text-gray-500 font-bold text-xs mt-2">HOUR</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
              <span className="text-gray-500 font-bold text-xs mt-2">MIN</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
              <span className="text-gray-500 font-bold text-xs mt-2">SEC</span>
            </div>
          </div>
          <div className="mx-8 mt-6 mb-14">
            <div className="flex flex-row bg-TUCMC-pink-100 space-x-4 text-TUCMC-pink-500 p-4 rounded-lg">
              <FilledInfo className="w-6 h-6"/>
              <div className="font-medium">
                <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                <p>ในวันที่ 17 พ.ค. 2564 เวลา 11.30 น.</p>
              </div>
            </div>
          </div>
          <div className="bg-TUCMC-gray-100 py-14">
            <div className="mx-6 space-y-8">
              <div className="flex flex-row items-end justify-between shadow-lg bg-TUCMC-pink-400 rounded-xl px-9 pt-4 pb-6">
                <div>
                  <h1 className="text-white font-bold tracking-tighter leading-10 text-6xl">กช.</h1>
                  <h1 className="text-white font-normal tracking-tight leading-6 text-3xl mt-3 text-bottom">คืออะไร ?</h1>
                </div>
                <img className="w-32" src="/assets/images/menu1.png"/>
              </div>
              <div className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl px-9 py-5">
                <div className="flex-shrink-0 w-1/2">
                  <h1 className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">วิธีใช้</h1>
                </div>
                <img className="w-36" src="/assets/images/menu2.png"/>
              </div>
              <div className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl px-9 py-5">
                <div>
                  <h1 className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">ชมรม</h1>
                </div>
                <img className="w-28" src="/assets/images/menu3.png"/>
              </div>
              <div className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl px-9 py-5">
                <div>
                  <h1 className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">FAQ</h1>
                </div>
                <img className="w-36" src="/assets/images/menu4.png"/>
              </div>
            </div>
          </div>
          <div className="mx-8 py-14">
            <h1 className="font-bold text-2xl text-center">Timeline</h1>
            <div className="flex flex-row tracking-tight w-full mt-12">
              <span className="flex items-center justify-center w-1/2 border-b border-TUCMC-red-400 text-TUCMC-red-400">
                <FilledStar/>
                <span className="pl-1">มีการ Audition</span>
              </span>
              <span className="flex items-center justify-center w-1/2 border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
                <FilledClipboard/>
                <span className="pl-1">ไม่มีการ Audition</span>
              </span>
            </div>
            <div className="flex flex-row items-end px-5 space-x-4 my-12">
              <FilledUsergroup className="flex-shrink-0 w-14"/>
              <div className="tracking-tight">
                <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่่มีการ Audition</p>
              </div>
            </div>
            <div className="space-y-8">
              <TimelineTag date="17 พ.ค. 64" time="11.30 น." title="สมัครและ Audition" subTitle="สร้างบัญชีและลงชื่อ Audition ชมรมที่ต้องการ">
                <TimelineTag.Desc>
                  ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนดโดยติดตามรายละเอียด
                  การ audition จากช่องทางประชาสัมพันธ์
                  ของชมรมนั้นโดยตรง
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>
                  ภายในวันที่ 24 พ.ค. 64 เวลา 23.59 น.
                </TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag date="24 พ.ค. 64" time="23.59 น." title="สิ้นสุดการสมัครและ Audition">
                <TimelineTag.Desc>
                  หากไม่ดำเนินการลงชื่อชมรมใด ๆ เลยก่อนสิ้นสุดระยะเวลาการสมัคร
                  และ Audition ระบบจะทำการสุ่ม
                  ชมรมให้อัตโนมัติ
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="25 พ.ค. 64" time="07.30 น." title="ประกาศผลการ Audition">
                <TimelineTag.Desc>
                  นักเรียนที่ผ่านการ Audition เลือกกดยืนยันสิทธิ์หรือสละสิทธิ์
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="26 พ.ค. 64" time="07.30 น.">
                <TimelineTag.Desc>
                  เรียกลำดับสำรอง รอบที่ 1
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="27 พ.ค. 64" time="07.30 น.">
                <TimelineTag.Desc>
                  เรียกลำดับสำรอง รอบที่ 2
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="28 พ.ค. 64" subTitle="(เฉพาะนักเรียนที่ Audition ไม่ผ่าน)">
                <TimelineTag.Desc>
                  เลือกเข้าชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="31 พ.ค. 64" last={true} title="เริ่มเรียนชมรมคาบแรก">
              </TimelineTag>
            </div>
          </div>
          <div className="bg-TUCMC-gray-100 py-14 px-8">
            <h1 className="font-bold text-2xl text-center">คำถามที่พบบ่อย</h1>
            <div className="mt-14 space-y-6">
              <FAQ title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQ.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQ.Answer>
              </FAQ>
              <FAQ title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQ.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQ.Answer>
              </FAQ>
              <FAQ title="หากต้องการเข้าชมรมที่มีการ Audition ต้องทำอย่างไร ?">
                <FAQ.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQ.Answer>
              </FAQ>
              <FAQ title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQ.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQ.Answer>
              </FAQ>
              <FAQ title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQ.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQ.Answer>
              </FAQ>
              <FAQ title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQ.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQ.Answer>
              </FAQ>
            </div>
            <h1 className="underline text-center pt-14">ดูคำถามทั้งหมด</h1>
          </div>
          <div className="mx-8 pt-16 pb-24">
            <div className="flex flex-col items-center rounded-3xl bg-TUCMC-pink-400">
              <div className="text-white my-10">
                <h1 className="font-bold tracking-tight text-7xl">ชมรม</h1>
                <h1 className="font-medium text-2xl">กว่า 80+ ชมรม</h1>
              </div>
              <IndexBottom className="w-80 mb-16 mt-4"/>
              <div className="relative -bottom-6 shadow-lg bg-white rounded-5xl px-10 py-3_5">
                <span className="text-2xl">ดูทั้งหมด</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Index