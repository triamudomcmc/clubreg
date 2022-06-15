import PageContainer from "@components/common/PageContainer"
import { FAQSplash } from "@vectors/decorations/FAQSplash"
import Footer from "@components/common/Footer"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import * as fs from "fs"
import { DefaultCard } from "@components/common/Cards"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { FAQCategory } from "@components/FAQ/FAQCategory"
import { GroupSearch } from "@components/common/Inputs/Search"
import { searchKeyword } from "@utilities/object"
import { DescribeRoute } from "@components/common/Meta/OpenGraph"

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

const FAQ = ({ data }) => {
  // const [dataArr, setDataArr] = useState(sliceArrN(objToArr(data), 2))
  // const [dataArr, setDataArr] = useState(objToArr(data))
  const [doOpen, setDoOpen] = useState(false)

  const [searchContext, setSearchContext] = useState("")
  const [query, setQuery] = useState(setTimeout(() => {}, 10))
  const [rawSorted, setRawSorted] = useState<{ data: any; group: string }[]>(objToArr(data))
  const [sortedData, setSortedData] = useState<{ data: any; group: string }[]>([])

  const router = useRouter()

  useEffect(() => {
    if ("req" in router.query) {
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

  useEffect(() => {
    setQuery(
      setTimeout(() => {
        if (searchContext !== "") {
          const searchResult = rawSorted.map((obj) => {
            const newObj = {
              group: obj.group,
              // data => { group: string, data: string}
              data: searchKeyword(objToArr(obj.data), searchContext, (obj2) => obj2.group).reduce((prev, curr) => {
                const newObj = { ...prev }
                newObj[curr.group] = curr.data
                return newObj
              }, {}),
            }

            return newObj
          })

          setSortedData(searchResult)
        } else {
          setSortedData(rawSorted)
        }
        // }, 900)
      }, 0)
    )
  }, [searchContext])

  return (
    <DescribeRoute
      title="คำถามที่พบบ่อย"
      description="หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่องานกิจกรรมพัฒนาผู้เรียน (กช.)"
      imgURL="/assets/meta/index.jpg"
    >
      <PageContainer footer={false}>
        <div className="mx-auto max-w-6xl space-y-6 py-10 px-6 md:py-16 md:pb-24">
          <motion.div layout="position" className="flex w-full flex-col items-center space-y-8">
            <h1 className="text-center text-2xl font-semibold">คำถามที่พบบ่อย</h1>
            <FAQSplash className="w-[280px]" />
            <div className="mx-8 mt-8 max-w-xl border-b pb-4 md:mx-0 md:mt-12 md:w-full md:border-none md:px-8">
              <GroupSearch setSearchContext={setSearchContext} />
            </div>
          </motion.div>

          <div className="px-2 sm:px-24">
            <motion.div className="mb-10" layout="position">
              <DefaultCard>
                <p className="font-normal">
                  หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่องานกิจกรรมพัฒนาผู้เรียน (กช.){" "}
                  <Link passHref href="/contact">
                    <a className="underline">ติดต่อเรา</a>
                  </Link>
                </p>
              </DefaultCard>
            </motion.div>

            <div className="flex flex-col">
              {sortedData.map((item) => {
                /**
                 * group: 'เกี่ยวกับ กช.',
                 * data: {
                 *  นักเรียนแลกเปลี่ยนต้องทำอย่างไร: "นักเรียนที่กำลังจะไปแลกเปลี่ยนในปีการศึกษา 2564 กรณีไปแลกเปลี่ยนหลังช่วงลงทะเบียนชมรม หากยังอยู่ทันในช่วงที่มีระบบลงทะเบียน (7-14 มิ.ย. 2564) ให้ลงทะเบียนชมรมเอาไว้เช่นเดียวกับนักเรียนทั่วไป ในกรณีที่ต้องการกลับมาอยู่ชมรมเดิมในปีการศึกษาถัดมา ก็ให้แจ้งครูที่ปรึกษาชมรมไว้ด้วยส่วนนักเรียนที่กลับมาจากแลกเปลี่ยน (กำลังจะเข้าเรียนในปีการศึกษา 2564) กรณีกลับมาทันระบบลงทะเบียนชมรม (7-14 มิ.ย. 2564) สามารถลงชื่อออดิชันหรือลงทะเบียนชมรมต่าง ๆ ได้ตามปกติ หรือหากลงชื่อเป็นกรรมการชมรมไว้แล้วก็ถือว่าได้เป็นสมาชิกของชมรมนั้นแล้ว ในกรณีกลับมาไม่ทันช่วงลงทะเบียนชมรม ให้ไปติดต่องานทะเบียน หากไม่มีชมรมที่ต้องการก็จะได้ไปอยู่ชมรมนักเรียนแลกเปลี่ยน แต่หากไม่อยากอยู่ชมรมแลกเปลี่ยน ก็ให้ไปติดต่อกับครูที่ปรึกษาของชมรมที่เราต้องการจะอยู่ และแจ้งที่งานทะเบียนว่าต้องการย้ายชมรม จากนั้นงานทะเบียนจะแนะวิธีการถัดไปให้"
                 * }
                 */

                if (Object.keys(item.data).length === 0) return

                return (
                  <FAQCategory
                    searchContext={searchContext}
                    key={item.group}
                    title={item.group}
                    questions={item.data}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <motion.div>
          <Footer />
        </motion.div>
      </PageContainer>
    </DescribeRoute>
  )
}

export default FAQ
