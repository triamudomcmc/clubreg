import PageContainer from "@components/common/PageContainer"
import { Card } from "@components/Card"
import { useWindowDimensions } from "@utilities/document"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ArrowCircleDownIcon, ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { useAuth } from "@client/auth"
import * as fs from "fs"
import { fetchAClub, getClubTeacher } from "@client/fetcher/club"
import Router from "next/router"
import { Button } from "@components/common/Inputs/Button"
import { GetStaticProps } from "next"
import classnames from "classnames"
import { endOldClub, startOldClub } from "@config/time"

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

const fetchClubTeacher = async (clubID: string, setTeacher: Dispatch<SetStateAction<{}>>) => {
  const res = await getClubTeacher(clubID)
  setTeacher(res.data)
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

  const [clubTeacher, setClubTeacher] = useState([
    {
      title: "",
      firstname: "",
      lastname: "",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const [link, setLink] = useState("")
  const [downloadState, setDownloadState] = useState(false)

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
      setIsLoading(true)
      fetchClubData(userData.club, setClubData)
      fetchClubTeacher(userData.club, setClubTeacher)
      setLink(links[userData.club] || "")
      setIsLoading(false)
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
    setDownloadState(true)
    const res = await fetch(`/api/renderCard?id=${userData.cardID}`, {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
      },
    })

    const file = await res.blob()
    const blobUrl = URL.createObjectURL(file)
    let link = document.createElement("a")
    link.href = blobUrl
    link.download = `card.png`
    document.body.appendChild(link)
    link.click()
    link.id = "download"
    setDownloadState(false)
  }

  return (
    <PageContainer>
      <div>
        <div className="flex justify-center py-8">
          <Card
            width={cardWidth}
            userData={userData}
            clubData={clubData}
            teacherData={clubTeacher}
            isLoading={isLoading}
          />
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
            className={classnames(
              "flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white p-5 text-TUCMC-gray-700 transition-all duration-200",
              downloadState ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100",
              userData.club === "" ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
            )}
          >
            <ArrowCircleDownIcon className="h-5 w-5" />
            {downloadState ? (
              <div className="animate-pulse text-sm text-gray-500">กำลังดาวน์โหลด...</div>
            ) : (
              <p className="text-sm text-gray-500">ดาวน์โหลด</p>
            )}
          </div> */}
        </div>
      </div>
    </PageContainer>
  )
}

export default Page
