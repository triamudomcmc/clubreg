import {GetStaticPaths, GetStaticProps} from "next";
import * as fs from "fs";
import path from "path";
import {useEffect, useState} from "react";
import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import {ClubCard} from "@components/clubs/ClubCard";
import PageContainer from "@components/common/PageContainer";
import Image from "next/image"
import {GlobeAltIcon, UserIcon} from "@heroicons/react/outline";
import {isEmpty} from "@utilities/object";
import {useWindowDimensions} from "@utilities/document";

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

  const max = clubList.length
  let rand = []
  let suggestion = []

  //create suggestion
  while (rand.length <= 9) {
    const num = Math.floor(Math.random() * max)
    if (!rand.includes(num)) {
      rand.push(num);
      suggestion.push(clubList[num])
    }
  }

  return {
    props: {
      data: {...clubData, description: parseText(clubData.description), reviews: clubData.reviews.map(rev => {
        return {...rev, context: parseText(rev.context)}
        })},
      clubID: params.clubID,
      images: images,
      suggestion: suggestion
    }
  }
}

const Page = ({data, clubID, images, suggestion}) => {

  const [allowedSugg, setAllowedSugg] = useState(suggestion)

  const {width} = useWindowDimensions()

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


  },[width])

  return (
    <PageContainer>
      <div className="max-w-[1100px] mx-auto">
        <div className="md:flex md:my-20 md:bg-white md:shadow-md md:rounded-2xl md:space-x-8 md:mx-6">
            <div>
              <div className="mb-[-7px] md:max-w-[512px]">
                <Image src={`/assets/thumbnails/${clubID}.jpg`} width="768" height="432" className="md:rounded-l-2xl object-cover"/>
              </div>
            </div>
          <div className="pl-6 pr-14 pb-10 md:pb-0">
            <div className="space-y-5 pt-6">
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
                  <div className="flex flex-col">
                    {data.contact && <h1>FB : {data.contact}</h1>}
                    {data.contact2 && <h1>IG : {data.contact2}</h1>}
                    {!isEmpty(data.contact3) && <h1>{data.contact3.title} : {data.contact3.context}</h1>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden w-full border-b border-TUCMC-gray-300"></div>
        <div className="px-6 space-y-16 md:space-y-24 pb-24 pt-10 md:pt-6">
          <div>
            <article dangerouslySetInnerHTML={{__html: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.description}`}} className="prose text-TUCMC-gray-700 space-y-4 text-[1.05rem]">

            </article>
          </div>
          <div className="space-y-8 md:space-y-0 md:flex md:space-x-4 md:justify-center">
            {
              images.map(name => {
                if (name.includes("picture")) return <div>
                  <Image className="rounded-lg object-cover" src={`/assets/images/clubs/${clubID}/${name}`} width="768" height="432" />
                </div>
              })
            }
          </div>
          <div className="space-y-10 md:space-y-16">
            <h1 className="text-2xl text-TUCMC-gray-700">รีวิวจากรุ่นพี่</h1>
            <div className="space-y-24">
              {data.reviews.map((revContent, index) => {
                return <div>
                  <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row">
                    <div className="flex flex-row mt-6 md:flex-col md:mt-0 ml-4">
                      <div className="w-20 h-20 md:w-24 md:h-24">
                        <Image
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
                        <div className="h-8 pt-2 text-6xl text-center text-gray-300 md:hidden">
                          <span className="absolute">“</span>
                        </div>
                        <article dangerouslySetInnerHTML={{__html: `&nbsp;&nbsp;&nbsp;&nbsp;${revContent.context}`}} className="prose text-gray-500 text-medium">
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
            allowedSugg.map(item => {
              return <ClubCard data={item}/>
            })
          }
        </div>
      </div>
    </PageContainer>
  )
}

export default Page