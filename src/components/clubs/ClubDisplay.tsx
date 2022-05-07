import { ClubDisplay } from "@interfaces/clubDisplay"
import classNames from "classnames"
import Image from "next/image"
import { FC, forwardRef, MutableRefObject, RefObject, useEffect, useRef, useState } from "react"
import ClubSkeleton from "./ClubSkeleton"
import { ChevronDownIcon, ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { GlobeAltIcon, UserIcon } from "@heroicons/react/outline"
import Modal from "@components/common/Modals"
import { isEmpty } from "@utilities/object"
import { Zoomable } from "@components/common/Zoomable"
import { QuillEditor } from "@components/common/TextEdit/Quill"
import { ForwardRefComponent } from "framer-motion"
import { ClubCard } from "./ClubCard"

const ClubHeader: FC<{ clubID: string; clubDisplay: ClubDisplay; loaded: () => void }> = ({
  clubID,
  clubDisplay,
  loaded,
}) => {
  const contactRef = useRef(null)

  return (
    <div className="md:mx-6 md:mt-20 md:mb-2 md:flex md:space-x-8 md:rounded-2xl md:bg-white md:shadow-md">
      <div>
        <div className="relative mb-[-6.5px] md:max-w-[512px]">
          <Image
            priority={true}
            onLoad={loaded}
            blurDataURL={clubDisplay?.images?.mainImage || `/assets/thumbnails/${clubID}.jpg`}
            src={clubDisplay?.images?.mainImage || `/assets/thumbnails/${clubID}.jpg`}
            placeholder="blur"
            quality={75}
            width="768"
            height="432"
            className={classNames("object-cover md:rounded-l-2xl")}
          />
        </div>
      </div>
      <div className="flex">
        <div className="hidden h-2 w-6 md:block"></div>
        <div className="pl-6 pr-12 md:pl-0">
          <div className="h-6 w-full md:h-[1.8vw]"></div>
          <div className="space-y-5">
            <div>
              <h1 id={clubDisplay.nameTH} className="min-w-[150px] text-xl">
                ชมรม{clubDisplay.nameTH}
              </h1>
              <h1 className="text-TUCMC-gray-600">{clubDisplay.nameEN}</h1>
            </div>
            <div className="space-y-1">
              {clubDisplay.audition ? (
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
                <span>สมาชิก {clubDisplay.count} คน</span>
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
                      {/* @ts-ignore */}
                      {!isEmpty(clubDisplay.contact) && clubDisplay?.contact?.type !== "ไม่มี" && (
                        <span>
                          {/* @ts-ignore */}
                          {clubDisplay.contact?.type} : {clubDisplay.contact.context}
                        </span>
                      )}
                      {/* @ts-ignore */}
                      {!isEmpty(clubDisplay.contact2) && clubDisplay?.contact2?.type !== "ไม่มี" && (
                        <span>
                          {/* @ts-ignore */}
                          {clubDisplay.contact2?.type} : {clubDisplay.contact2?.context}
                        </span>
                      )}
                      {/* @ts-ignore */}
                      {!isEmpty(clubDisplay.contact3) && clubDisplay?.contact3?.type !== "ไม่มี" && (
                        <span>
                          {/* @ts-ignore */}
                          {clubDisplay.contact3?.type} : {clubDisplay.contact3?.context}
                        </span>
                      )}
                    </div>
                  </Modal>
                </div>
                <div className="flex flex-col md:hidden lg:flex">
                  {/* @ts-ignore */}
                  {!isEmpty(clubDisplay.contact) && clubDisplay?.contact?.type !== "ไม่มี" && (
                    <span>
                      {/* @ts-ignore */}
                      {clubDisplay.contact.type} : {clubDisplay.contact.context}
                    </span>
                  )}
                  {/* @ts-ignore */}
                  {!isEmpty(clubDisplay.contact2) && clubDisplay?.contact2?.type !== "ไม่มี" && (
                    <span>
                      {/* @ts-ignore */}
                      {clubDisplay.contact2.type} : {clubDisplay.contact2.context}
                    </span>
                  )}
                  {/* @ts-ignore */}
                  {!isEmpty(clubDisplay.contact3) && clubDisplay?.contact3?.type !== "ไม่มี" && (
                    <span>
                      {/* @ts-ignore */}
                      {clubDisplay.contact3.type} : {clubDisplay.contact3.context}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="h-10 w-full md:h-[2vw]"></div>
        </div>
      </div>
    </div>
  )
}

function imageURL(clubDisplay, clubID, index) {
  if (clubDisplay?.images && clubDisplay?.images[`picture-${index + 1}`])
    return clubDisplay?.images[`picture-${index + 1}`]
  else return `/assets/images/clubs/${clubID}/picture-${index + 1}.jpg`
}

export const ClubDisplaySection: FC<{
  clubDisplay: ClubDisplay
  clubID: string
  imgLoading: boolean
  editable?: boolean
  onDataChange?: (data: { reviews: any[]; description: string }) => void
  suggestions?: any[]
}> = ({ clubDisplay, clubID, imgLoading, editable, onDataChange, suggestions }) => {
  const [loadingCount, setLoadingCount] = useState(1)

  const [reviews, setReviews] = useState(clubDisplay.reviews)
  const [description, setDescription] = useState(clubDisplay.description)

  useEffect(() => {
    setReviews(clubDisplay.reviews)
    setDescription(clubDisplay.description)

    setTimeout(() => {
      setLoadingCount(0)
    }, 2000)
  }, [clubDisplay])

  useEffect(() => {
    if (onDataChange) onDataChange({ reviews, description })
  }, [reviews, description])

  const loaded = () => {
    setTimeout(() => {
      setLoadingCount((prevState) => prevState - 1)
    }, 100)
  }

  useEffect(() => {
    console.log(loadingCount)
  }, [loadingCount])

  useEffect(() => {
    if (imgLoading) setLoadingCount(1)
  }, [imgLoading])

  return (
    <div>
      <div className="mx-auto max-w-[1100px]">
        <div className={classNames(loadingCount > 0 && "absolute opacity-0")}>
          <ClubHeader clubDisplay={clubDisplay} clubID={clubID} loaded={loaded} />
          <hr className="w-full border-b border-TUCMC-gray-300 md:hidden" />

          <main className="space-y-12 px-6 pb-24 pt-11 md:space-y-16 md:pt-12">
            {/* article */}

            {editable ? (
              <QuillEditor
                value={description}
                onChange={setDescription}
                className="club-article space-y-4 font-texts text-[1.05rem] text-TUCMC-gray-700"
              />
            ) : (
              <article
                id="article"
                dangerouslySetInnerHTML={{ __html: `${clubDisplay.description}` }}
                className="club-article space-y-4 font-texts text-[1.05rem] text-TUCMC-gray-700"
              ></article>
            )}

            {/* images */}
            <section id="club-images" className="space-y-8 md:flex md:justify-center md:space-y-0 md:space-x-4">
              {Array(3)
                .fill("")
                .map((_, index) => {
                  return (
                    <div key={`picture-${index}`}>
                      <Zoomable
                        priority={true}
                        onLoad={loaded}
                        className="rounded-lg object-cover"
                        src={imageURL(clubDisplay, clubID, index)}
                        width={768}
                        height={432}
                      />
                    </div>
                  )
                })}
            </section>

            {/* reviews */}
            <section className="space-y-10 md:space-y-16">
              {clubDisplay.reviews.length > 0 && (
                <h2 id="reviews" className="text-2xl text-TUCMC-gray-700">
                  รีวิวจากรุ่นพี่
                </h2>
              )}
              <div className="space-y-16 md:space-y-24">
                {reviews.map((revContent, index) => {
                  return (
                    <div key={`review-${index}`}>
                      <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap">
                        <div className="mt-6 ml-4 flex flex-row md:mt-0 md:flex-col">
                          <div className="h-20 w-20 md:h-24 md:w-24">
                            <Image
                              priority={true}
                              onLoad={loaded}
                              quality={50}
                              src={clubDisplay.reviews[index]?.profile}
                              placeholder="blur"
                              blurDataURL={clubDisplay.reviews[index]?.profile}
                              width="128"
                              height="128"
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div className="mt-1 flex flex-col pl-2 text-gray-500 md:mt-3 md:pl-0">
                            <p className="text-xl font-black md:text-2xl">{revContent.name}</p>
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
                            {editable ? (
                              <QuillEditor
                                value={revContent.context}
                                onChange={(e) => {
                                  setReviews((prev) => {
                                    prev[index].context = e
                                    return prev
                                  })
                                }}
                                className="club-article font-texts text-[1.05rem] text-gray-500"
                              />
                            ) : (
                              <article
                                dangerouslySetInnerHTML={{ __html: `${revContent.context}` }}
                                className="club-article font-texts text-[1.05rem] text-gray-500"
                              ></article>
                            )}
                            <p className="mt-4 h-14 w-full text-center text-6xl text-gray-300 md:hidden">”</p>
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
            </section>
          </main>
        </div>
      </div>
      {loadingCount <= 0 && suggestions && (
        <div className="space-y-14 bg-TUCMC-gray-100 py-16">
          <h1 className="text-center text-2xl">ชมรมอื่น ๆ</h1>
          <div className="mx-auto mt-5 flex w-full max-w-[1100px] flex-wrap justify-center pb-20 md:mt-14">
            {suggestions.map((item, index) => {
              return <ClubCard key={`suggestion-${index}`} data={item} />
            })}
          </div>
        </div>
      )}

      <ClubSkeleton className={classNames(loadingCount <= 0 && "hidden")} />
    </div>
  )
}
