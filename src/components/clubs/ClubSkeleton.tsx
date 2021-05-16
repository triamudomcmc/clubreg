import Image from "next/image";
import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import {GlobeAltIcon, UserIcon} from "@heroicons/react/outline";
import {isEmpty} from "@utilities/object";
import {ClubCard} from "@components/clubs/ClubCard";
import {useWindowDimensions} from "@utilities/document";
import classnames from "classnames"
import {motion} from "framer-motion";

const ClubSkeleton = ({...restProps}) => {

  const { width } = useWindowDimensions()

  return (
    <div {...restProps}>
      <div className="max-w-[1100px] mx-auto">
        <div className="md:flex md:mb-12 md:mt-20 md:bg-white md:shadow-md md:rounded-2xl md:space-x-8 md:mx-6">
          <div>
            <div className="w-[100vw] h-[56vw] md:w-[50vw] md:h-[28vw] md:max-w-[512px] md:max-h-[288px] md:rounded-l-2xl bg-TUCMC-gray-300 animate-pulse">
            </div>
          </div>
          <div className="pl-6 pr-14 pt-6 pb-10 md:pb-0">
            <div className="space-y-12 pt-6">
              <div>
                <div className={classnames("bg-TUCMC-gray-300 h-5 w-[320px] flex-shrink animate-pulse", width < 902 && "md:w-[34vw]")}> </div>
                <div className="bg-TUCMC-gray-300 h-4 w-[200px] mt-2 animate-pulse"> </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden w-full border-b border-TUCMC-gray-300"></div>
        <div className="px-6 space-y-16 md:space-y-20 pb-24 pt-10 md:pt-6">
          <div className="space-y-10">
            <div className="space-y-3">
              <div className="pl-10">
                <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
              </div>
              <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
              <div className="bg-TUCMC-gray-300 h-4 w-11/12 animate-pulse"> </div>
            </div>
            <div className="space-y-3">
              <div className="pl-10">
                <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
              </div>
              <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
            </div>
          </div>
          <div className="space-y-8 md:space-y-0 md:flex md:space-x-4 md:justify-center">
            <div className="bg-TUCMC-gray-300 rounded-lg w-full h-[60vw] md:h-[20vw] md:max-h-[230px] animate-pulse"></div>
            <div className="bg-TUCMC-gray-300 rounded-lg w-full h-[60vw] md:h-[20vw] md:max-h-[230px] animate-pulse"></div>
            <div className="bg-TUCMC-gray-300 rounded-lg w-full h-[60vw] md:h-[20vw] md:max-h-[230px] animate-pulse"></div>
          </div>
          <div className="space-y-10 md:space-y-16">
            <div className="bg-TUCMC-gray-300 h-5 w-[150px] animate-pulse"> </div>
            <div className="space-y-24">
              <div>
                <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row">
                  <div className="flex flex-row mt-6 md:flex-col md:mt-0 ml-4">
                    <div className="w-20 h-20 md:w-24 md:h-24">
                      <div className="bg-TUCMC-gray-300 w-24 h-24 rounded-lg"></div>
                    </div>
                    <div className="flex flex-col pl-2 ml-4 mt-1 md:ml-0 text-gray-500 md:pl-0 md:mt-3">
                      <div className="bg-TUCMC-gray-300 h-3 w-[80px] animate-pulse"> </div>
                      <div className="bg-TUCMC-gray-300 h-2 w-[90px] mt-2 animate-pulse"> </div>
                      <div className="bg-TUCMC-gray-300 h-2 w-[56px] mt-2 animate-pulse"> </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:ml-8 w-full">
                    <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-7xl left-10 top-6">
                  “
                </span>
                    </div>
                    <div className="px-6 shadow-lg bg-whtie rounded-xl md:pt-12 md:pb-16 md:px-16">
                      <div className="h-12 pt-2 text-6xl text-center text-gray-300 md:hidden">
                        <span className="absolute">“</span>
                      </div>
                      <div className="space-y-3">
                        <div className="pl-10">
                          <div className="bg-TUCMC-gray-300 h-4 animate-pulse"> </div>
                        </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-11/12 animate-pulse"> </div>
                      </div>
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
              <div>
                <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row">
                  <div className="flex flex-row mt-6 md:flex-col md:mt-0 ml-4">
                    <div className="w-20 h-20 md:w-24 md:h-24">
                      <div className="bg-TUCMC-gray-300 w-24 h-24 rounded-lg"></div>
                    </div>
                    <div className="flex flex-col pl-2 ml-4 mt-1 md:ml-0 text-gray-500 md:pl-0 md:mt-3">
                      <div className="bg-TUCMC-gray-300 h-3 w-[80px] animate-pulse"> </div>
                      <div className="bg-TUCMC-gray-300 h-2 w-[90px] mt-2 animate-pulse"> </div>
                      <div className="bg-TUCMC-gray-300 h-2 w-[56px] mt-2 animate-pulse"> </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:ml-8 w-full">
                    <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-7xl left-10 top-6">
                  “
                </span>
                    </div>
                    <div className="px-6 shadow-lg bg-whtie rounded-xl md:pt-12 md:pb-16 md:px-16">
                      <div className="h-12 pt-2 text-6xl text-center text-gray-300 md:hidden">
                        <span className="absolute">“</span>
                      </div>
                      <div className="space-y-3">
                        <div className="pl-10">
                          <div className="bg-TUCMC-gray-300 h-4 animate-pulse"> </div>
                        </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-11/12 animate-pulse"> </div>
                      </div>
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
              <div>
                <div className="flex flex-wrap-reverse md:flex-nowrap md:flex-row">
                  <div className="flex flex-row mt-6 md:flex-col md:mt-0 ml-4">
                    <div className="w-20 h-20 md:w-24 md:h-24">
                      <div className="bg-TUCMC-gray-300 w-24 h-24 rounded-lg"></div>
                    </div>
                    <div className="flex flex-col pl-2 ml-4 mt-1 md:ml-0 text-gray-500 md:pl-0 md:mt-3">
                      <div className="bg-TUCMC-gray-300 h-3 w-[80px] animate-pulse"> </div>
                      <div className="bg-TUCMC-gray-300 h-2 w-[90px] mt-2 animate-pulse"> </div>
                      <div className="bg-TUCMC-gray-300 h-2 w-[56px] mt-2 animate-pulse"> </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:ml-8 w-full">
                    <div className="relative hidden md:block">
                <span className="absolute text-gray-300 text-7xl left-10 top-6">
                  “
                </span>
                    </div>
                    <div className="px-6 shadow-lg bg-whtie rounded-xl md:pt-12 md:pb-16 md:px-16">
                      <div className="h-12 pt-2 text-6xl text-center text-gray-300 md:hidden">
                        <span className="absolute">“</span>
                      </div>
                      <div className="space-y-3">
                        <div className="pl-10">
                          <div className="bg-TUCMC-gray-300 h-4 animate-pulse"> </div>
                        </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-4 w-11/12 animate-pulse"> </div>
                      </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-TUCMC-gray-100 py-16 space-y-14">
        <div className="bg-TUCMC-gray-300 h-4 w-[120px] animate-pulse"> </div>
        <div className="flex flex-wrap w-full justify-center max-w-5xl mt-5 md:mt-14 pb-20 max-w-[1100px] mx-auto">
          <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
            <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
            <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
              <div className="h-[40px]">
                <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
              </div>
              <div className="bg-white h-4 w-[50px]"> </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
            <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
            <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
              <div className="h-[40px]">
                <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
              </div>
              <div className="bg-white h-4 w-[50px]"> </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
            <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
            <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
              <div className="h-[40px]">
                <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
              </div>
              <div className="bg-white h-4 w-[50px]"> </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
            <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
            <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
              <div className="h-[40px]">
                <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
              </div>
              <div className="bg-white h-4 w-[50px]"> </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
            <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
            <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
              <div className="h-[40px]">
                <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
              </div>
              <div className="bg-white h-4 w-[50px]"> </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
            <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
            <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
              <div className="h-[40px]">
                <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
              </div>
              <div className="bg-white h-4 w-[50px]"> </div>
            </div>
          </div>
          {
            width >= 770 && <><div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
                <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
                <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                    <div className="h-[40px]">
                        <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                    </div>
                    <div className="bg-white h-4 w-[50px]"> </div>
                </div>
            </div>
                <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
                    <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
                    <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                        <div className="h-[40px]">
                            <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                            <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                        </div>
                        <div className="bg-white h-4 w-[50px]"> </div>
                    </div>
                </div></>
          }
          {
            width >= 963 && <><div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
                <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
                <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                    <div className="h-[40px]">
                        <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                        <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                    </div>
                    <div className="bg-white h-4 w-[50px]"> </div>
                </div>
            </div>
                <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
                    <div className="bg-TUCMC-gray-300 rounded-t-lg minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
                    <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                        <div className="h-[40px]">
                            <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                            <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                        </div>
                        <div className="bg-white h-4 w-[50px]"> </div>
                    </div>
                </div></>
          }
        </div>
      </div>
    </div>
  )
}

export default ClubSkeleton