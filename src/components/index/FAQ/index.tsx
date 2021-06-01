import React from "react";
import FAQElement from "@components/index/FAQ/Element";
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion";
import Router from "next/router";

const FAQ = () => {
  return (
    <div className="bg-TUCMC-gray-100 py-14 md:py-32 px-8">
      <div className="md:flex md:justify-center">
        <div className="md:w-full md:max-w-6xl">
          <h1 className="font-bold text-2xl text-center">คำถามที่พบบ่อย</h1>
            <div
              className="mt-14 space-y-6 md:flex md:flex-row md:space-y-0 md:justify-center md:space-x-6">
              <div className="space-y-6 md:w-1/2">
                <FAQElement title="นักเรียนสามารถอยู่ได้กี่ชมรม">
                  <FAQElement.Answer>
                    1 ชมรมเท่านั้น
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="สามารถเปลี่ยนชมรมระหว่างปีการศึกษาได้หรือไม่">
                  <FAQElement.Answer>
                    ไม่สามารถเปลี่ยนชมรมระหว่างปีการศึกษาได้ แต่สามารถเลือกเข้าชมรมใหม่หลังจบปีการศึกษาได้
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="นักเรียน ม.5 และ ม.6 หากต้องการอยู่ชมรมเดิมต้องทำอย่างไร">
                  <FAQElement.Answer>
                    {`หากต้องการอยู่ชมรมเดิม ให้กดปุ่มยืนยันสิทธิ์ชมรมเดิมเพื่อเข้าชมรมเดิมได้ทันที (นักเรียนบางคนจะไม่มีปุ่มยืนยันสิทธิ์ชมรมเดิม เนื่องจากบางชมรมไม่มีโควตายืนยันสิทธิ์ชมรมเดิมสำหรับกับสมาชิกเก่าในชมรม) <a href="/FAQ?req=a"><strong>ดูรายละเอียดเกี่ยวกับโควตายืนยันสิทธิ์ชมรมเดิมได้ที่นี่</strong></a> สำหรับชมรมที่ไม่มีโควตายืนยันสิทธิ์ ก็ยังสามารถลงชื่อ Audition/ลงทะเบียนเข้าชมรมเดิมได้`}
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="หากต้องการรอการประกาศผลสำรอง จะต้องสละสิทธิ์ชมรมที่ผ่านการ Audition ทั้งหมดใช่หรือไม่">
                  <FAQElement.Answer>
                    ใช่  โดยการไม่เลือกยืนยันสิทธิ์หรือสละสิทธิ์ชมรมที่ผ่านการ Audition ภายในเวลาที่กำหนด จะถือว่าสละสิทธิ์ชมรมนั้น ๆ โดยอัตโนมัติ
                  </FAQElement.Answer>
                </FAQElement>
              </div>
              <div className="space-y-6 md:w-1/2">
                <FAQElement title="สามารถเลือกชมรมที่มีการ Audition และไม่มีการ Audition พร้อมกันได้หรือไม่">
                  <FAQElement.Answer>
                    ไม่ได้ เพราะถ้าลงทะเบียนเข้าชมรมที่ไม่มีการ Audition แล้ว จะถือว่าเป็นสมาชิกของชมรมนั้นทันที จะไม่สามารถเลือกชมรมอื่น หรือไป Audition ชมรมใดได้อีก
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="ลงชื่อ Audition ในเว็บไซต์ระบบลงทะเบียนชมรมไว้แล้วจำเป็นต้องลงชื่อ Audition ที่ชมรม หรือที่ไหนอีกไหม">
                  <FAQElement.Answer>
                    บางชมรมอาจต้องมีการลงชื่อ Audition เพิ่มเติม ซึ่งนักเรียนสามารถดูรายละเอียดได้จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="ติดตามรายละเอียดการ Audition ของแต่ละชมรมได้จากที่ไหน">
                  <FAQElement.Answer>
                    ติดตามได้ที่ช่องทางการประชาสัมพันธ์ของชมรมโดยตรง (ตรวจสอบช่องทางประชาสัมพันธ์ของชมรมได้ที่หน้าแนะนำชมรมของแต่ละชมรม)
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="ถ้าลงทะเบียนชมรมไม่ทันจะต้องทำอย่างไร">
                  <FAQElement.Answer>
                    หากไม่ได้เลือกลงชื่อ Audition หรือลงทะเบียนชมรมที่ไม่มีการ Audition เลย ระบบจะทำการสุ่มชมรมให้ในวันที่ 19 มิ.ย. 2564 ทันที
                  </FAQElement.Answer>
                </FAQElement>
              </div>
            </div>
            <motion.h1 onClick={() => {Router.push("/FAQ")}} layout="position" className="underline text-center pt-14 md:pt-28 cursor-pointer">ดูคำถามทั้งหมด</motion.h1>
        </div>
      </div>
    </div>
  )
}

export default FAQ