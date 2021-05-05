import PageContainer from "@components/common/PageContainer";
import {
  ClipboardCopyIcon,
  UserIcon,
  GlobeAltIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { ClubCard } from "@components/clubs/ClubCard";
import { useState } from "react";

const Template = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <img
          className="object-cover w-full"
          src="/assets/images/placeholder/thumb1.png"
        ></img>
        <div className="my-8">
          <h1 className="px-4 text-lg font-bold">
            ชมรมภาษาอังกฤษ (English Drama)
          </h1>
          <h2 className="px-4 font-light ">
            Triamudomsuksa wind symphonic band
          </h2>
        </div>
        <div className="flex flex-col pb-12 mb-12 space-y-2 border-b-2">
          <div className="flex px-4 space-x-2 text-TUCMC-blue-400">
            <ClipboardCopyIcon className="w-6 h-6" />
            <h1>ไม่มีการ audition</h1>
          </div>
          <div className="flex px-4 space-x-2 text-TUCMC-gray-600">
            <UserIcon className="w-6 h-6" />
            <h1>สมาชิก 120 คน</h1>
          </div>
          <div className="flex flex-row px-4 space-x-2 text-TUCMC-gray-600">
            <GlobeAltIcon className="w-6 h-6" />
            <div className="flex flex-col">
              <p>FB : @ช่องทางการติดตามชมรม </p>
              <p> IG : @ช่องทางการติดตามชมรม</p>
            </div>
          </div>
        </div>
        <div>
          <p className="px-4 pb-12 text-TUCMC-gray-600">
            คำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรม
            คำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรม
            คำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรม
            คำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรมคำอธิบายชมรม
            คำอธิบายชม
          </p>
        </div>
        <div className="flex flex-col items-center pb-6 mx-4 space-y-6">
          <img
            className="object-cover rounded-lg w-[350px] md:w-full"
            src="/assets/images/placeholder/thumb1.png"
          ></img>
          <img
            className="object-cover rounded-lg w-[350px] md:w-full"
            src="/assets/images/placeholder/thumb1.png"
          ></img>
          <img
            className="object-cover rounded-lg w-[350px] md:w-full"
            src="/assets/images/placeholder/thumb1.png"
          ></img>
        </div>
        <div className="flex flex-col px-4 pt-10 pb-16">
          <h1 className="px-6 pt-4 text-2xl text-TUCMC-gray-600">
            รีวิวจากรุ่นพี่
          </h1>
          <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row mt-14">
            <div className="flex flex-row mt-6 md:flex-col md:mt-0">
              <div className="flex">
                <img
                  src="/assets/images/placeholder/thumb1.png"
                  width="96px"
                  height="96px"
                  style={{
                    height: "96px",
                    width: "96px",
                    minWidth: "96px",
                    objectFit: "cover",
                  }}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col pl-2 mt-1 text-gray-500 md:pl-0">
                <h1 className="text-xl font-black md:text-2xl">ok</h1>
                <span className="text-xs">เตรียมอุดม 53</span>
                <span className="text-xs w-max">IG: chaicharn</span>
              </div>
            </div>
            <div className="flex flex-col md:ml-4">
              <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-8xl left-10 top-6">
                  “
                </span>
              </div>
              <div className="px-6 shadow-lg bg-whtie rounded-3xl md:py-16 md:px-16">
                <div className="h-10 pt-2 text-6xl text-center text-gray-300 md:hidden">
                  <span className="absolute">“</span>
                </div>
                <article className="prose text-gray-500 text-medium md:text-xl">
                  เราคิดว่าส่วนที่ทำให้การใช้ชีวิต 3
                  ปีในเตรียมคุ้มค่าที่สุดคือการที่เราได้มีโอกาสอยู่ชมรมหนังสั้น
                  จากชื่อชมรมเราคิดว่าทุกคนน่าจะพอเดาได้ ใช่ค่ะ
                  ชมรมของเราได้รวบรวมคนที่มีความสนใจในการทำหนังแล้วก็สื่อโทรทัศน์ต่าง
                  ๆ กิจกรรมหลักจะเป็นการทำหนังopen house อื่น ๆ ก็เช่น Workshop
                  ค่ายหนังสั้น
                  ซึ่งก็จะป็นส่วนที่ทุกคนในชมรมมีโอกาสแลกเปลี่ยนความรู้
                  ประสบการณ์ทำหนังตั้งแต่ การเขียนบท กำกับ ถ่ายทำ และตัดต่อ
                  ก่อนที่จะได้ลงสนามจริงก็คือ ออกกอง
                  สำหรับเราแล้วการได้รู้จักคนในชมรมไม่ว่าจะเป็นคุณครู พี่ ๆ
                  เพื่อน ๆ หรือน้อง ๆ ที่มีความสนใจในด้านนี้
                  ได้เปิดประสบการณ์ใหม่ ๆ เกี่ยวกับหนังมากมาย
                  เรามีความสุขมากในการได้รู้จัก ได้ทำงานกับคนในชมรม
                  การทำงานแม้ว่าจะมีอุปสรรคต่าง ๆ แต่เมื่อเราผ่านมันไปได้
                  สิ่งที่เราได้รับกลับมามันไม่ใช่แค่ผลงานที่เราภูมิใจ เรายังได้
                  Bond ที่ไม่รู้ว่าจะหาแบบนี้ที่ไหนได้อีกจากคนในกอง
                  ซึ่งไม่ใช่ว่าตลอดเวลาการอยู่หนังสั้นจะได้ออกกองกองเดียวนะ
                  ยังมีโอกาสอีกเยอะมากกกกก พี่ ๆ
                  ในชมรมก็จะคอยส่งงานเสนอเข้าประกวดต่าง ๆ มาให้
                  หรือจะเป็นโปรเจคที่โคกับชมรมอื่นก็มี
                  ที่พูดมาทั้งหมดนี้ฟังดูว่าต้องทำงานหนักมาก
                  แต่หนักแค่ไหนเราก็บอกไม่ได้ อยากรู้ต้องลอง อิอิ
                  สุดท้ายนี้เราก็ขอฝากติดตามรับชมหนังสั้น Open House
                  และผลงานอื่น ๆ ใน TUSF ด้วยนะคะ
                </article>
                <h1 className="w-full text-6xl text-center text-gray-300 md:hidden h-22">
                  ”
                </h1>
              </div>
              <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-8xl right-16 -top-20">
                  ”
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row mt-14">
            <div className="flex flex-row mt-6 md:flex-col md:mt-0">
              <div className="flex">
                <img
                  src="/assets/images/placeholder/thumb1.png"
                  width="96px"
                  height="96px"
                  style={{
                    height: "96px",
                    width: "96px",
                    minWidth: "96px",
                    objectFit: "cover",
                  }}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col pl-2 mt-1 text-gray-500 md:pl-0">
                <h1 className="text-xl font-black md:text-2xl">ok</h1>
                <span className="text-xs">เตรียมอุดม 53</span>
                <span className="text-xs w-max">IG: chaicharn</span>
              </div>
            </div>
            <div className="flex flex-col md:ml-4">
              <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-8xl left-10 top-6">
                  “
                </span>
              </div>
              <div className="px-6 shadow-lg bg-whtie rounded-3xl md:py-16 md:px-16">
                <div className="h-10 pt-2 text-6xl text-center text-gray-300 md:hidden">
                  <span className="absolute">“</span>
                </div>
                <article className="prose text-gray-500 text-medium md:text-xl">
                  เราคิดว่าส่วนที่ทำให้การใช้ชีวิต 3
                  ปีในเตรียมคุ้มค่าที่สุดคือการที่เราได้มีโอกาสอยู่ชมรมหนังสั้น
                  จากชื่อชมรมเราคิดว่าทุกคนน่าจะพอเดาได้ ใช่ค่ะ
                  ชมรมของเราได้รวบรวมคนที่มีความสนใจในการทำหนังแล้วก็สื่อโทรทัศน์ต่าง
                  ๆ กิจกรรมหลักจะเป็นการทำหนังopen house อื่น ๆ ก็เช่น Workshop
                  ค่ายหนังสั้น
                  ซึ่งก็จะป็นส่วนที่ทุกคนในชมรมมีโอกาสแลกเปลี่ยนความรู้
                  ประสบการณ์ทำหนังตั้งแต่ การเขียนบท กำกับ ถ่ายทำ และตัดต่อ
                  ก่อนที่จะได้ลงสนามจริงก็คือ ออกกอง
                  สำหรับเราแล้วการได้รู้จักคนในชมรมไม่ว่าจะเป็นคุณครู พี่ ๆ
                  เพื่อน ๆ หรือน้อง ๆ ที่มีความสนใจในด้านนี้
                  ได้เปิดประสบการณ์ใหม่ ๆ เกี่ยวกับหนังมากมาย
                  เรามีความสุขมากในการได้รู้จัก ได้ทำงานกับคนในชมรม
                  การทำงานแม้ว่าจะมีอุปสรรคต่าง ๆ แต่เมื่อเราผ่านมันไปได้
                  สิ่งที่เราได้รับกลับมามันไม่ใช่แค่ผลงานที่เราภูมิใจ เรายังได้
                  Bond ที่ไม่รู้ว่าจะหาแบบนี้ที่ไหนได้อีกจากคนในกอง
                  ซึ่งไม่ใช่ว่าตลอดเวลาการอยู่หนังสั้นจะได้ออกกองกองเดียวนะ
                  ยังมีโอกาสอีกเยอะมากกกกก พี่ ๆ
                  ในชมรมก็จะคอยส่งงานเสนอเข้าประกวดต่าง ๆ มาให้
                  หรือจะเป็นโปรเจคที่โคกับชมรมอื่นก็มี
                  ที่พูดมาทั้งหมดนี้ฟังดูว่าต้องทำงานหนักมาก
                  แต่หนักแค่ไหนเราก็บอกไม่ได้ อยากรู้ต้องลอง อิอิ
                  สุดท้ายนี้เราก็ขอฝากติดตามรับชมหนังสั้น Open House
                  และผลงานอื่น ๆ ใน TUSF ด้วยนะคะ
                </article>
                <h1 className="w-full text-6xl text-center text-gray-300 md:hidden h-22">
                  ”
                </h1>
              </div>
              <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-8xl right-16 -top-20">
                  ”
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row mt-14">
            <div className="flex flex-row mt-6 md:flex-col md:mt-0">
              <div className="flex">
                <img
                  src="/assets/images/placeholder/thumb1.png"
                  width="96px"
                  height="96px"
                  style={{
                    height: "96px",
                    width: "96px",
                    minWidth: "96px",
                    objectFit: "cover",
                  }}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col pl-2 mt-1 text-gray-500 md:pl-0">
                <h1 className="text-xl font-black md:text-2xl">ok</h1>
                <span className="text-xs">เตรียมอุดม 53</span>
                <span className="text-xs w-max">IG: chaicharn</span>
              </div>
            </div>
            <div className="flex flex-col md:ml-4">
              <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-8xl left-10 top-6">
                  “
                </span>
              </div>
              <div className="px-6 shadow-lg bg-whtie rounded-3xl md:py-16 md:px-16">
                <div className="h-10 pt-2 text-6xl text-center text-gray-300 md:hidden">
                  <span className="absolute">“</span>
                </div>
                <article className="prose text-gray-500 text-medium md:text-xl">
                  เราคิดว่าส่วนที่ทำให้การใช้ชีวิต 3
                  ปีในเตรียมคุ้มค่าที่สุดคือการที่เราได้มีโอกาสอยู่ชมรมหนังสั้น
                  จากชื่อชมรมเราคิดว่าทุกคนน่าจะพอเดาได้ ใช่ค่ะ
                  ชมรมของเราได้รวบรวมคนที่มีความสนใจในการทำหนังแล้วก็สื่อโทรทัศน์ต่าง
                  ๆ กิจกรรมหลักจะเป็นการทำหนังopen house อื่น ๆ ก็เช่น Workshop
                  ค่ายหนังสั้น
                  ซึ่งก็จะป็นส่วนที่ทุกคนในชมรมมีโอกาสแลกเปลี่ยนความรู้
                  ประสบการณ์ทำหนังตั้งแต่ การเขียนบท กำกับ ถ่ายทำ และตัดต่อ
                  ก่อนที่จะได้ลงสนามจริงก็คือ ออกกอง
                  สำหรับเราแล้วการได้รู้จักคนในชมรมไม่ว่าจะเป็นคุณครู พี่ ๆ
                  เพื่อน ๆ หรือน้อง ๆ ที่มีความสนใจในด้านนี้
                  ได้เปิดประสบการณ์ใหม่ ๆ เกี่ยวกับหนังมากมาย
                  เรามีความสุขมากในการได้รู้จัก ได้ทำงานกับคนในชมรม
                  การทำงานแม้ว่าจะมีอุปสรรคต่าง ๆ แต่เมื่อเราผ่านมันไปได้
                  สิ่งที่เราได้รับกลับมามันไม่ใช่แค่ผลงานที่เราภูมิใจ เรายังได้
                  Bond ที่ไม่รู้ว่าจะหาแบบนี้ที่ไหนได้อีกจากคนในกอง
                  ซึ่งไม่ใช่ว่าตลอดเวลาการอยู่หนังสั้นจะได้ออกกองกองเดียวนะ
                  ยังมีโอกาสอีกเยอะมากกกกก พี่ ๆ
                  ในชมรมก็จะคอยส่งงานเสนอเข้าประกวดต่าง ๆ มาให้
                  หรือจะเป็นโปรเจคที่โคกับชมรมอื่นก็มี
                  ที่พูดมาทั้งหมดนี้ฟังดูว่าต้องทำงานหนักมาก
                  แต่หนักแค่ไหนเราก็บอกไม่ได้ อยากรู้ต้องลอง อิอิ
                  สุดท้ายนี้เราก็ขอฝากติดตามรับชมหนังสั้น Open House
                  และผลงานอื่น ๆ ใน TUSF ด้วยนะคะ
                </article>
                <h1 className="w-full text-6xl text-center text-gray-300 md:hidden h-22">
                  ”
                </h1>
              </div>
              <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-8xl right-16 -top-20">
                  ”
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-32 bg-TUCMC-gray-100">
        <h1 className="flex py-12 text-xl font-medium">ชมรมอื่น ๆ</h1>
        <div className="flex flex-wrap justify-center w-full max-w-5xl mt-5 md:mt-14">
          <ClubCard audition={true} />
          <ClubCard />
          <ClubCard />
          <ClubCard />
          <ClubCard />
          <ClubCard audition={true} />
          <ClubCard />
          <ClubCard />
          <ClubCard />
          <ClubCard audition={true} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Template;
