import {GetServerSideProps} from "next";
import PageContainer from "@components/common/PageContainer";
import {Card} from "@components/Card";
import {useWindowDimensions} from "@utilities/document";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ArrowCircleDownIcon, StarIcon} from "@heroicons/react/solid";
import {useAuth} from "@client/auth";
import {fetchAClub} from "@client/fetcher/club";
import Router from "next/router";

const fetchClubData = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>) => {
  const data = await fetchAClub(clubID)
  setClubData(data)
}

const Page = () => {

  const { width } = useWindowDimensions()
  const { onReady } = useAuth()
  const [clubData, setClubData] = useState({place: "", contact: "", contact2: "", contact3: ""})

  const userData = onReady((logged, userData) => {
    if (!logged) {Router.push("/auth"); return userData}
    if (userData.club === "") {Router.push("/select"); return userData}
    return userData
  })

  useEffect(() => {
    if (userData && userData.club) {
      fetchClubData(userData.club, setClubData)
    }
  }, [userData])

  let cardWidth, padding = 18, maxWidth = 480;

  if(width < maxWidth){
    cardWidth = width - (2 * padding)
  }else{
    cardWidth = maxWidth - (2 * padding)
  }

  const imgUrl = `/api/renderCard?userData=${JSON.stringify(userData)}&clubData=${JSON.stringify(clubData)}`

  const download = () => {
    const a = document.createElement("a")
    a.href = imgUrl
    a.download = "Card.png"
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <PageContainer>
      <div>
        <div className="py-10 flex justify-center">
          <Card width={cardWidth} userData={userData} clubData={clubData}/>
        </div>
        <div className="flex flex-col px-7 space-y-3 mb-10 max-w-md mx-auto">
          <div className="flex flex-row bg-TUCMC-green-100 space-x-3 text-TUCMC-gray-700 p-4 rounded-md">
            <StarIcon className="flex-shrink-0 w-5 h-5"/>
            <div className="text-sm">
              <p>กรุณาดาวน์โหลดรูปภาพหรือถ่ายภาพหน้าจอเก็บไว้เป็นหลักฐาน</p>
            </div>
          </div>
          <div onClick={download} className="flex justify-center cursor-pointer items-center space-x-2 bg-white rounded-md border border-gray-300 p-5 text-TUCMC-gray-700">
            <ArrowCircleDownIcon className="w-5 h-5"/>
            <span>ดาวน์โหลด</span>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Page