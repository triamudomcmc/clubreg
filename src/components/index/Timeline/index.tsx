import {ClipboardCopyIcon, StarIcon, UserGroupIcon, UserIcon} from "@heroicons/react/solid";
import TimelineTag from "@components/index/Timeline/TimelineTag";
import React from "react";

const Timeline = () => {
  return (
    <div className="md:flex md:justify-center">
      <div className="mx-8 py-14 md:py-32 md:w-full md:max-w-6xl">
        <h1 className="font-bold text-2xl text-center">Timeline</h1>
        <div className="flex md:hidden flex-row tracking-tight w-full mt-12">
              <span
                className="flex items-center justify-center w-1/2 border-b border-TUCMC-red-400 text-TUCMC-red-400">
                <StarIcon className="w-5 h-5"/>
                <span className="pl-1">มีการ Audition</span>
              </span>
          <span
            className="flex items-center justify-center w-1/2 border-b border-TUCMC-gray-400 text-TUCMC-gray-400">
                <ClipboardCopyIcon className="w-5 h-5"/>
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
              <TimelineTag date="1 มิ.ย. 64" time="11.30 น." title="สมัครและ Audition"
                           subTitle="สร้างบัญชีและลงชื่อ Audition ชมรมที่ต้องการ">
                <TimelineTag.Desc>
                  ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนดโดยติดตามรายละเอียด
                  การ audition จากช่องทางประชาสัมพันธ์
                  ของชมรมนั้นโดยตรง
                </TimelineTag.Desc>
                <TimelineTag.ExtraDescription>
                  ภายในวันที่ 8 มิ.ย. 64 เวลา 23.59 น.
                </TimelineTag.ExtraDescription>
              </TimelineTag>
              <TimelineTag date="8 มิ.ย. 64" time="23.59 น."
                           title="สิ้นสุดการสมัครและ Audition">
                <TimelineTag.Desc>
                  หากไม่ดำเนินการลงชื่อชมรมใด ๆ เลยก่อนสิ้นสุดระยะเวลาการสมัคร
                  และ Audition ระบบจะทำการสุ่ม
                  ชมรมให้อัตโนมัติ
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="9 มิ.ย. 64" time="07.30 น." title="ประกาศผลการ Audition">
                <TimelineTag.Desc>
                  นักเรียนที่ผ่านการ Audition เลือกกดยืนยันสิทธิ์หรือสละสิทธิ์
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="10 มิ.ย. 64" time="07.30 น.">
                <TimelineTag.Desc>
                  เรียกลำดับสำรอง รอบที่ 1
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="11 มิ.ย. 64" time="07.30 น.">
                <TimelineTag.Desc>
                  เรียกลำดับสำรอง รอบที่ 2
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="12 มิ.ย. 64" subTitle="(เฉพาะนักเรียนที่ Audition ไม่ผ่าน)">
                <TimelineTag.Desc>
                  เลือกเข้าชมรมที่ไม่มีการ Audition และยังมีที่นั่งว่างอยู่
                </TimelineTag.Desc>
              </TimelineTag>
              <TimelineTag date="14 มิ.ย. 64" last={true} title="เริ่มเรียนชมรมคาบแรก">
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
  )
}

export default Timeline