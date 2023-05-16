import { DescribeRoute } from "@components/common/Meta/OpenGraph"
import PageContainer from "@components/common/PageContainer"
import Clubs from "@components/index/Clubs"
import FAQ from "@components/index/FAQ"
import { Features } from "@components/index/Features/Features"
import { Landing } from "@components/index/Landing"
import { PartialMobileLandingElements } from "@components/index/PartialMobileLandingElements"
import Timeline from "@components/index/Timeline"
import { openTime } from "@config/time"
import { useTimer } from "@utilities/timers"
import React from "react"

import { useRenderingType } from "../hooks/index/useRenderingType"

const Index = () => {
  const timer = useTimer(openTime)

  const renderType = useRenderingType()

  return (
    <DescribeRoute
      title="ระบบลงทะเบียนชมรม โรงเรียนเตรียมอุดมศึกษา"
      description="ระบบจะเปิดให้ลงทะเบียนชมรมในวันที่ 22 พ.ค. 2566 เวลา 12.00 น."
      imgURL="/assets/meta/index.jpg"
    >
      <PageContainer>
        <div className="h-full bg-TUCMC-pink-400">
          <Landing timer={timer} pageRenderingType={renderType} />
          <div className="rounded-t-5xl mt-8 h-full bg-white md:mt-0">
            <PartialMobileLandingElements
              timer={timer}
              pageRenderingType={renderType}
            />
            <Features />
            <Timeline />
            <Clubs />
            <FAQ />
          </div>
        </div>
      </PageContainer>
    </DescribeRoute>
  )
}

export default Index
