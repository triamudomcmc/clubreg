import PageContainer from "@components/common/PageContainer"
import { Card } from "@components/Card"
import { useWindowDimensions } from "@utilities/document"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ArrowCircleDownIcon, ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { useAuth } from "@client/auth"
import * as fs from "fs"
import { fetchAClub } from "@client/fetcher/club"
import Router from "next/router"
import { Button } from "@components/common/Inputs/Button"
import { GetStaticProps } from "next"
import classnames from "classnames"
import { endOldClub, startOldClub } from "@config/time"
import { async } from "crypto-random-string"

export const getStaticProps: GetStaticProps = async () => {
  const data = fs.readFileSync("./_map/links.json")
  const links = JSON.parse(data.toString())

  return {
    props: {
      links: links,
    },
  }
}

const fetchClubData = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>) => {
  const data = await fetchAClub(clubID)
  setClubData(data)
}

const Page = ({ links }) => {
  const { width } = useWindowDimensions()
  const { onReady } = useAuth()
  const [clubData, setClubData] = useState({
    place: "",
    contact: {},
    contact2: {},
    contact3: {},
    message: "",
  })

  const [link, setLink] = useState("")

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
      return userData
    }
    if (userData.club === "") {
      if (userData.old_club && new Date().getTime() < endOldClub && new Date().getTime() >= startOldClub)
        Router.push("/confirm")
      else Router.push("/select")

      return userData
    }

    return userData
  })

  useEffect(() => {
    if (userData && userData.club) {
      fetchClubData(userData.club, setClubData)
      setLink(links[userData.club] || "")
    }
  }, [userData])

  let cardWidth,
    padding = 18,
    maxWidth = 480

  if (width < maxWidth) {
    cardWidth = width - 2 * padding
  } else {
    cardWidth = maxWidth - 2 * padding
  }

  const download = async () => {
    const res = await fetch(`https://api.club-reg.tucm.cc/api/renderCard?id=${userData.cardID}`, {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
      },
    })

    const file = await res.blob()
    const blobUrl = URL.createObjectURL(file)
    let link = document.createElement("a") // Or maybe get it from the current document
    link.href = blobUrl
    link.download = `card.png`
    document.body.appendChild(link)
    link.click()
    link.id = "download"
  }

  return (
    <PageContainer>
      <div>
        <div className="flex justify-center py-10">
          <Card width={cardWidth} userData={userData} clubData={clubData} />
        </div>
        <div className="mx-auto mb-10 flex max-w-md flex-col space-y-3 px-7">
          <div className="flex flex-row space-x-3 rounded-md bg-TUCMC-green-100 p-4 text-TUCMC-gray-700">
            <StarIcon className="h-5 w-5 flex-shrink-0" />
            <div className="text-sm">
              <p>กรุณาถ่ายภาพหน้าจอเก็บไว้เป็นหลักฐาน</p>
            </div>
          </div>
          {/* <div
            onClick={download}
            className="flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white p-5 text-TUCMC-gray-700"
          >
            <ArrowCircleDownIcon className="h-5 w-5" />
            <span>ดาวน์โหลด</span>
          </div> */}
        </div>
      </div>
    </PageContainer>
  )
}

export default Page
