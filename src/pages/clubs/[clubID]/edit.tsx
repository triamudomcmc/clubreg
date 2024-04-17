import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import * as fs from "fs"
import path from "path"
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react"
import {ChevronDownIcon, ClipboardCopyIcon, CloudIcon, CloudUploadIcon, StarIcon} from "@heroicons/react/solid"
import PageContainer from "@components/common/PageContainer"
import Image from "next/image"
import { CameraIcon, CheckIcon, GlobeAltIcon, PlusIcon, TrashIcon, UserIcon, XIcon } from "@heroicons/react/outline"
import { PencilIcon } from "@heroicons/react/solid"
import { isEmpty } from "@utilities/object"
import { useWindowDimensions } from "@utilities/document"
import Router, { useRouter } from "next/router"
import classnames from "classnames"
import ClubSkeleton from "@components/clubs/ClubSkeleton"
import Modal from "@components/common/Modals"
import { useAuth } from "@handlers/client/auth"
import { useToast } from "@components/common/Toast/ToastContext"
import { QuillEditor } from "@components/common/TextEdit/Quill"
import { StatusText } from "@components/panel/table/TableRow"
import { request } from "@handlers/client/utilities/request"
import { motion } from "framer-motion"
import { EditableZoomable } from "@components/common/Zoomable/editable"
import { toBase64 } from "@utilities/files"
import initialisedDB from "@server/firebase-admin"
import { removeItem } from "@utilities/array"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"
import { getImages } from "@utilities/getImages"

const parseText = (text) => {
  return "<p>" + text.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>")
}

const ClubHeaderCard = ({
  clubID,
  data,
  status,
  contactRef,
  onLoad,
  publish,
  image,
  setImage,
  newImages,
  contact,
  setContact,
  clubData,
}) => {
  const [publishing, setPublishing] = useState(false)
  const [initialContact, setInitContact] = useState(contact)
  const uploader = useRef(null)
  const doUpload = async (e) => {
    const data = await toBase64(e.target.files[0])
    //@ts-ignore
    setImage(data)
  }

  const avail = ["ไม่มี", "FB", "IG", "Twitter", "YT", "Tiktok", "Line"]

  return (
    <div className="md:mx-6 md:mt-20 md:mb-2">
      <div className="flex items-center justify-between space-x-4 px-2 py-4">
        <div className="flex items-center space-x-4">
          <span>สถานะ:</span>
          <StatusText status={status} />
        </div>
        <div>
          <button
            onClick={async () => {
              setPublishing(true)
              await publish()
              setPublishing(false)
            }}
            className="rounded-full bg-TUCMC-pink-400 px-8 py-2 text-white transition-colors hover:bg-TUCMC-pink-500"
          >
            {publishing ? <Ellipsis className="h-6 w-[2.4rem]" /> : "ส่งการแก้ไข"}
          </button>
        </div>
      </div>

      <div className="md:flex md:space-x-8 md:rounded-2xl md:bg-white md:shadow-md">
        <div className={classnames("relative md:max-w-[512px]", image ? "mb-[0px]" : "mb-[-6.5px]")}>
          <div>
            {!image ? (
              <Image
                priority={true}
                onLoad={onLoad}
                src={"mainImage" in newImages ? newImages["mainImage"] : `/assets/thumbnails/${clubID}.jpg`}
                placeholder="blur"
                blurDataURL={"mainImage" in newImages ? newImages["mainImage"] : `/assets/thumbnails/${clubID}.jpg`}
                width="768"
                height="432"
                quality={75}
                className={classnames("object-cover md:rounded-l-2xl")}
              />
            ) : (
              <img
                src={image}
                className={classnames("mb-[0px] h-[54vw] object-cover sm:h-[288px] md:rounded-l-2xl")}
                width="768"
                height="432"
              />
            )}
          </div>
          <input
            className="hidden"
            ref={uploader}
            onChange={doUpload}
            type="file"
            accept="image/png, image/jpeg, image/heif"
          />
          <motion.div
            onClick={() => {
              uploader.current.click()
            }}
            initial={{ opacity: 0.4 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center bg-TUCMC-gray-800 bg-opacity-70 text-white sm:h-[288px] sm:rounded-l-2xl"
          >
            <CameraIcon className="h-12 w-12" />
          </motion.div>
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
                {(clubData ? clubData.audition : data.audition) ? (
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
                  <span>สมาชิก {clubData?.count_limit} คน</span>
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
                        {!isEmpty(contact.contact) && (
                          <h1>
                            <select
                              onChange={(e) => {
                                setContact((prev) => ({
                                  ...prev,
                                  contact: {
                                    type: e.target.value,
                                    context: prev.contact.context,
                                  },
                                }))
                              }}
                              className="outline-none focus:outline-none border-none py-0 pl-0 focus:border-none"
                            >
                              {avail.map((i, k) => {
                                return (
                                  <option key={`opt11-${k}`} value={i} selected={contact.contact.type === i}>
                                    {i}
                                  </option>
                                )
                              })}
                            </select>{" "}
                            :{" "}
                            <span
                              onKeyUpCapture={(e) => {
                                setContact((prev) => ({
                                  ...prev,
                                  contact: {
                                    type: prev.contact.type,
                                    //@ts-ignore
                                    context: e.target.innerText,
                                  },
                                }))
                              }}
                              contentEditable={true}
                              className={contact.contact.type === "ไม่มี" && "hidden"}
                            >
                              {initialContact.contact.context}
                            </span>
                          </h1>
                        )}
                        {!isEmpty(contact.contact2) && (
                          <h1>
                            <select
                              onChange={(e) => {
                                setContact((prev) => ({
                                  ...prev,
                                  contact2: {
                                    type: e.target.value,
                                    context: prev.contact2.context,
                                  },
                                }))
                              }}
                              className="outline-none focus:outline-none border-none py-0 pl-0 focus:border-none"
                            >
                              {avail.map((i, k) => {
                                return (
                                  <option key={`opt22-${k}`} value={i} selected={contact.contact2.type === i}>
                                    {i}
                                  </option>
                                )
                              })}
                            </select>{" "}
                            :{" "}
                            <span
                              onKeyUpCapture={(e) => {
                                setContact((prev) => ({
                                  ...prev,
                                  contact2: {
                                    type: prev.contact2.type,
                                    //@ts-ignore
                                    context: e.target.innerText,
                                  },
                                }))
                              }}
                              contentEditable={true}
                              className={contact.contact2.type === "ไม่มี" && "hidden"}
                            >
                              {initialContact.contact2.context}
                            </span>
                          </h1>
                        )}
                        {!isEmpty(contact.contact3) && (
                          <h1>
                            <select
                              onChange={(e) => {
                                setContact((prev) => ({
                                  ...prev,
                                  contact3: {
                                    type: e.target.value,
                                    context: prev.contact3.context,
                                  },
                                }))
                              }}
                              className="outline-none focus:outline-none border-none py-0 pl-0 focus:border-none"
                            >
                              {avail.map((i, k) => {
                                return (
                                  <option key={`opt33-${k}`} value={i} selected={contact.contact3.type === i}>
                                    {i}
                                  </option>
                                )
                              })}
                            </select>{" "}
                            :{" "}
                            <span
                              onKeyUpCapture={(e) => {
                                setContact((prev) => ({
                                  ...prev,
                                  contact3: {
                                    type: prev.contact3.type,
                                    //@ts-ignore
                                    context: e.target.innerText,
                                  },
                                }))
                              }}
                              contentEditable={true}
                              className={contact.contact3.type === "ไม่มี" && "hidden"}
                            >
                              {initialContact.contact3.context}
                            </span>
                          </h1>
                        )}
                      </div>
                    </Modal>
                  </div>
                  <div className="flex flex-col md:hidden lg:block">
                    {!isEmpty(contact.contact) && (
                      <h1>
                        <select
                          onChange={(e) => {
                            setContact((prev) => ({
                              ...prev,
                              contact: {
                                type: e.target.value,
                                context: prev.contact.context,
                              },
                            }))
                          }}
                          className="outline-none focus:outline-none border-none py-0 pl-0 focus:border-none"
                        >
                          {avail.map((i, k) => {
                            return (
                              <option key={`opt1-${k}`} value={i} selected={contact.contact.type === i}>
                                {i}
                              </option>
                            )
                          })}
                        </select>{" "}
                        :{" "}
                        <span
                          onKeyUpCapture={(e) => {
                            setContact((prev) => ({
                              ...prev,
                              contact: {
                                type: prev.contact.type,
                                //@ts-ignore
                                context: e.target.innerText,
                              },
                            }))
                          }}
                          contentEditable={true}
                          className={contact.contact.type === "ไม่มี" && "hidden"}
                        >
                          {initialContact.contact.context}
                        </span>
                      </h1>
                    )}
                    {!isEmpty(contact.contact2) && (
                      <h1>
                        <select
                          onChange={(e) => {
                            setContact((prev) => ({
                              ...prev,
                              contact2: {
                                type: e.target.value,
                                context: prev.contact2.context,
                              },
                            }))
                          }}
                          className="outline-none focus:outline-none border-none py-0 pl-0 focus:border-none"
                        >
                          {avail.map((i, k) => {
                            return (
                              <option key={`opt2-${k}`} value={i} selected={contact.contact2.type === i}>
                                {i}
                              </option>
                            )
                          })}
                        </select>{" "}
                        :{" "}
                        <span
                          onKeyUpCapture={(e) => {
                            setContact((prev) => ({
                              ...prev,
                              contact2: {
                                type: prev.contact2.type,
                                //@ts-ignore
                                context: e.target.innerText,
                              },
                            }))
                          }}
                          contentEditable={true}
                          className={contact.contact2.type === "ไม่มี" && "hidden"}
                        >
                          {initialContact.contact2.context}
                        </span>
                      </h1>
                    )}
                    {!isEmpty(contact.contact3) && (
                      <h1>
                        <select
                          onChange={(e) => {
                            setContact((prev) => ({
                              ...prev,
                              contact3: {
                                type: e.target.value,
                                context: prev.contact3.context,
                              },
                            }))
                          }}
                          className="outline-none focus:outline-none border-none py-0 pl-0 focus:border-none"
                        >
                          {avail.map((i, k) => {
                            return (
                              <option key={`opt3-${k}`} value={i} selected={contact.contact3.type === i}>
                                {i}
                              </option>
                            )
                          })}
                        </select>{" "}
                        :{" "}
                        <span
                          onKeyUpCapture={(e) => {
                            setContact((prev) => ({
                              ...prev,
                              contact3: {
                                type: prev.contact3.type,
                                //@ts-ignore
                                context: e.target.innerText,
                              },
                            }))
                          }}
                          contentEditable={true}
                          className={contact.contact3.type === "ไม่มี" && "hidden"}
                        >
                          {initialContact.contact3.context}
                        </span>
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
    </div>
  )
}

const MainArticle: FC<{ value: string; setValue: any }> = ({ value, setValue }) => {
  return (
    <div className="w-full">
      <QuillEditor value={value} onChange={setValue} />

      {/* <div className="ql-bubble ql-container">
        <div className="ql-editor" dangerouslySetInnerHTML={{__html: value}}>

        </div>
      </div> */}
    </div>
  )
}

const SummaryImages = ({ images, onLoad, clubID, setImageS, newImages }) => {
  const [ime, setIme] = useState([])

  useEffect(() => {
    let im = [...images].filter((e) => e.includes("picture"))
    while (im.length < 3) {
      im.push("https://storage.googleapis.com/clwimages/placeholder-image.png")
    }
    setIme(im)
  }, [images])

  return (
    <div className="space-y-8 md:flex md:justify-center md:space-y-0 md:space-x-4">
      {ime.map((name, index) => {
        if (name.includes("picture") || name.includes("https://"))
          return (
            <div key={`picture-${index}`}>
              <EditableZoomable
                priority={true}
                onLoad={onLoad}
                className="rounded-lg object-cover"
                src={
                  `picture-${index + 1}` in newImages
                    ? newImages[`picture-${index + 1}`]
                    : name.includes("picture-")
                    ? `/assets/images/clubs/${clubID}/${name}`
                    : `${name}`
                }
                updateImage={(d) => {
                  setImageS((prev) => {
                    return { ...prev, [`picture-${index + 1}`]: d }
                  })
                }}
                width={768}
                height={432}
              />
            </div>
          )
      })}
    </div>
  )
}

const ReviewContent: FC<{
  reviews: any[]
  onLoad: () => void
  clubID: string
  setReviews: any
  setImageReview: any
  setRerender: any
}> = ({ reviews, onLoad, clubID, setReviews, setImageReview, setRerender }) => {
  return (
    <div className="space-y-10 md:space-y-16">
      {reviews.length > 0 && <h1 className="text-2xl text-TUCMC-gray-700">รีวิวจากรุ่นพี่</h1>}
      <div className="space-y-16 md:space-y-24">
        {reviews.map((revContent, index) => {
          return (
            <Review
              revContent={revContent}
              index={index}
              onLoad={onLoad}
              clubID={clubID}
              setReviews={setReviews}
              setImageReview={setImageReview}
              setRerender={setRerender}
            />
          )
        })}
        {reviews.length < 3 && (
          <div className="flex justify-center">
            <div
              onClick={() => {
                setReviews((prev) => [
                  ...prev,
                  {
                    contact: "IG: instagram",
                    context: "",
                    name: "ชื่อ",
                    profile: "https://storage.googleapis.com/clwimages/placeholder-profile.png",
                    year: "85",
                  },
                ])
              }}
              className="flex cursor-pointer items-center space-x-2 rounded-full bg-white px-6 py-3 shadow-md"
            >
              <PlusIcon className="h-5 w-5" /> <h1>เพิ่มรีวิวจากรุ่นพี่</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Review = ({ revContent, index, onLoad, clubID, setReviews, setImageReview, setRerender }) => {
  const [image, setImage] = useState<string | null>(null)
  const uploader = useRef(null)
  const doUpload = async (e) => {
    const data = await toBase64(e.target.files[0])
    //@ts-ignore
    setImage(data)
  }

  useEffect(() => {
    image &&
      setReviews((prev) => {
        prev[index].profile = image
        return prev
      })
  }, [image])

  return (
    <div key={`review-${index}`}>
      <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap">
        <div className="mt-6 ml-4 flex flex-row md:mt-0 md:flex-col">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            {!image ? (
              <Image
                priority={true}
                onLoad={onLoad}
                src={`${revContent.profile}`}
                placeholder="blur"
                quality={50}
                blurDataURL={`${revContent.profile}`}
                width="128"
                height="128"
                className="rounded-lg object-cover"
              />
            ) : (
              <img
                src={image}
                width="128px"
                height="128px"
                className="h-20 w-20 rounded-lg object-cover md:h-24 md:w-24"
              />
            )}
            <input
              className="hidden"
              ref={uploader}
              onChange={doUpload}
              type="file"
              accept="image/png, image/jpeg, image/heif"
            />
            <motion.div
              onClick={() => {
                uploader.current.click()
              }}
              initial={{ opacity: 0.4 }}
              whileHover={{ opacity: 1 }}
              className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-TUCMC-gray-800 bg-opacity-70 text-white"
            >
              <CameraIcon className="h-12 w-12" />
            </motion.div>
          </div>
          <div className="mt-1 flex flex-col pl-2 text-gray-500 md:mt-3 md:pl-0">
            <h1
              contentEditable={true}
              onKeyUpCapture={(e) => {
                setReviews((prev) => {
                  //@ts-ignore
                  prev[index].name = e.target.innerText
                  return prev
                })
              }}
              className="text-xl font-black md:text-2xl"
            >
              {revContent.name}
            </h1>
            <span
              contentEditable={true}
              onKeyUpCapture={(e) => {
                setReviews((prev) => {
                  //@ts-ignore
                  prev[index].contact = e.target.innerText
                  return prev
                })
              }}
              className="w-max text-xs"
            >
              {revContent.contact}
            </span>
            <span className="text-xs">
              เตรียมอุดม{" "}
              <span
                contentEditable={true}
                onKeyUpCapture={(e) => {
                  setReviews((prev) => {
                    //@ts-ignore
                    prev[index].year = e.target.innerText
                    return prev
                  })
                }}
              >
                {revContent.year}
              </span>
            </span>
            <div
              onClick={() => {
                setReviews((prev) => {
                  return removeItem(prev, index)
                })
                setRerender(true)
              }}
              className="mt-2 flex cursor-pointer justify-center rounded-md bg-red-100 py-1 shadow-md"
            >
              <TrashIcon className="h-7 w-7" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col md:ml-8">
          <div className="relative hidden md:block">
            <span className="absolute left-10 top-6 text-7xl text-gray-300">“</span>
          </div>
          <div className="rounded-xl bg-white px-6 shadow-lg md:px-16 md:pt-12 md:pb-16">
            <div className="h-12 pt-2 text-center text-6xl text-gray-300 md:hidden">
              <span className="absolute">“</span>
            </div>
            <QuillEditor
              value={revContent.context}
              onChange={(e) => {
                setReviews((prev) => {
                  prev[index].context = e
                  return prev
                })
              }}
              className="w-full"
            />
            <h1 className="mt-4 h-14 w-full text-center text-6xl text-gray-300 md:hidden">”</h1>
          </div>
          <div className="relative hidden md:block">
            <span className="absolute right-16 -top-16 text-7xl text-gray-300">”</span>
          </div>
        </div>
      </div>
    </div>
  )
}
const getMime = (data: string) => {
  return data.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]
}

const uploadImage = async (uploadPoli: any, file: any) => {
  const { url, fields } = uploadPoli
  const formData = new FormData()
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    // @ts-ignore
    formData.append(key, value)
  })

  const upload = await fetch(url, {
    mode: "cors",
    method: "POST",
    body: formData,
  })

  if (upload.ok) {
    console.log("goud")
  } else {
    console.error("Upload failed.")
  }
}

function dataURLtoFile(dataurl, filename) {

  console.log(dataurl)
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}


const Page = ({ data, clubID, images, clubData, newImages }) => {
  const { onReady } = useAuth()
  const router = useRouter()

  const [loadingCount, setLoadingCount] = useState(1)

  const contactRef = useRef(null)
  const { width } = useWindowDimensions()
  const { addToast } = useToast()

  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    rerender && setRerender(false)
  }, [rerender])

  const [reviews, setReviews] = useState(data.reviews)
  const [mainArt, setMainArt] = useState(data.description)
  const [uploadTask, setUploadTask] = useState({all: 0, done: 0})
  const [uploadErr, setUploadErr] = useState([])
  const [contactData, setContactData] = useState({
    contact: data.contact,
    contact2: isEmpty(data.contact2) ? { type: "ไม่มี", context: "แก้ไขข้อมูล" } : data.contact2,
    contact3: isEmpty(data.contact3) ? { type: "ไม่มี", context: "แก้ไขข้อมูล" } : data.contact3,
  })

  const [imageHead, setImageHead] = useState<string | null>(null)
  const [imageS, setImageS] = useState({})
  const [imageReview, setImageReview] = useState({})
  const [cancel, setCancel] = useState(false)

  const getAllPart = async () => {
    const safeContact = {}

    Object.keys(contactData).forEach((k) => {
      if (contactData[k].type === "ไม่มี") {
        safeContact[k] = {}
      } else {
        safeContact[k] = contactData[k]
      }
    })

    const formattedS = {}
    Object.keys(imageS).forEach((k) => {
      if (imageS[k] !== null) {
        formattedS[k] = {type: getMime(imageS[k])}
      }else{
        formattedS[k] = null
      }
    })

    const formattedReview = reviews.map(d => ({...d, profile: d.profile.includes("data:image") ? {type: getMime(d.profile)} :  d.profile}))

    const res = await request("database/editWeb", "submitChanges", {
      panelID: clubID,
      reviews: formattedReview,
      main: mainArt,
      contact: contactData,
      images: { mainImage: imageHead ? getMime(imageHead) : null, ...formattedS},
    })

    const awaitTimeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    await awaitTimeout(8000)

    if (res.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ส่งการแก้ไขข้อมูลสำเร็จ",
        text: "ระบบอาจะใช้เวลาถึง 2 นาทีในการประมวลผลข้อมูล หาก refresh หน้าจอแล้วการเปลี่ยนแปลงหายไปให้ลอง refresh ใหม่",
      })


      const policies = res.data.policies
      setUploadTask({all: policies.length, done: 0})

      console.log(policies)
      policies.forEach((p) => {
        const {key, content} = p
        switch (key) {
          case "mainImage" :
            uploadImage(content, dataURLtoFile(imageHead,"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปภาพหลัก กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
          case "picture-1" :
            uploadImage(content, dataURLtoFile(imageS["picture-1"],"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปภาพรูปที่ 1 กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
          case "picture-2" :
            uploadImage(content, dataURLtoFile(imageS["picture-2"],"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปภาพรูปที่ 2 กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
          case "picture-3" :
            uploadImage(content, dataURLtoFile(imageS["picture-3"],"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปภาพรูปที่ 3 กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
          case "review-0" :
            uploadImage(content, dataURLtoFile(reviews[0].profile,"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปโปรไฟล์รูปที่ 1 กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
          case "review-1" :
            uploadImage(content, dataURLtoFile(reviews[1].profile,"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปโปรไฟล์รูปที่ 2 กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
          case "review-2" :
            uploadImage(content, dataURLtoFile(reviews[2].profile,"test")).catch((e) => {
              setUploadErr(prev => ([...prev, `ไม่สามารถ upload รูปโปรไฟล์รูปที่ 3 กรุณาลองใหม่อีกครั้ง`]))
            }).then(() => {
              setUploadTask(prev => ({...prev, done: prev.done + 1}))
            })
            break
        }
      })

      setTimeout(() => {
        setCancel(true)
      }, 1000 * 6)

    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดระหว่างพยายามแก้ไขข้อมูล",
        text: "ปัญหานี้อาจเกิดจากการส่งไฟล์รูปที่มีขนาดใหญ่ แนะนำให้ compress รูป (https://compressjpeg.com) ก่อนส่งแก้ไขข้อมูลอีกครั้ง",
      })
    }

    return true
  }

  const userData = onReady((logged, userData) => {
    if (!logged) Router.push("/auth")
    else if (!("panelID" in userData) || userData.panelID.length <= 0) {
      Router.push("/select")
    } else if (
      !userData.panelID.map((e) => e.split("_")[0]).includes(clubID) &&
      !(clubID === "ก30920" && userData.panelID.map((e) => e.split("-")[0]).includes("ก30920"))
    ) {
      Router.push("/")
    }

    return userData
  })

  useEffect(() => {
    // get count of every Image element
    setLoadingCount(images.length + 1)

    setTimeout(() => {
      setLoadingCount(0)
    }, 10000)
  }, [router.query])

  const loaded = () => {
    setTimeout(() => {
      setLoadingCount((prevState) => prevState - 1)
    }, 100)
  }

  return (
    <PageContainer>
      {uploadTask.all > 0 && uploadTask.done - uploadTask.all !== 0 && <div className={"flex justify-center items-center min-h-screen w-full fixed top-0 left-0 z-[999] backdrop-blur-md"}>
        <div className="flex flex-col items-center">
          <CloudIcon className="w-16 h-16 animate-pulse text-gray-600"/>
        <h1 className="text-xl font-medium">กำลังประมวลผลรูปภาพ</h1>
          <span className="font-semibold text-TUCMC-red-500">ห้ามออกจากหน้านี้ ในขณะนี้</span>
        <span className="mt-2 text-sm">ทั้งหมด {uploadTask.all} เสร็จสิ้น {uploadTask.done}</span>
          {
            cancel && <a onClick={() => {
              setUploadErr([])
              setUploadTask({all: 0, done: 0})
              setRerender(true)
            }} className="text-sm mt-4 underline cursor-pointer hover:text-TUCMC-red-500 text-TUCMC-gray-600">ยกเลิกการประมวลผล</a>
          }
      </div>
      </div>}
      {rerender && <div className="hidden">s</div>}
      <div className={classnames(loadingCount > 0 && "absolute opacity-0")}>
        <div className="mx-auto max-w-[1100px]">
          <ClubHeaderCard
            status={clubData?.status}
            clubID={clubID}
            contactRef={contactRef}
            data={data}
            onLoad={loaded}
            publish={getAllPart}
            image={imageHead}
            setImage={setImageHead}
            newImages={newImages}
            contact={contactData}
            setContact={setContactData}
            clubData={clubData}
          />
          <div className="w-full border-b border-TUCMC-gray-300 md:hidden"></div>
          <div className="space-y-12 px-6 pb-24 pt-11 md:space-y-16 md:pt-12">
            <MainArticle value={mainArt} setValue={setMainArt} />
            <SummaryImages
              clubID={clubID}
              images={images}
              onLoad={loaded}
              setImageS={setImageS}
              newImages={newImages}
            />
            <ReviewContent
              clubID={clubID}
              onLoad={loaded}
              reviews={reviews}
              setReviews={setReviews}
              setImageReview={setImageReview}
              setRerender={setRerender}
            />
          </div>
        </div>
      </div>
      <ClubSkeleton className={classnames(loadingCount <= 0 && "hidden")} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await initialisedDB.collection("clubDisplayPending").doc(params.clubID.toString()).get()

  const images = getImages(params.clubID.toString())
  const clubDisplayData = data.data()

  const clubDataDoc = await initialisedDB.collection("clubs").doc(params.clubID.toString()).get()

  let clubData = clubDataDoc?.data()

  if (!clubData) {
    const clubDataDoc = await initialisedDB.collection("clubs").doc(`${params.clubID.toString()}_1`).get()

    let clubData = clubDataDoc?.data()
    if (!clubData) {
      const clubID = params.clubID.toString()
      if (clubID.includes("ก30920") && clubID !== "ก30920-8" && clubID !== "ก30920-9") {
        clubData = clubDataDoc?.get(`ก30920-1`)
        clubData = { ...clubData, count_limit: "__" }
      }
    } else {
      clubData = { ...clubData, count_limit: "__" }
    }
  }

  return {
    props: {
      data: {
        ...clubDisplayData,
        description: data.get("description"),
        reviews: data.get("reviews"),
      },
      clubData: clubData || null,
      clubID: params.clubID,
      images: images,
      newImages: data.get("images") || {},
    },
  }
}

export default Page
