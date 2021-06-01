import PageContainer from "@components/common/PageContainer";
import {FAQSplash} from "@vectors/decorations/FAQSplash";
import {DropDown} from "@components/FAQ/DropDown";
import Footer from "@components/common/Footer";
import {AnimateSharedLayout, motion} from "framer-motion";
import FAQElement from "@components/index/FAQ/Element";
import React, {useState} from "react";
import {GetStaticProps} from "next";
import * as fs from "fs";
import {sliceArrN} from "@utilities/array";

const objToArr = (obj: any) => {
  return Object.keys(obj).map(key => {
    return {group: key, ...{data: obj[key]}}
  })
}

export const getStaticProps: GetStaticProps = async () => {
  const raw = fs.readFileSync("./_map/faq.json").toString()
  const parsed = JSON.parse(raw)

  return {
    props: {
      data: parsed
    }
  }
}

const FAQ = ({ data }) => {

  const [dataArr, setDataArr] = useState(sliceArrN(objToArr(data), 2))

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
            {
              dataArr[0].map(item => {
                return <DropDown title={item.group} item={item}/>
              })
            }
          </div>
          <div className="space-y-2 md:w-1/2">
            {
              dataArr[1].map(item => {
                return <DropDown title={item.group} item={item}/>
              })
            }
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