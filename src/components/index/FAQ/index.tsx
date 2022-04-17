import React from "react"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import Router from "next/router"
import Link from "next/link"
import { Accordion } from "@components/common/Accordion"
import { AccordionIcon } from "@components/common/Accordion/Icons"

const FAQ = () => {
  return (
    <div className="bg-TUCMC-gray-100 py-14 px-8 md:py-32">
      <div className="md:flex md:justify-center">
        <div className="md:w-full md:max-w-6xl">
          <h1 className="text-center text-2xl font-bold">คำถามที่พบบ่อย</h1>
          <Link passHref href="/FAQ">
            <motion.a layout="position" className="mt-4 block cursor-pointer text-center underline hover:no-underline">
              ดูคำถามทั้งหมด
            </motion.a>
          </Link>
          <div className="mt-14 space-y-6 md:flex md:flex-row md:justify-center md:space-y-0 md:space-x-6">
            <div className="space-y-6 md:w-1/2">
              <Accordion Icon={AccordionIcon.Chevron} id="q1" title="นักเรียนสามารถอยู่ได้กี่ชมรม">
                <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
              </Accordion>
              <Accordion Icon={AccordionIcon.Chevron} id="q2" title="สามารถเปลี่ยนชมรมระหว่างปีการศึกษาได้หรือไม่">
                <Accordion.Answer>
                  ไม่สามารถเปลี่ยนชมรมระหว่างปีการศึกษาได้ แต่สามารถเลือกเข้าชมรมใหม่หลังจบปีการศึกษาได้
                </Accordion.Answer>
              </Accordion>
              <Accordion
                Icon={AccordionIcon.Chevron}
                id="q3"
                title="นักเรียน ม.5 และ ม.6 หากต้องการอยู่ชมรมเดิมต้องทำอย่างไร"
              >
                <Accordion.Answer>
                  {`หากต้องการอยู่ชมรมเดิม ให้กดปุ่มยืนยันสิทธิ์ชมรมเดิมเพื่อเข้าชมรมเดิมได้ทันที (นักเรียนบางคนจะไม่มีปุ่มยืนยันสิทธิ์ชมรมเดิม เนื่องจากบางชมรมไม่มีโควตายืนยันสิทธิ์ชมรมเดิมสำหรับกับสมาชิกเก่าในชมรม) <a href="/FAQ?req=a"><strong>ดูรายละเอียดเกี่ยวกับโควตายืนยันสิทธิ์ชมรมเดิมได้ที่นี่</strong></a> สำหรับชมรมที่ไม่มีโควตายืนยันสิทธิ์ ก็ยังสามารถลงชื่อ Audition/ลงทะเบียนเข้าชมรมเดิมได้`}
                </Accordion.Answer>
              </Accordion>
              <Accordion
                Icon={AccordionIcon.Chevron}
                id="q4"
                title="หากต้องการรอการประกาศผลสำรอง จะต้องสละสิทธิ์ชมรมที่ผ่านการ Audition ทั้งหมดใช่หรือไม่"
              >
                <Accordion.Answer>
                  ใช่ โดยการไม่เลือกยืนยันสิทธิ์หรือสละสิทธิ์ชมรมที่ผ่านการ Audition ภายในเวลาที่กำหนด
                  จะถือว่าสละสิทธิ์ชมรมนั้น ๆ โดยอัตโนมัติ
                </Accordion.Answer>
              </Accordion>
            </div>
            <div className="space-y-6 md:w-1/2">
              <Accordion
                Icon={AccordionIcon.Chevron}
                id="q5"
                title="สามารถเลือกชมรมที่มีการ Audition และไม่มีการ Audition พร้อมกันได้หรือไม่"
              >
                <Accordion.Answer>
                  ไม่ได้ เพราะถ้าลงทะเบียนเข้าชมรมที่ไม่มีการ Audition แล้ว จะถือว่าเป็นสมาชิกของชมรมนั้นทันที
                  จะไม่สามารถเลือกชมรมอื่น หรือไป Audition ชมรมใดได้อีก
                </Accordion.Answer>
              </Accordion>
              <Accordion
                Icon={AccordionIcon.Chevron}
                id="q6"
                title="ลงชื่อ Audition ในเว็บไซต์ระบบลงทะเบียนชมรมไว้แล้วจำเป็นต้องลงชื่อ Audition ที่ชมรม หรือที่ไหนอีกไหม"
              >
                <Accordion.Answer>
                  บางชมรมอาจต้องมีการลงชื่อ Audition เพิ่มเติม
                  ซึ่งนักเรียนสามารถดูรายละเอียดได้จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง
                </Accordion.Answer>
              </Accordion>
              <Accordion
                Icon={AccordionIcon.Chevron}
                id="q7"
                title="ติดตามรายละเอียดการ Audition ของแต่ละชมรมได้จากที่ไหน"
              >
                <Accordion.Answer>
                  ติดตามได้ที่ช่องทางการประชาสัมพันธ์ของชมรมโดยตรง
                  (ตรวจสอบช่องทางประชาสัมพันธ์ของชมรมได้ที่หน้าแนะนำชมรมของแต่ละชมรม)
                </Accordion.Answer>
              </Accordion>
              <Accordion Icon={AccordionIcon.Chevron} id="q8" title="ถ้าลงทะเบียนชมรมไม่ทันจะต้องทำอย่างไร">
                <Accordion.Answer>
                  หากไม่ได้เลือกลงชื่อ Audition หรือลงทะเบียนชมรมที่ไม่มีการ Audition เลย ระบบจะทำการสุ่มชมรมให้ในวันที่
                  19 มิ.ย. 2564 ทันที
                </Accordion.Answer>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
