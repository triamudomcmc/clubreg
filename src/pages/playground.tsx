import PageContainer from "@components/common/PageContainer"
import { FAQSplash } from "@vectors/decorations/FAQSplash"
import { DropDown } from "@components/FAQ/DropDown"
import Footer from "@components/common/Footer"
import { AnimateSharedLayout, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import * as fs from "fs"
import { sliceArrN } from "@utilities/array"
import { DefaultCard } from "@components/common/Cards"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { Accordion } from "@components/common/Accordion"
import { AccordionIcon } from "@components/common/Accordion/Icons"
import { ClubTable } from "@components/panel/table/ClubTable"

const objToArr = (obj: any) => {
  return Object.keys(obj).map((key) => {
    return { group: key, ...{ data: obj[key] } }
  })
}

export const getStaticProps: GetStaticProps = async () => {
  const raw = fs.readFileSync("./_map/faq.json").toString()
  const parsed = JSON.parse(raw)

  return {
    props: {
      data: parsed,
    },
  }
}

const PlaygroundPage = ({ data }) => {
  const [dataArr, setDataArr] = useState(sliceArrN(objToArr(data), 2))
  const [doOpen, setDoOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady && !("secret" in router.query && router.query.secret === "sssss")) {
      Router.push("/")
    } else if ("req" in router.query) {
      if ((router.query.req = "a")) {
        setDoOpen(true)
        Router.push(
          {
            pathname: "/FAQ",
            query: {},
          },
          undefined,
          { shallow: true }
        )
      }
    }
  }, [router.query])

  return (
    <PageContainer footer={false}>
      <AnimateSharedLayout>
        <div className="mx-auto max-w-6xl space-y-6 py-10 px-6 md:space-y-16 md:py-16 md:pb-24">
          <div>
            <ClubTable />
          </div>
          <motion.div layout="position" className="flex flex-col items-center space-y-8">
            <h1 className="text-center text-2xl font-semibold">คำถามที่พบบ่อย</h1>
            <FAQSplash className="w-[280px]" />
          </motion.div>
          <div className="flex flex-col md:flex-row md:justify-center md:space-x-6">
            <div className="space-y-2 md:w-1/2">
              <div className="flex flex-col space-y-2">
                <h2 className="text-left text-xl font-semibold">เกี่ยวกับชมรม</h2>
                <hr />
                <div>
                  <Accordion Icon={AccordionIcon.Chevron} title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="q1">
                    <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
                  </Accordion>
                  <Accordion Icon={AccordionIcon.Chevron} title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="q1">
                    <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
                  </Accordion>
                  <Accordion Icon={AccordionIcon.Chevron} title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="q1">
                    <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
                  </Accordion>
                </div>
              </div>
              {dataArr[0].map((item) => {
                return (
                  <DropDown
                    title={item.group}
                    item={item}
                    triggerDep={doOpen && item.group === "โควตายืนยันสิทธิ์ชมรมเดิม"}
                  />
                )
              })}
            </div>
            <div className="space-y-2 md:w-1/2">
              <div className="flex flex-col space-y-2">
                <h2 className="text-left text-xl font-semibold">โควตายืนยันสิทธิ์ชมรมเดิม</h2>
                <hr />
                <Accordion Icon={AccordionIcon.Chevron} title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="q1">
                  <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
                </Accordion>
              </div>
              {dataArr[1].map((item) => {
                return (
                  <DropDown
                    title={item.group}
                    item={item}
                    triggerDep={doOpen && item.group === "โควตายืนยันสิทธิ์ชมรมเดิม"}
                  />
                )
              })}
            </div>
          </div>
          <motion.div layout="position">
            <DefaultCard>
              <p className="font-normal">
                หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่องานกิจกรรมพัฒนาผู้เรียน (กช.){" "}
                <Link passHref href="/contact">
                  <a className="underline">ติดต่อเรา</a>
                </Link>
              </p>
            </DefaultCard>
          </motion.div>
        </div>
        <motion.div layout="position" transition={{ delay: 0.05, duration: 0.2 }}>
          <Footer />
        </motion.div>
      </AnimateSharedLayout>
    </PageContainer>
  )
}

export default PlaygroundPage
