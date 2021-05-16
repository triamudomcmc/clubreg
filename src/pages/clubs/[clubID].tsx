import {GetStaticPaths, GetStaticProps} from "next";
import * as fs from "fs";
import path from "path";
import {useEffect, useRef, useState} from "react";
import {ChevronDownIcon, ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import {ClubCard} from "@components/clubs/ClubCard";
import PageContainer from "@components/common/PageContainer";
import Image from "next/image"
import {GlobeAltIcon, UserIcon} from "@heroicons/react/outline";
import {isEmpty} from "@utilities/object";
import {useWindowDimensions} from "@utilities/document";
import {useRouter} from "next/router";
import classnames from "classnames"
import ClubSkeleton from "@components/clubs/ClubSkeleton";
import Modal from "@components/common/Modals";

const parseText = (text) => {
  return '<p>' + text.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>')
}

export const getStaticPaths: GetStaticPaths = async () => {

  const files = fs.readdirSync("./_map/clubs/")
  const paths = files.map((pathname) => ({
    params: {clubID: path.basename(pathname, path.extname(pathname))},
  }))

  return {
    paths,
    fallback: false
  }

}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const data = fs.readFileSync(`./_map/clubs/${params.clubID}.json`)
  const images = fs.readdirSync(`./public/assets/images/clubs/${params.clubID}/`)
  const clubData = JSON.parse(data.toString())


  const clubIndex = fs.readFileSync("./_map/clubs.json")
  const clubList = JSON.parse(clubIndex.toString())

  return {
    props: {
      data: {...clubData, description: parseText(clubData.description), reviews: clubData.reviews.map(rev => {
        return {...rev, context: parseText(rev.context)}
        })},
      clubID: params.clubID,
      images: images,
      clubList: clubList
    }
  }
}

const createSuggestion = (clubList, clubID, setSuggestion) => {
  const max = clubList.length
  let rand = []
  let sugg = []

  //create suggestion
  while (rand.length <= 9) {
    const num = Math.floor(Math.random() * max)
    if (!rand.includes(num) && clubList[num].clubID !== clubID) {
      rand.push(num);
      sugg.push(clubList[num])
    }
  }

  setSuggestion(sugg)
}

const Page = ({data, clubID, images, clubList}) => {

  const [suggestion, setSuggestion] = useState([])
  const [allowedSugg, setAllowedSugg] = useState(suggestion)
  const [loadingCount, setLoadingCount] = useState(1)
  const router = useRouter()

  const contactRef = useRef(null)

  const {width} = useWindowDimensions()

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
    }else{
      setAllowedSugg(suggestion)
    }


  },[width, suggestion])

  const loaded = () => {
    setTimeout(() => {
      setLoadingCount(prevState => (prevState - 1))
    }, 100)
  }

  return (
    <PageContainer>
      <div className={classnames(loadingCount > 0 && "absolute opacity-0")}>
        <div className="max-w-[1100px] mx-auto">
          <div className="md:flex md:mt-20 md:mb-2 md:bg-white md:shadow-md md:rounded-2xl md:space-x-8 md:mx-6">
            <div>
              <div className="relative mb-[-6.5px] md:max-w-[512px]">
                <Image priority={true} onLoad={loaded} src={`/assets/thumbnails/${clubID}.jpg`} width="768" height="432"
                       className={classnames("md:rounded-l-2xl object-cover")}/>
              </div>
            </div>
            <div className="pl-6 pr-12">
              <div className="w-full h-6 md:h-[2vw]"></div>
              <div className="space-y-5">
                <div>
                  <h1 className="text-xl">ชมรม{data.nameTH}</h1>
                  <h1 className="text-TUCMC-gray-600">{data.nameEN}</h1>
                </div>
                <div className="space-y-1">
                  {data.audition ? <div className="flex space-x-2 text-TUCMC-pink-400">
                    <StarIcon className="w-6 h-6"/>
                    <span>มีการ Audition</span>
                  </div> : <div className="flex space-x-2 text-TUCMC-blue-400">
                    <ClipboardCopyIcon className="w-6 h-6"/>
                    <span>ไม่มีการ Audition</span>
                  </div>}
                  <div className="flex space-x-2 text-TUCMC-gray-600">
                    <UserIcon className="w-6 h-6"/>
                    <span>สมาชิก {data.count} คน</span>
                  </div>
                  <div className="flex space-x-2 text-TUCMC-gray-600">
                    <GlobeAltIcon className="w-6 h-6"/>
                    <div className="hidden md:block lg:hidden">
                      <a ref={contactRef} className="flex items-center space-x-2 cursor-pointer">
                        <h1 className="whitespace-nowrap">ช่องทางการติดตาม</h1>
                        <ChevronDownIcon className="w-5 h-5"/>
                      </a>
                      <Modal TriggerRef={contactRef} overlayClassName="flex justify-end" className="shadow-md rounded-lg absolute bg-white w-[300px] mt-1 px-4 py-3 z-20">
                        <div className="flex flex-col">
                          {data.contact && <h1>FB : {data.contact}</h1>}
                          {data.contact2 && <h1>IG : {data.contact2}</h1>}
                          {!isEmpty(data.contact3) && <h1>{data.contact3.type} : {data.contact3.context}</h1>}
                        </div>
                      </Modal>
                    </div>
                    <div className="md:hidden lg:block flex flex-col">
                      {data.contact && <h1>FB : {data.contact}</h1>}
                      {data.contact2 && <h1>IG : {data.contact2}</h1>}
                      {!isEmpty(data.contact3) && <h1>{data.contact3.type} : {data.contact3.context}</h1>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-10 md:h-[2vw]"></div>
            </div>
          </div>
          <div className="md:hidden w-full border-b border-TUCMC-gray-300"></div>
          <div className="px-6 space-y-12 md:space-y-16 pb-24 pt-11 md:pt-12">
            <div>
              <article dangerouslySetInnerHTML={{__html: `${data.description}`}}
                       style={{textIndent: "40px"}} className="font-texts prose text-TUCMC-gray-700 space-y-4 text-[1.05rem]">

              </article>
            </div>
            <div className="space-y-8 md:space-y-0 md:flex md:space-x-4 md:justify-center">
              {
                images.map((name, index) => {
                  if (name.includes("picture")) return <div key={`picture-${index}`}>
                    <Image priority={true} onLoad={loaded} className="rounded-lg object-cover" src={`/assets/images/clubs/${clubID}/${name}`} width="768"
                           height="432"/>
                  </div>
                })
              }
            </div>
            <div className="space-y-10 md:space-y-16">
              <h1 className="text-2xl text-TUCMC-gray-700">รีวิวจากรุ่นพี่</h1>
              <div className="space-y-16 md:space-y-24">
                {data.reviews.map((revContent, index) => {
                  return <div key={`review-${index}`}>
                    <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row">
                      <div className="flex flex-row mt-6 md:flex-col md:mt-0 ml-4">
                        <div className="w-20 h-20 md:w-24 md:h-24">
                          <Image
                            priority={true}
                            onLoad={loaded}
                            src={`/assets/images/clubs/${clubID}/profile-${index + 1}.jpg`}
                            width="128"
                            height="128"
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col pl-2 mt-1 text-gray-500 md:pl-0 md:mt-3">
                          <h1 className="text-xl font-black md:text-2xl">{revContent.name}</h1>
                          <span className="text-xs w-max">{revContent.contact}</span>
                          <span className="text-xs">เตรียมอุดม {revContent.year}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:ml-8">
                        <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-7xl left-10 top-6">
                  “
                </span>
                        </div>
                        <div className="px-6 shadow-lg bg-whtie rounded-xl md:pt-12 md:pb-16 md:px-16">
                          <div className="h-12 pt-2 text-6xl text-center text-gray-300 md:hidden">
                            <span className="absolute">“</span>
                          </div>
                          <article dangerouslySetInnerHTML={{__html: `${revContent.context}`}}
                                   style={{textIndent: "40px"}} className="font-texts prose text-gray-500 text-[1.05rem]">
                          </article>
                          <h1 className="w-full text-6xl text-center text-gray-300 md:hidden mt-4 h-14">
                            ”
                          </h1>
                        </div>
                        <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-7xl right-16 -top-16">
                  ”
                </span>
                        </div>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-TUCMC-gray-100 py-16 space-y-14">
          <h1 className="text-2xl text-center">ชมรมอื่น ๆ</h1>
          <div className="flex flex-wrap w-full justify-center max-w-5xl mt-5 md:mt-14 pb-20 max-w-[1100px] mx-auto">
            {
              allowedSugg.map((item, index) => {
                return <ClubCard key={`suggestion-${index}`} data={item}/>
              })
            }
          </div>
        </div>
      </div>
      <ClubSkeleton className={classnames(loadingCount <= 0 && "hidden")}/>
    </PageContainer>
  )
}

export default Page