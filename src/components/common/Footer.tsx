import {SocialFacebook, SocialInstagram} from "@vectors/icons/Socials";
import {WhiteLogo} from "@vectors/Logo";
import Link from "next/link"
import {Button} from "@components/common/Inputs/Button";
import {useTracker} from "@client/tracker/context";
import Router from "next/router";

const Footer = () => {
  const {tracker} = useTracker()

  const trackedRedirect = (href,mode) => {
    tracker.push("click", `Footer-${mode}->${href}`)
    Router.push(href)
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center space-y-24 select-none bg-TUCMC-gray-900 py-14 md:space-y-0 md:py-8">
        <div className="flex flex-col items-center space-y-4 text-xl text-white md:hidden">
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/", "mobile")
          }}>หน้าแรก</a>
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/clubs", "mobile")
          }}>ชมรม</a>
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/instruction", "mobile")
          }}>วิธีลงทะเบียน</a>
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/FAQ", "mobile")
          }}>คำถามที่พบบ่อย</a>
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/TUCMC", "mobile")
          }}>ทำความรู้จัก กช.</a>
        </div>
        <div className="md:flex md:justify-center md:w-full">
          <div
            className="flex flex-col items-center space-y-8 md:flex-row-reverse md:justify-between md:space-y-0 md:w-full md:max-w-6xl md:px-6">
            <div className="flex flex-row space-x-6 md:space-x-3">
              <a target="_blank" href="https://www.facebook.com/triamudomclubs">
                <SocialFacebook className="w-10 h-10 text-white md:w-6 md:h-6"/>
              </a>
              <a target="_blank" href="https://instagram.com/tucmc_official">
                <SocialInstagram className="w-10 h-10 text-white md:w-6 md:h-6"/>
              </a>
            </div>
            <div
              className="flex-row hidden space-x-10 font-medium text-white md:flex whitespace-nowrap">
              <a className="cursor-pointer" onClick={() => {
                trackedRedirect("/", "desktop")
              }}>หน้าแรก</a>
              <a className="cursor-pointer" onClick={() => {
                trackedRedirect("/clubs", "desktop")
              }}>ชมรม</a>
              <a className="cursor-pointer" onClick={() => {
                trackedRedirect("/instruction", "desktop")
              }}>วิธีลงทะเบียน</a>
              <a className="cursor-pointer" onClick={() => {
                trackedRedirect("/FAQ", "desktop")
              }}>คำถามที่พบบ่อย</a>
              <a className="cursor-pointer" onClick={() => {
                trackedRedirect("/TUCMC", "desktop")
              }}>ทำความรู้จัก กช.</a>
            </div>
            <WhiteLogo/>
          </div>
        </div>
      </div>
      <div
        className="flex-row justify-center hidden py-5 space-x-2 text-xs text-white bg-black md:flex">
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/terms-of-service", "null")
          }}>ข้อตกลงและเงื่อนไขการใช้งาน</a>
        <span>|</span>
          <a className="cursor-pointer" onClick={() => {
            trackedRedirect("/privacy-policy", "null")
          }}>นโยบายความปลอดภัย</a>
      </div>
    </>
  )
}

export default Footer