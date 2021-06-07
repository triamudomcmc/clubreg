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
  const [clubData, setClubData] = useState({place: "", contact: {}, contact2: {}, contact3: {}, message: ""})

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

  const imgUrl = `/api/renderCard?id=${userData.cardID}`

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
        <div className="flex justify-center py-10">
          <Card width={cardWidth} userData={userData} clubData={clubData}/>
        </div>
        <div className="flex flex-col max-w-md mx-auto mb-10 space-y-3 px-7">
          <div className="flex flex-row p-4 space-x-3 rounded-md bg-TUCMC-green-100 text-TUCMC-gray-700">
            <StarIcon className="flex-shrink-0 w-5 h-5"/>
            <div className="text-sm">
              <p>กรุณาดาวน์โหลดรูปภาพหรือถ่ายภาพหน้าจอเก็บไว้เป็นหลักฐาน</p>
            </div>
          </div>
          <div onClick={download} className="flex items-center justify-center p-5 space-x-2 bg-white border border-gray-300 rounded-md cursor-pointer text-TUCMC-gray-700">
            <ArrowCircleDownIcon className="w-5 h-5"/>
            <span>ดาวน์โหลด</span>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Page