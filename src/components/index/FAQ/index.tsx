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
                <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                  <FAQElement.Answer>
                    คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                  <FAQElement.Answer>
                    คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="หากต้องการเข้าชมรมที่มีการ Audition ต้องทำอย่างไร ?">
                  <FAQElement.Answer>
                    คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                  </FAQElement.Answer>
                </FAQElement>
              </div>
              <div className="space-y-6 md:w-1/2">
                <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                  <FAQElement.Answer>
                    คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                  <FAQElement.Answer>
                    คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                  </FAQElement.Answer>
                </FAQElement>
                <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                  <FAQElement.Answer>
                    คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
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