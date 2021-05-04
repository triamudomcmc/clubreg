// @ts-nocheck

import {useState} from "react";
import dynamic from "next/dynamic";
import PageContainer from "@components/common/PageContainer";
const QrReader = dynamic(() => import('modern-react-qr-reader'),{ ssr: false })

const Scanner = () => {

  const [result, setRes] = useState("")
  const handleScan = (data) => {
    setRes(data)
  }

  return (
    <PageContainer>
      <div className="flex flex-col items-center font-display py-14">
        <div className="flex mb-4 w-full">
          <div className="w-full mx-8 max-w-sm border border-TUCMC-gray-600 ">
            <QrReader
              delay={300}
              facingMode="environment"
              showViewFinder={false}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <h1>Result: {result}</h1>
      </div>
    </PageContainer>
  )
}

export default Scanner