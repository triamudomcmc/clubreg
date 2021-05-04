import CardSplash from "@vectors/decorations/CardSplash";
import css from './card.module.css'
import classnames from "classnames"
import {CalendarIcon, LocationMarkerIcon, SpeakerphoneIcon} from "@heroicons/react/solid";
import {LogoDarkIcon} from "@vectors/Logo";
import {clubMap} from "../../config/clubMap";
import {useEffect} from "react";
import QRCode from 'qrcode'

export const Card = ({ width, userData }) => {

  useEffect(() => {
    if (userData && userData.dataRefID) {
      const canvas = document.getElementById('qrCode')
      QRCode.toCanvas(canvas, userData.dataRefID, { errorCorrectionLevel: 'L', margin: 1.2 })
    }
  }, [userData])

  return (
    <div style={{ ['--width' as string]: `${width}px` }} className={css.container}>
      <div className={classnames("text-TUCMC-gray-700 text-center", css.mt18)}>
        <h1 className={css.text14}>{`${userData.title}${userData.firstname} ${userData.lastname}`}</h1>
        <h1 className={css.text12}>ห้อง {userData.room}</h1>
      </div>
      <div className="relative">
        <CardSplash className={css.vector}/>
        <canvas id="qrCode" className={css.qrCode}></canvas>
      </div>
      <div className="flex flex-col items-center bg-TUCMC-gray-100 w-full">
        <h1 className={classnames(css.text138,"text-TUCMC-700 tracking-tight", css.px17, css.mt18)}>ชมรม{clubMap[userData.club]}</h1>
        <span className={classnames(css.greenbutt)}>ลงทะเบียนสำเร็จ</span>
      </div>
      <div className={classnames("flex flex-col items-start w-full", css.textContainer)}>
        <div className={classnames("flex items-start", css.subContainer)}>
          <CalendarIcon className={css.icon}/>
          <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>เริ่มเรียนชมรมคาบแรกวันจันทร์ที่ 31 พ.ค. 64</span>
        </div>
        <div className={classnames("flex items-start", css.subContainer)}>
          <LocationMarkerIcon className={css.icon}/>
          <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>สถานที่เรียนชมรม</span>
        </div>
        <div className={classnames("flex items-start", css.subContainer)}>
          <SpeakerphoneIcon className={css.icon}/>
          <div className="flex flex-col">
            <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ข้อความจากชมรม</span>
            <p className={classnames(css.text1155, "text-TUCMC-gray-500", css.mt55)}>“ยินดีต้อนรับเข้าสู่ชมรม...งับ เก่งมาก ๆ เลย เรียนชมรมวันแรกมาเจอกันที่ห้อง 112 นะ แล้วเจอกัน</p>
          </div>
        </div>
        <div className={classnames("flex items-start", css.subContainer)}>
          <SpeakerphoneIcon className={css.icon}/>
          <div className="flex flex-col">
            <span className={classnames(css.text1155, "text-TUCMC-gray-700")}>ช่องทางการติดต่อชมรม</span>
            <p className={classnames(css.text1155, "text-TUCMC-gray-500", css.mt55)}>Facebook.............................</p>
            <p className={classnames(css.text1155, "text-TUCMC-gray-500", css.mt55)}>Instagram..................</p>
          </div>
        </div>
        <div className={classnames("flex justify-end w-full",css.mt2)}>
          <LogoDarkIcon className={css.logo}/>
        </div>
      </div>
    </div>
  )
}