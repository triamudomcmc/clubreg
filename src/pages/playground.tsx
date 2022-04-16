import PageContainer from "@components/common/PageContainer"
import { FAQSplash } from "@vectors/decorations/FAQSplash"
import { DropDown } from "@components/FAQ/DropDown"
import Footer from "@components/common/Footer"
import { AnimateSharedLayout, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import { ClubComitteeTable, ClubDataTable, ProportionTable } from "@components/panel/table/ClubTable"

const PlaygroundPage = ({ data }) => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && !("secret" in router.query && router.query.secret === "sssss")) {
      Router.push("/")
    }
  }, [router.query])

  return (
    <PageContainer footer={false}>
      <AnimateSharedLayout>
        <div className="mx-auto max-w-6xl space-y-6 py-10 px-6 md:space-y-16 md:py-16 md:pb-24">
          <div className="flex flex-col space-y-10">
            {/* <ClubDataTable />
            <ProportionTable /> */}
            <ClubComitteeTable />
          </div>
        </div>
        <motion.div layout="position" transition={{ delay: 0.05, duration: 0.2 }}>
          <Footer />
        </motion.div>
      </AnimateSharedLayout>
    </PageContainer>
  )
}

export default PlaygroundPage
