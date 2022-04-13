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

const Page = ({ data, clubID, images, clubList }) => {
  const [suggestion, setSuggestion] = useState([])
  const [allowedSugg, setAllowedSugg] = useState(suggestion)
  const [loadingCount, setLoadingCount] = useState(1)
  const router = useRouter()

  const contactRef = useRef(null)

  const { width } = useWindowDimensions()

  useEffect(() => {
    // generate suggestions
    createSuggestion(clubList, clubID, setSuggestion)

    // get count of every Image element
    setLoadingCount(images.length + 1)

    setTimeout(() => {
      setLoadingCount(0)
    }, 10000)
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

  const loaded = () => {
    setTimeout(() => {
      setLoadingCount((prevState) => prevState - 1)
    }, 100)
  }

  return (
    <PageContainer>
      <div className={classnames(loadingCount > 0 && "absolute opacity-0")}>
        <div className="mx-auto max-w-[1100px]">
          <div className="md:mx-6 md:mt-20 md:mb-2 md:flex md:space-x-8 md:rounded-2xl md:bg-white md:shadow-md">
            <div>
              <div className="relative mb-[-6.5px] md:max-w-[512px]">
                <Image
                  priority={true}
                  onLoad={loaded}
                  src={`/assets/thumbnails/${clubID}.jpg`}
                  placeholder="blur"
                  quality={75}
                  blurDataURL={`/assets/thumbnails/${clubID}.jpg`}
                  width="768"
                  height="432"
                  className={classnames("object-cover md:rounded-l-2xl")}
                />
              </div>
            </div>
            <div className="flex">
              <div className="hidden h-2 w-6 md:block"></div>
              <div className="pl-6 pr-12 md:pl-0">
                <div className="h-6 w-full md:h-[1.8vw]"></div>
                <div className="space-y-5">
                  <div>
                    <h1 className="min-w-[150px] text-xl">ชมรม{data.nameTH}</h1>
                    <h1 className="text-TUCMC-gray-600">{data.nameEN}</h1>
                  </div>
                  <div className="space-y-1">
                    {data.audition ? (
                      <div className="flex space-x-2 text-TUCMC-pink-400">
                        <StarIcon className="h-6 w-6" />
                        <span>มีการ Audition</span>
                      </div>
                    ) : (
                      <div className="flex space-x-2 text-TUCMC-blue-400">
                        <ClipboardCopyIcon className="h-6 w-6" />
                        <span>ไม่มีการ Audition</span>
                      </div>
                    )}
                    <div className="flex space-x-2 text-TUCMC-gray-600">
                      <UserIcon className="h-6 w-6" />
                      <span>สมาชิก {data.count} คน</span>
                    </div>
                    <div className="flex space-x-2 text-TUCMC-gray-600">
                      <GlobeAltIcon className="h-6 w-6" />
                      <div className="hidden md:block lg:hidden">
                        <a ref={contactRef} className="flex cursor-pointer items-center space-x-2">
                          <h1 className="whitespace-nowrap">ช่องทางการติดตาม</h1>
                          <ChevronDownIcon className="h-5 w-5" />
                        </a>
                        <Modal
                          TriggerRef={contactRef}
                          overlayClassName="flex justify-end"
                          className="absolute z-20 mt-1 w-[300px] rounded-lg bg-white px-4 py-3 shadow-md"
                        >
                          <div className="flex flex-col">
                            {!isEmpty(data.contact) && (
                              <h1>
                                {data.contact.type} : {data.contact.context}
                              </h1>
                            )}
                            {!isEmpty(data.contact2) && (
                              <h1>
                                {data.contact2.type} : {data.contact2.context}
                              </h1>
                            )}
                            {!isEmpty(data.contact3) && (
                              <h1>
                                {data.contact3.type} : {data.contact3.context}
                              </h1>
                            )}
                          </div>
                        </Modal>
                      </div>
                      <div className="flex flex-col md:hidden lg:block">
                        {!isEmpty(data.contact) && (
                          <h1>
                            {data.contact.type} : {data.contact.context}
                          </h1>
                        )}
                        {!isEmpty(data.contact2) && (
                          <h1>
                            {data.contact2.type} : {data.contact2.context}
                          </h1>
                        )}
                        {!isEmpty(data.contact3) && (
                          <h1>
                            {data.contact3.type} : {data.contact3.context}
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-10 w-full md:h-[2vw]"></div>
              </div>
            </div>
          </div>
          <div className="w-full border-b border-TUCMC-gray-300 md:hidden"></div>
          <div className="space-y-12 px-6 pb-24 pt-11 md:space-y-16 md:pt-12">
            <div>
              <article
                dangerouslySetInnerHTML={{ __html: `${data.description}` }}
                className="space-y-4 font-texts text-[1.05rem] text-TUCMC-gray-700"
              ></article>
            </div>
            <div className="space-y-8 md:flex md:justify-center md:space-y-0 md:space-x-4">
              {images.map((name, index) => {
                if (name.includes("picture"))
                  return (
                    <div key={`picture-${index}`}>
                      <Zoomable
                        priority={true}
                        onLoad={loaded}
                        className="rounded-lg object-cover"
                        src={`/assets/images/clubs/${clubID}/${name}`}
                        width={768}
                        height={432}
                      />
                    </div>
                  )
              })}
            </div>
            <div className="space-y-10 md:space-y-16">
              {data.reviews.length > 0 && <h1 className="text-2xl text-TUCMC-gray-700">รีวิวจากรุ่นพี่</h1>}
              <div className="space-y-16 md:space-y-24">
                {data.reviews.map((revContent, index) => {
                  return (
                    <div key={`review-${index}`}>
                      <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap">
                        <div className="mt-6 ml-4 flex flex-row md:mt-0 md:flex-col">
                          <div className="h-20 w-20 md:h-24 md:w-24">
                            <Image
                              priority={true}
                              onLoad={loaded}
                              quality={50}
                              src={`/assets/images/clubs/${clubID}/profile-${index + 1}.jpg`}
                              placeholder="blur"
                              blurDataURL={`/assets/images/clubs/${clubID}/profile-${index + 1}.jpg`}
                              width="128"
                              height="128"
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div className="mt-1 flex flex-col pl-2 text-gray-500 md:mt-3 md:pl-0">
                            <h1 className="text-xl font-black md:text-2xl">{revContent.name}</h1>
                            <span className="w-max text-xs">{revContent.contact}</span>
                            <span className="text-xs">เตรียมอุดม {revContent.year}</span>
                          </div>
                        </div>
                        <div className="flex flex-col md:ml-8">
                          <div className="relative hidden md:block">
                            <span className="absolute left-10 top-6 text-7xl text-gray-300">“</span>
                          </div>
                          <div className="bg-whtie rounded-xl px-6 shadow-lg md:px-16 md:pt-12 md:pb-16">
                            <div className="h-12 pt-2 text-center text-6xl text-gray-300 md:hidden">
                              <span className="absolute">“</span>
                            </div>
                            <article
                              dangerouslySetInnerHTML={{ __html: `${revContent.context}` }}
                              className="font-texts text-[1.05rem] text-gray-500"
                            ></article>
                            <h1 className="mt-4 h-14 w-full text-center text-6xl text-gray-300 md:hidden">”</h1>
                          </div>
                          <div className="relative hidden md:block">
                            <span className="absolute right-16 -top-16 text-7xl text-gray-300">”</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-14 bg-TUCMC-gray-100 py-16">
          <h1 className="text-center text-2xl">ชมรมอื่น ๆ</h1>
          <div className="mx-auto mt-5 flex w-full max-w-5xl max-w-[1100px] flex-wrap justify-center pb-20 md:mt-14">
            {allowedSugg.map((item, index) => {
              return <ClubCard key={`suggestion-${index}`} data={item} />
            })}
          </div>
        </div>
      </div>
      <ClubSkeleton className={classnames(loadingCount <= 0 && "hidden")} />
    </PageContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("./_map/clubs/")
  const paths = files.map((pathname) => ({
    params: { clubID: path.basename(pathname, path.extname(pathname)) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = fs.readFileSync(`./_map/clubs/${params.clubID}.json`)
  const images = fs.readdirSync(`./public/assets/images/clubs/${params.clubID}/`)
  const clubData = JSON.parse(data.toString())

  const clubIndex = fs.readFileSync("./_map/clubs.json")
  const clubList = JSON.parse(clubIndex.toString())

  return {
    props: {
      data: {
        ...clubData,
        description: parseText(clubData.description),
        reviews: clubData.reviews.map((rev) => {
          return { ...rev, context: parseText(rev.context) }
        }),
      },
      clubID: params.clubID,
      images: images,
      clubList: clubList,
    },
  }
}

export default Page
