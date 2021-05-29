import IndexSplash from "@vectors/decorations/IndexSplash";
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
import Timeline from "@components/index/Timeline";
import FAQ from "@components/index/FAQ";
import Clubs from "@components/index/Clubs";
import Footer from "@components/common/Footer";
import {AnimateSharedLayout, motion} from "framer-motion";

const Index = () => {

  return (
    <PageContainer footer={false}>
      <AnimateSharedLayout>
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
                    className="font-bold tracking-tight text-3xl text-white md:tracking-normal whitespace-nowrap md:text-4xl lg:text-6xl">ระบบลงทะเบียนชมรม</h1>
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
                  <Button href="/auth"
                          className="bg-white text-TUCMC-pink-600 shadow-lg font-bold px-12 lg:px-[4.5rem] rounded-full text-xl lg:text-2xl py-3 lg:py-3.5 mb-4">
                    <span>เข้าสู่ระบบ</span>
                  </Button>
                </div>
                <div className="hidden md:block font-medium text-white px-1">
                  <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                  <p>ในวันที่ 7 มิ.ย. 2564 เวลา 11.30 น.</p>
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
              <Button href="auth"
                      className="bg-white text-TUCMC-pink-600 shadow-lg font-bold px-[4.5rem] rounded-full text-2xl py-3.5 mb-4">
                <span>เข้าสู่ระบบ</span>
              </Button>
            </div>
            <div className="md:hidden mx-8 mt-6 mb-14">
              <div
                className="flex flex-row bg-TUCMC-pink-100 space-x-4 text-TUCMC-pink-500 p-4 rounded-lg">
                <InformationCircleIcon className="w-6 h-6"/>
                <div className="font-medium">
                  <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                  <p>ในวันที่ 1 มิ.ย. 2564 เวลา 11.30 น.</p>
                </div>
              </div>
            </div>
            <div className="bg-TUCMC-gray-100 py-14">
              <div className="md:flex md:justify-center">
                <div
                  className="mx-6 space-y-8 md:w-full md:max-w-6xl md:flex md:flex-col xl:flex-row xl:items-center xl:space-y-0 xl:space-x-4 md:items-center">
                  <div className="md:flex md:flex-row md:space-x-4 space-y-8 md:space-y-0">
                    <Button
                      type="div"
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
                    </Button>
                    <Button
                      type="div"
                      href="/instruction"
                      className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl md:rounded-lg px-7 py-5">
                      <div className="flex-shrink-0 w-1/2">
                        <h1
                          className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">วิธีใช้</h1>
                      </div>
                      <img className="w-36 md:w-32" src="/assets/images/menu2.png"/>
                    </Button>
                  </div>
                  <div className="md:flex md:flex-row md:space-x-4 space-y-8 md:space-y-0">
                    <Button type="div" href="/clubs"
                            className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl md:rounded-lg px-7 pb-4 pt-2">
                      <div>
                        <h1
                          className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">ชมรม</h1>
                      </div>
                      <img className="w-32 md:w-28 md:pl-2" src="/assets/images/menu3.png"/>
                    </Button>
                    <Button
                      type="div"
                      className="flex flex-row items-center justify-between shadow-lg bg-white rounded-xl md:rounded-lg px-7 py-5">
                      <div>
                        <h1
                          className="text-TUCMC-pink-400 font-bold tracking-tighter text-5xl">FAQ</h1>
                      </div>
                      <img className="w-36 md:w-32" src="/assets/images/menu4.png"/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Timeline/>
            <Clubs/>
            <FAQ/>
          </div>
        </div>
        <motion.div layout="position">
          <Footer/>
        </motion.div>
      </AnimateSharedLayout>
    </PageContainer>
  )
}

export default Index