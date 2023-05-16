import { GetStaticPaths, GetStaticProps } from "next"
import * as fs from "fs"
import path from "path"
import { useEffect, useRef, useState } from "react"
import { ChevronDownIcon, ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { ClubCard } from "@components/clubs/ClubCard"
import PageContainer from "@components/common/PageContainer"
import Image from "next/image"
import { GlobeAltIcon, UserIcon } from "@heroicons/react/outline"
import { isEmpty } from "@utilities/object"
import { useWindowDimensions } from "@utilities/document"
import { useRouter } from "next/router"
import classnames from "classnames"
import ClubSkeleton from "@components/clubs/ClubSkeleton"
import Modal from "@components/common/Modals"
import { Zoomable } from "@components/common/Zoomable"
import { ClubDisplay } from "@interfaces/clubDisplay"
import initialisedDB from "@server/firebase-admin"
import { ClubDisplaySection } from "@components/clubs/ClubDisplay"
import { AnimateSharedLayout } from "framer-motion"
import { DescribeRoute } from "@components/common/Meta/OpenGraph"

const parseText = (text) => {
  return "<p>" + text.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>")
}

const createSuggestion = (clubList, clubID, setSuggestion) => {
  const max = clubList.length
  let rand = []
  let sugg = []

  //create suggestion
  while (rand.length <= 9) {
    const num = Math.floor(Math.random() * max)
    if (!rand.includes(num) && clubList[num].clubID !== clubID) {
      rand.push(num)
      sugg.push(clubList[num])
    }
  }

  setSuggestion(sugg)
}

const Page = ({ data, clubID, clubList, clubDisplay }) => {
  const [suggestion, setSuggestion] = useState([])
  const [allowedSugg, setAllowedSugg] = useState(suggestion)
  // const [loadingCount, setLoadingCount] = useState(1)
  const router = useRouter()

  const [imgLoading, setImgLoading] = useState(true)

  const contactRef = useRef(null)

  const { width } = useWindowDimensions()

  useEffect(() => {
    // generate suggestions
    createSuggestion(clubList, clubID, setSuggestion)

    // get count of every Image element
    // setLoadingCount(clubDisplay?.images?.length + 1)

    // setTimeout(() => {
    //   setLoadingCount(0)
    // }, 10000)
    setTimeout(() => {
      setImgLoading(false)
    }, 10)
  }, [router.query])

  useEffect(() => {
    if (width < 963 && width > 10) {
      const copied = [...suggestion]
      copied.pop()
      copied.pop()
      setAllowedSugg(copied)
      if (width < 770 && width > 10) {
        const copied = [...suggestion]
        copied.pop()
        copied.pop()
        copied.pop()
        copied.pop()
        setAllowedSugg(copied)
      }
    } else {
      setAllowedSugg(suggestion)
    }
  }, [width, suggestion])

  // const loaded = () => {
  //   setTimeout(() => {
  //     setLoadingCount((prevState) => prevState - 1)
  //   }, 100)
  // }

  return (
    <DescribeRoute
      title={`ชมรม${clubDisplay.nameTH}`}
      /* clean up html tags*/
      description={clubDisplay.description.replace(/<\/?[^>]+(>|$)/g, "")}
      imgURL={clubDisplay?.images?.mainImage || `/assets/thumbnails/${clubID}.jpg`}
    >
      <PageContainer>
        <AnimateSharedLayout>
          <ClubDisplaySection
            clubID={clubID}
            clubDisplay={clubDisplay}
            suggestions={allowedSugg}
            imgLoading={imgLoading}
          />
        </AnimateSharedLayout>
      </PageContainer>
    </DescribeRoute>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const clubDisplayDocs = await initialisedDB.collection("clubDisplayPending").get()
  const clubDisplayDocs = await initialisedDB.collection("clubDisplay").get()

  // const files = fs.readdirSync("./_map/clubs/")
  // const paths = files.map((pathname) => ({
  //   params: { clubID: path.basename(pathname, path.extname(pathname)) },
  // }))

  const paths = clubDisplayDocs.docs.map((d) => `/clubs/${d.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const data = fs.readFileSync(`./_map/clubs/${params.clubID}.json`)
  // const images = fs.readdirSync(`./public/assets/images/clubs/${params.clubID}/`)
  // const clubData = JSON.parse(data.toString())

  // const clubIndex = fs.readFileSync("./_map/clubs.json")
  // const clubList = JSON.parse(clubIndex.toString())

  const clubDisplayDocs = await initialisedDB.collection("clubDisplay").get()
  const clubList = clubDisplayDocs.docs.map((club) => {
    const data = club.data() as ClubDisplay

    return {
      name: data.nameTH,
      audition: data.audition,
      clubID: club.id,
      imageURL: data?.images?.mainImage || `/assets/thumbnails/${club.id}.jpg`,
    }
  })

  const clubDisplay = clubDisplayDocs.docs.find((club) => club.id === params.clubID).data() as ClubDisplay

  return {
    props: {
      // data: {
      //   ...clubData,
      //   description: parseText(clubData.description),
      //   reviews: clubData.reviews.map((rev) => {
      //     return { ...rev, context: parseText(rev.context) }
      //   }),
      // },
      clubID: params.clubID,
      // images: images,
      clubList: clubList,
      clubDisplay: clubDisplay,
    },
  }
}

export default Page
