import CardSplash from "@vectors/decorations/CardSplash"
import css from "./card.module.css"
import classnames from "classnames"
import { CalendarIcon, LocationMarkerIcon, SpeakerphoneIcon, UserIcon } from "@heroicons/react/solid"
import { LogoDarkIcon } from "@vectors/Logo"
import { clubMap } from "../../config/clubMap"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import { isEmpty } from "@utilities/object"
import { schoolYear } from "@config/time"
import UserData from "@interfaces/userData"

export const CustomCard = ({ width, clubData, panelID }) => {
  const qrCodeRef = useRef(null)

  useEffect(() => {
    // const canvas = document.getElementById("qrCode")
    QRCode.toCanvas(qrCodeRef.current, `https://register.clubs.triamudom.ac.th/`, {
      errorCorrectionLevel: "L",
      margin: 1.2,
    })
  }, [])

  return (
    <div
      style={{ ["--width" as string]: `${width}px` }}
      className={classnames(css.container, "relative flex flex-col items-center bg-white shadow-lg")}
    >
      <div className={classnames("text-center text-TUCMC-gray-700", css.mt18)}>
        <h1 className={css.text14}>นายเรียนเด่น เล่นดี</h1>
        <h1 className={css.text12}>ห้อง 111</h1>
      </div>
      <div className="relative">
        <CardSplash className={css.vector} />
        <canvas ref={qrCodeRef} id="qrCode" className={css.qrCode}></canvas>
      </div>
      <div className="flex w-full flex-col items-center bg-TUCMC-gray-100">
        <h1 className={classnames(css.text138, "text-TUCMC-700 w-full text-center tracking-tight", css.px17, css.mt18)}>
          ชมรม{clubMap[panelID]}
        </h1>
        <span className={classnames(css.greenbutt, "rounded-full bg-TUCMC-green-400 tracking-tight text-white")}>
          ลงทะเบียนสำเร็จ
        </span>
      </div>
      <div className={classnames("flex w-full flex-col items-start", css.textContainer)}>
        <div className={classnames("flex items-start", css.subContainer)}>
          <LocationMarkerIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
          <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>
            สถานที่เรียนชมรม <span className="text-TUCMC-gray-500">{clubData.place}</span>
          </span>
        </div>
        <div className={classnames("flex w-full items-start", css.subContainer)}>
          <SpeakerphoneIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
          <div className="flex w-[90%] flex-col">
            <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ข้อความจากชมรม</span>
            <p className={classnames(css.text1155, "overflow-wrap-anywhere break-words text-TUCMC-gray-500", css.mt55)}>
              {clubData.message}
            </p>
          </div>
        </div>
        <div className={classnames("flex items-start", css.subContainer)}>
          <SpeakerphoneIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
          <div className="flex flex-col">
            <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ช่องทางการติดต่อชมรม</span>
            <p
              className={classnames(
                css.text1155,
                "text-TUCMC-gray-500",
                css.mt55,
                isEmpty(clubData.contact) && "hidden"
              )}
            >
              {clubData.contact?.type} : {clubData.contact?.context}
            </p>
            <p
              className={classnames(
                css.text1155,
                "text-TUCMC-gray-500",
                css.mt55,
                isEmpty(clubData.contact2) && "hidden"
              )}
            >
              {clubData.contact2?.type} : {clubData.contact2?.context}
            </p>
            <p
              className={classnames(
                css.text1155,
                "text-TUCMC-gray-500",
                css.mt55,
                isEmpty(clubData.contact3) && "hidden"
              )}
            >
              {clubData.contact3?.type} : {clubData.contact3?.context}
            </p>
          </div>
        </div>
      </div>
      <div className={classnames("flex w-full justify-end", css.mt2)}>
        <LogoDarkIcon className={classnames(css.logo, "text-TUCMC-gray-600")} />
      </div>
    </div>
  )
}

export const Card = ({ width, userData, clubData, customURL = "", teacherData, isLoading }) => {
  useEffect(() => {
    if ((userData && userData.cardID) || customURL !== "") {
      const canvas = document.getElementById("qrCode")
      if (customURL !== "") {
        QRCode.toCanvas(canvas, customURL, {
          errorCorrectionLevel: "L",
          margin: 1.2,
        })
      } else {
        QRCode.toCanvas(canvas, `https://register.clubs.triamudom.ac.th/card/${userData.cardID}`, {
          errorCorrectionLevel: "L",
          margin: 1.2,
        })
      }
    }
  }, [userData])

  const teacher: UserData | null =
    Array.isArray(teacherData) && teacherData.length > 0
      ? teacherData[0]
      : (teacherData || null);

  return (
    <div
      style={{ ["--width" as string]: `${width}px` }}
      className={classnames(css.container, "relative flex flex-col items-center bg-white shadow-lg")}
    >
      <div
        className={classnames(
          "text-center text-TUCMC-gray-700"
          //  css.mt18
        )}
      >
        <h1 className={css.text14}>{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
        <h1 className={css.text12}>ห้อง {userData.room}</h1>
      </div>
      <div className="relative">
        <CardSplash className={css.vector} />
        <canvas id="qrCode" className={css.qrCode}></canvas>
      </div>
      <div className="flex w-full flex-col items-center bg-TUCMC-gray-100">
        <div
          className={classnames(css.text138, "text-TUCMC-700 w-full text-center tracking-tight", css.px17, css.mt18)}
        >
          <p className={classnames(css.textyear, "font-normal text-TUCMC-gray-600")}>
            ปีการศึกษา {new Date(schoolYear).getFullYear() + 543}
          </p>
          <h1>ชมรม{clubMap[userData.club]}</h1>
        </div>
        <span className={classnames(css.greenbutt, "rounded-full bg-TUCMC-green-400 tracking-tight text-white")}>
          ลงทะเบียนสำเร็จ
        </span>
      </div>
      <div className={classnames("flex w-full flex-col items-start", css.textContainer)}>
        <div className={classnames("flex items-start", css.subContainer)}>
          <LocationMarkerIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
          <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>
            สถานที่เรียนชมรม <span className="text-TUCMC-gray-500">{clubData.place}</span>
          </span>
        </div>
        <div className={classnames("flex items-start", css.subContainer)}>
          <SpeakerphoneIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
          <div className="flex flex-col">
            <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ข้อความจากชมรม</span>
            <p className={classnames(css.text1155, "text-TUCMC-gray-500", css.mt55)}>{clubData.message}</p>
          </div>
        </div>
        <div className={classnames("flex items-start", css.subContainer)}>
          <SpeakerphoneIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
          <div className="flex flex-col">
            <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ช่องทางการติดต่อชมรม</span>
            <p
              className={classnames(
                css.text1155,
                "text-TUCMC-gray-500",
                css.mt55,
                isEmpty(clubData.contact) && "hidden"
              )}
            >
              {clubData.contact?.type} : {clubData.contact?.context}
            </p>
            <p
              className={classnames(
                css.text1155,
                "text-TUCMC-gray-500",
                css.mt55,
                isEmpty(clubData.contact2) && "hidden"
              )}
            >
              {clubData.contact2?.type} : {clubData.contact2?.context}
            </p>
            <p
              className={classnames(
                css.text1155,
                "text-TUCMC-gray-500",
                css.mt55,
                isEmpty(clubData.contact3) && "hidden"
              )}
            >
              {clubData.contact3?.type} : {clubData.contact3?.context}
            </p>
          </div>
        </div>
        {teacher && (
          <div className={classnames("flex items-start", css.subContainer)}>
            <UserIcon className={classnames(css.icon, "flex-shrink-0 text-TUCMC-gray-700")} />
            <div className="flex flex-col">
              <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ครูที่ปรึกษาชมรม</span>
              <p className={classnames(css.text1155, "text-TUCMC-gray-500", css.mt55, isEmpty(teacher) && "hidden")}>
                {isLoading ? (
                  <div className="flex animate-pulse space-x-2">
                    <div className="h-2 w-2 rounded bg-gray-300" />
                    <div className="h-2 w-2 rounded bg-gray-300" />
                    <div className="h-2 w-2 rounded bg-gray-300" />
                  </div>
                ) : (
                  <p>
                    {teacher.title}
                    {teacher.firstname} {teacher.lastname}
                  </p>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={classnames("flex w-full justify-end", css.mt2)}>
        <LogoDarkIcon className={classnames(css.logo, "text-TUCMC-gray-600")} />
      </div>
    </div>
  )
}
