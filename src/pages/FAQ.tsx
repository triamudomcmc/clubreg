import PageContainer from "@components/common/PageContainer";
import {FAQSplash} from "@vectors/decorations/FAQSplash";
import {DropDown} from "@components/FAQ/DropDown";
import Footer from "@components/common/Footer";
import {AnimateSharedLayout, motion} from "framer-motion";
import FAQElement from "@components/index/FAQ/Element";
import React from "react";

const FAQ = () => {

  return (
    <PageContainer footer={false}>
      <AnimateSharedLayout>
      <div className="py-10 md:py-16 md:pb-24 px-6 space-y-6 md:space-y-16 max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="font-semibold text-2xl text-center">คำถามที่พบบ่อย</h1>
          <FAQSplash className="w-[280px]"/>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-6">
          <div className="space-y-2 md:w-1/2">
            <DropDown title="เกี่ยวกับชมรม">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="เกี่ยวกับฝ่ายในชมรม">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="ระบบลงทะเบียนชมรม">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="Audition">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="การประกาศผล">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
          </div>
          <div className="space-y-2 md:w-1/2">
            <DropDown title="โควตายืนยันสิทธิ์ชมรมเดิม">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="ความเป็นส่วนตัว">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="เกี่ยวกับ กช.">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="อื่น ๆ Miscellaneous">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
            <DropDown title="สำหรับประธานชมรม">
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
              <FAQElement title="หากเปิดระบบแล้ว ฉันต้องทำอย่างไร ?">
                <FAQElement.Answer>
                  คำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบคำตอบ
                </FAQElement.Answer>
              </FAQElement>
            </DropDown>
          </div>
        </div>
      </div>
      <motion.div layout="position">
        <Footer/>
      </motion.div>
      </AnimateSharedLayout>
    </PageContainer>
  )
}

export default FAQ