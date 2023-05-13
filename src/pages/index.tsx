import { useAuth } from "@client/auth"
import Footer from "@components/common/Footer"
import { Button } from "@components/common/Inputs/Button"
import { DescribeRoute } from "@components/common/Meta/OpenGraph"
import PageContainer from "@components/common/PageContainer"
import Clubs from "@components/index/Clubs"
import { CountdownStrip } from "@components/index/CountdownStrip"
import { DynamicButtonSet } from "@components/index/DynamicButtonSet"
import FAQ from "@components/index/FAQ"
import Timeline from "@components/index/Timeline"
import {
  beforeOldClub,
  endOldClub,
  endRegClubTime,
  openTime,
  startOldClub
} from "@config/time"
import { InformationCircleIcon } from "@heroicons/react/solid"
import { useTimer } from "@utilities/timers"
import IndexSplash from "@vectors/decorations/IndexSplash"
import { motion } from "framer-motion"
import Image from "next/image"
import Router from "next/router"
import React, { useState } from "react"

const Index = () => {
  // const goal = openTime
  const goal = openTime

  const timer = useTimer(goal)
  const { onReady } = useAuth()

  const [button] = useState(
    new Date().getTime() >= goal || new Date().getTime() < endOldClub
  )

  const regState:
    | "no_login"
    | "no_club"
    | "club"
    | "old_club"
    | ""
    | "before_old_club" = onReady((logged, userData) => {
    if (!logged) {
      // Router.push("/auth")
      return "no_login"
    }
    if (userData.club === "") {
      if (new Date().getTime() >= openTime) {
        Router.push("/select")
        return "no_club"
      }
      // return userData
      if (
        new Date().getTime() < endOldClub &&
        new Date().getTime() > startOldClub
      ) {
        //  not during old club time
        return "old_club"
      }
      if (
        new Date().getTime() < endRegClubTime &&
        new Date().getTime() > openTime
      ) {
        return "no_club"
      }

      if (new Date().getTime() > beforeOldClub) {
        return "before_old_club"
      }
    } else {
      return "club"
    }

    return ""
  })

  return (
    <DescribeRoute
      title="ระบบลงทะเบียนชมรม โรงเรียนเตรียมอุดมศึกษา"
      description="ระบบจะเปิดให้ลงทะเบียนชมรมในวันที่ 22 พ.ค. 2566 เวลา 12.00 น."
      imgURL="/assets/meta/index.jpg"
    >
      <PageContainer footer={false}>
        <div className="h-full bg-TUCMC-pink-400">
          <div className="flex justify-center">
            <div className="mx-8 flex flex-col items-center px-8 md:w-full md:max-w-6xl md:flex-row-reverse md:justify-between md:py-0 lg:py-20 xl:px-0">
              <IndexSplash className="md:square-450px md:h-420px mt-10 md:ml-12 md:mt-0 md:max-w-sm lg:max-w-none" />
              <div className="my-8 flex flex-col items-center py-0 md:h-full md:max-h-96 md:items-start md:justify-between md:py-5 lg:py-0">
                <div className="flex flex-col items-center px-1 md:mt-10 md:block lg:mt-2">
                  <h1 className="whitespace-nowrap text-3xl font-bold tracking-tight text-white md:text-4xl md:tracking-normal lg:text-6xl">
                    ระบบลงทะเบียนชมรม
                  </h1>
                  <h1 className="text-2xl font-normal tracking-normal text-white md:pt-2 md:text-3xl md:tracking-tight lg:pt-4 lg:text-5xl">
                    โรงเรียนเตรียมอุดมศึกษา
                  </h1>
                  <p className="mt-2 tracking-tight text-white md:mt-2 md:text-xl lg:mt-4 lg:text-3xl">
                    ปีการศึกษา 2566
                  </p>
                </div>
                {!button && (
                  <div className="hidden flex-row justify-center space-x-2 text-TUCMC-gray-900 md:flex">
                    <CountdownStrip timer={timer} />
                  </div>
                )}
                {button && (
                  <div className="hidden h-full flex-col justify-end md:flex">
                    <DynamicButtonSet type={regState} />
                  </div>
                )}
                {/* <div className="hidden px-1 font-medium text-white md:block">
                  <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                  <p>ในวันที่ 7 มิ.ย. 2564 เวลา 12.30 น.</p>
                </div> */}
                <div className="hidden px-1 font-medium text-white md:block">
                  <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                  <p>ในวันที่ 22 พ.ค. 2566 เวลา 12.00 น.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-t-5xl mt-8 h-full bg-white md:mt-0">
            {!button && (
              <div className="relative -top-6 flex flex-row justify-center space-x-2 text-TUCMC-gray-900 md:hidden">
                <CountdownStrip timer={timer} />
              </div>
            )}
            {button && (
              <div className="relative -top-7 flex flex-row justify-center md:hidden">
                <DynamicButtonSet type={regState} small={true} />
              </div>
            )}
            <div className="mx-8 mt-6 mb-14 md:hidden">
              <div className="flex flex-row space-x-4 rounded-lg bg-TUCMC-pink-100 p-4 text-TUCMC-pink-500">
                <InformationCircleIcon className="h-6 w-6" />
                {/* <div className="font-medium">
                  <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                  <p>ในวันที่ 7 มิ.ย. 2564 เวลา 12.30 น.</p>
                </div> */}
                <div className="font-medium">
                  <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
                  <p>ในวันที่ 22 พ.ค. 2566 เวลา 12.00 น.</p>
                </div>
              </div>
            </div>
            <div className="bg-TUCMC-gray-100 py-14">
              <div className="md:flex md:justify-center">
                <div className="mx-6 space-y-8 md:flex md:w-full md:max-w-6xl md:flex-col md:items-center xl:flex-row xl:items-center xl:space-y-0 xl:space-x-4">
                  <div className="space-y-8 md:flex md:flex-row md:space-x-4 md:space-y-0">
                    <Button
                      type="div"
                      href="/TUCMC"
                      className="flex flex-row items-end justify-between rounded-xl bg-TUCMC-pink-400 px-7 pt-4 pb-6 shadow-lg md:rounded-lg md:bg-white"
                    >
                      <div className="md:hidden">
                        <h1 className="text-6xl font-bold leading-10 tracking-tighter text-white">
                          กช.
                        </h1>
                        <h1 className="mt-3 align-text-bottom text-3xl font-normal leading-6 tracking-tight text-white">
                          คืออะไร ?
                        </h1>
                      </div>
                      <div className="hidden text-TUCMC-pink-400 md:block">
                        <h1 className="text-6xl font-bold leading-10 tracking-tighter md:text-5xl">
                          กช.
                        </h1>
                        <h1 className="mt-3 whitespace-nowrap align-text-bottom text-3xl font-normal leading-6 tracking-tight md:text-2xl md:leading-3">
                          คืออะไร ?
                        </h1>
                      </div>
                      <img
                        alt={"menu1"}
                        className="w-32 md:hidden md:w-28"
                        src="/assets/images/menu1.png"
                      />
                      <img
                        alt={"menu2"}
                        className="ml-4 hidden w-32 md:block md:w-28"
                        src="/assets/images/menu1-2.png"
                      />
                    </Button>
                    <Button
                      type="div"
                      href="/dummy"
                      className="flex flex-row items-center justify-between rounded-xl bg-white px-7 py-5 shadow-lg md:rounded-lg"
                    >
                      <div className="w-1/2 shrink-0">
                        <h1 className="text-5xl font-bold tracking-tighter text-TUCMC-pink-400">
                          ลองใช้
                        </h1>
                      </div>
                      <img
                        alt={"menu2"}
                        className="w-36 md:w-32"
                        src="/assets/images/menu2.png"
                      />
                    </Button>
                  </div>
                  <div className="space-y-8 md:flex md:flex-row md:space-x-4 md:space-y-0">
                    <Button
                      type="div"
                      href="/clubs"
                      className="flex flex-row items-center justify-between rounded-xl bg-white px-7 pb-4 pt-2 shadow-lg md:rounded-lg"
                    >
                      <div>
                        <h1 className="text-5xl font-bold tracking-tighter text-TUCMC-pink-400">
                          ชมรม
                        </h1>
                      </div>
                      <img
                        alt={"menu3"}
                        className="w-32 md:w-28 md:pl-2"
                        src="/assets/images/menu3.png"
                      />
                    </Button>
                    <Button
                      type="div"
                      href="/FAQ"
                      className="flex flex-row items-center justify-between rounded-xl bg-white px-7 py-5 shadow-lg md:rounded-lg"
                    >
                      <div>
                        <h1 className="text-5xl font-bold tracking-tighter text-TUCMC-pink-400">
                          FAQ
                        </h1>
                      </div>
                      <img
                        alt={"menu4"}
                        className="w-36 md:w-32"
                        src="/assets/images/menu4.png"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Timeline />
            <Clubs />
            <FAQ />
          </div>
        </div>
        <motion.div layout="position">
          <Footer />
        </motion.div>
        {/* inject Image for preloading */}
        <div className="hidden">
          <Image
            alt={"loader"}
            priority={true}
            src="/assets/loaders/cat.gif"
            width={85}
            height={69}
          />
        </div>
      </PageContainer>
    </DescribeRoute>
  )
}

export default Index
