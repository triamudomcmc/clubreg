import IndexSplash from "@vectors/decorations/IndexSplash";
import TimelineTag from "@components/index/timeline/TimelineTag";
import FAQ from "@components/index/FAQ";
import React, {useEffect} from "react";
import IndexBottom from "@vectors/decorations/IndexBottom";
import PageContainer from "@components/common/PageContainer";
import Link from "next/link"
import {
  ClipboardCopyIcon,
  InformationCircleIcon,
  StarIcon,
  UserGroupIcon, UserIcon
} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import {Tracker} from "@client/tracker/track";
import {useAuth} from "@client/auth";

const Index = () => {

  const {tracker} = useAuth()

  return (
    <PageContainer>
      <div className="h-full bg-TUCMC-pink-400">
        <div className="flex justify-center">
          <div
            className="flex flex-col items-center md:flex-row-reverse md:justify-between md:w-full md:max-w-6xl md:py-0 lg:py-20 mx-8 px-8 xl:px-0">
            <IndexSplash
              className="mt-10 md:square-450px md:ml-12 md:mt-0 md:max-w-sm lg:max-w-none md:h-420px"/>
            <div
              className="flex flex-col my-8 py-0 md:py-5 lg:py-0 items-center md:items-start md:justify-between md:h-full md:max-h-96">
              <div className="md:mt-10 lg:mt-2 flex flex-col items-center md:block px-1">
                <h1
                  className="font-black tracking-tight text-3xl text-white md:tracking-normal whitespace-nowrap md:text-4xl lg:text-6xl">ระบบลงทะเบียนชมรม</h1>
                <h1
                  className="font-regular tracking-normal text-2xl text-white md:text-3xl md:tracking-tight lg:text-5xl md:pt-2 lg:pt-4">โรงเรียนเตรียมอุดมศึกษา</h1>
                <p
                  className="tracking-tight text-white mt-2 md:mt-2 lg:mt-4 md:text-xl lg:text-3xl">ปีการศึกษา
                  2564</p>
              </div>
              {/*<div
                className="hidden md:flex flex-row space-x-2 justify-center text-TUCMC-gray-900">
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
                  <span className="text-white font-bold text-xs mt-2">DAY</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
                  <span className="text-white font-bold text-xs mt-2">HOUR</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
                  <span className="text-white font-bold text-xs mt-2">MIN</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-white font-bold text-3xl p-2 shadow-md rounded-lg">53</span>
                  <span className="text-white font-bold text-xs mt-2">SEC</span>
                </div>
              </div>*/}
              <div className="hidden md:flex flex-col h-full justify-end">
                <Button href="/auth" className="bg-white text-TUCMC-pink-600 shadow-lg font-bold px-12 lg:px-[4.5rem] rounded-full text-xl lg:text-2xl py-3 lg:py-3.5 mb-4">
                  <span>เข้าสู่ระบบ</span>
                </Button>
              </div>
              <div className="hidden md:block font-medium text-white px-1">
                <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                <p>ในวันที่ 17 พ.ค. 2564 เวลา 11.30 น.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-full rounded-t-5xl mt-8 md:mt-0">
          {/*<div
            className="flex md:hidden flex-row space-x-2 relative -top-6 justify-center text-TUCMC-gray-900">
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
          </div>*/}
          <div
            className="flex md:hidden flex-row relative -top-7 justify-center">
            <Button href="auth" className="bg-white text-TUCMC-pink-600 shadow-lg font-bold px-[4.5rem] rounded-full text-2xl py-3.5 mb-4">
              <span>เข้าสู่ระบบ</span>
            </Button>
          </div>
          <div className="md:hidden mx-8 mt-6 mb-14">
            <div
              className="flex flex-row bg-TUCMC-pink-100 space-x-4 text-TUCMC-pink-500 p-4 rounded-lg">
              <InformationCircleIcon className="w-6 h-6"/>
              <div className="font-medium">
                <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                <p>ในวันที่ 17 พ.ค. 2564 เวลา 11.30 น.</p>
              </div>
            </div>
          </div>
          <div className="bg-TUCMC-gray-100 py-14">
            <div className="md:flex md:justify-center">
              <div
                className="mx-6 space-y-8 md:w-full md:max-w-6xl md:flex md:flex-col xl:flex-row xl:items-center xl:space-y-0 xl:space-x-4 md:items-center">
                <div className="md:flex md:flex-row md:space-x-4 space-y-8 md:space-y-0">
                  <div
                    className="flex flex-row items-end justify-between shadow-lg bg-TUCMC-pink-400 md:bg-white rounded-xl md:rounded-lg px-7 pt-4 pb-6">
                    <div className="md:hidden">
                      <h1
                        className="text-white font-bold tracking-tighter leading-10 text-6xl">กช.</h1>
                      <h1
                        className="text-white font-normal tracking-tight leading-6 text-3xl mt-3 text-bottom">คืออะไร
                        ?</h1>
                    </div>
                    <div className="hidden md:block text-TUCMC-pink-400">
                      <h1
                        className="font-bold tracking-tighter leading-10 text-6xl md:text-5xl">กช.</h1>
                      <h1
                        className="font-normal tracking-tight whitespace-nowrap leading-6 md:leading-3 text-3xl md:text-2xl mt-3 text-bottom">คืออะไร
                        ?</h1>
                    </div>
                    <img className="w-32 md:w-28 md:hidden" src="/assets/images/menu1.png"/>
                    <img className="w-32 md:w-28 hidden md:block ml-4"
                         src="/assets/images/menu1-2.png"/>
                  </div>
                  <div
                    className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl md:rounded-lg px-7 py-5">
                    <div className="flex-shrink-0 w-1/2">
                      <h1
                        className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">วิธีใช้</h1>
                    </div>
                    <img className="w-36 md:w-32" src="/assets/images/menu2.png"/>
                  </div>
                </div>
                <div className="md:flex md:flex-row md:space-x-4 space-y-8 md:space-y-0">
                  <div
                    className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl md:rounded-lg px-7 pb-4 pt-2">
                    <div>
                      <h1
                        className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">ชมรม</h1>
                    </div>
                    <img className="w-32 md:w-28 md:pl-2" src="/assets/images/menu3.png"/>
                  </div>
                  <div
                    className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl md:rounded-lg px-7 py-5">
                    <div>
                      <h1
                        className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">FAQ</h1>
                    </div>
                    <img className="w-36 md:w-32" src="/assets/images/menu4.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-center">
            <div className="mx-8 py-14 md:py-32 md:w-full md:max-w-6xl">
              <h1 className="font-bold text-2xl text-center">Timeline</h1>
              <div className="flex md:hidden flex-row tracking-tight w-full mt-12">
              <span
                className="flex items-center justify-center w-1/2 border-b border-TUCMC-red-400 text-TUCMC-red-400">
                <StarIcon/>
                <span className="pl-1">มีการ Audition</span>
              </span>
                <span
                  className="flex items-center justify-center w-1/2 border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
                <ClipboardCopyIcon/>
                <span className="pl-1">ไม่มีการ Audition</span>
              </span>
              </div>
              <div className="md:flex md:flex-row md:space-x-16 md:justify-between md:mt-12">
                <div className="md:max-w-xl">
                  <div className="flex flex-row items-end px-5 space-x-4 my-12">
                    <UserGroupIcon className="flex-shrink-0 w-14"/>
                    <div className="tracking-tight">
                      <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่่มีการ Audition</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <TimelineTag date="17 พ.ค. 64" time="11.30 น." title="สมัครและ Audition"
                                 subTitle="สร้างบัญชีและลงชื่อ Audition ชมรมที่ต้องการ">
                      <TimelineTag.Desc>
                        ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนดโดยติดตามรายละเอียด
                        การ audition จากช่องทางประชาสัมพันธ์
                        ของชมรมนั้นโดยตรง
                      </TimelineTag.Desc>
                      <TimelineTag.ExtraDescription>
                        ภายในวันที่ 24 พ.ค. 64 เวลา 23.59 น.
                      </TimelineTag.ExtraDescription>
                    </TimelineTag>
                    <TimelineTag date="24 พ.ค. 64" time="23.59 น."
                                 title="สิ้นสุดการสมัครและ Audition">
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
                <div className="hidden md:flex flex-col md:max-w-xl">
                  <div className="flex flex-row items-end px-5 space-x-4 my-12">
                    <UserIcon className="flex-shrink-0 w-14"/>
                    <div className="tracking-tight">
                      <p>สำหรับนักเรียนที่ต้องการเข้าชมรมที่่มีการ Audition</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <TimelineTag date="17 พ.ค. 64" time="11.30 น." title="สมัครและ Audition"
                                 subTitle="สร้างบัญชีและลงชื่อ Audition ชมรมที่ต้องการ">
                      <TimelineTag.Desc>
                        ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนดโดยติดตามรายละเอียด
                        การ audition จากช่องทางประชาสัมพันธ์
                        ของชมรมนั้นโดยตรง
                      </TimelineTag.Desc>
                      <TimelineTag.ExtraDescription>
                        ภายในวันที่ 24 พ.ค. 64 เวลา 23.59 น.
                      </TimelineTag.ExtraDescription>
                    </TimelineTag>
                    <TimelineTag date="24 พ.ค. 64" time="23.59 น."
                                 title="สิ้นสุดการสมัครและ Audition">
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
              </div>
            </div>
          </div>
          <div className="bg-TUCMC-gray-100 py-14 md:py-32 px-8">
            <div className="md:flex md:justify-center">
              <div className="md:w-full md:max-w-6xl">
                <h1 className="font-bold text-2xl text-center">คำถามที่พบบ่อย</h1>
                <div
                  className="mt-14 space-y-6 md:flex md:flex-row md:space-y-0 md:justify-center md:space-x-6">
                  <div className="space-y-6 md:w-1/2">
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
                  </div>
                  <div className="space-y-6 md:w-1/2">
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
                </div>
                <h1 className="underline text-center pt-14 md:pt-28">ดูคำถามทั้งหมด</h1>
              </div>
            </div>
          </div>
          <div className="mx-8 pt-16 pb-24 md:mx-0 md:pt-0 md:pb-0">
            <div
              className="flex flex-col items-center rounded-3xl mx-auto max-w-md md:mx-0 md:max-w-none md:rounded-none bg-TUCMC-pink-400">
              <div
                className="flex flex-col items-center md:flex-row md:w-full md:max-w-5xl md:flex md:items-start md:justify-between md:px-8">
                <div className="md:flex md:flex-col md:items-start text-white my-10 md:mt-20">
                  <h1
                    className="font-bold tracking-tight text-7xl md:tracking-normal md:text-8xl">ชมรม</h1>
                  <h1 className="font-medium text-2xl md:text-4xl md:ml-1">กว่า 80+ ชมรม</h1>
                  <Button href="/clubs" onClick={() => {tracker.push("click", "index_clubs_button")}} className="hidden md:block mt-10 text-black font-medium ml-21 shadow-lg bg-white rounded-5xl px-11 py-4">
                    <span className="text-2xl">ดูทั้งหมด</span>
                  </Button>
                </div>
                <IndexBottom className="w-80 md:square-400px mb-16 mt-4"/>
                <div
                  className="md:hidden relative -bottom-6 shadow-lg bg-white rounded-5xl px-10 py-3_5">
                  <Link href="/clubs">
                    <span className="cursor-pointer text-2xl">ดูทั้งหมด</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Index