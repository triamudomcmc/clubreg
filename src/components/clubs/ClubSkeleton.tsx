import { useWindowDimensions } from "@utilities/document"
import classnames from "classnames"

const ClubSkeleton = ({ ...restProps }) => {
  const { width } = useWindowDimensions()

  return (
    <div {...restProps}>
      <div className="mx-auto max-w-[1100px]">
        <div className="md:mx-6 md:mb-12 md:mt-20 md:flex md:space-x-8 md:rounded-2xl md:bg-white md:shadow-md">
          <div>
            <div className="h-[56vw] w-[100vw] animate-pulse bg-TUCMC-gray-300 md:h-[28vw] md:max-h-[288px] md:w-[50vw] md:max-w-[512px] md:rounded-l-2xl"></div>
          </div>
          <div className="pl-6 pr-14 pt-6 pb-10 md:pb-0">
            <div className="space-y-12 pt-6">
              <div>
                <div
                  className={classnames(
                    "h-5 w-[320px] flex-shrink animate-pulse bg-TUCMC-gray-300",
                    width < 902 && "md:w-[34vw]"
                  )}
                >
                  {" "}
                </div>
                <div className="mt-2 h-4 w-[200px] animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-b border-TUCMC-gray-300 md:hidden"></div>
        <div className="space-y-16 px-6 pb-24 pt-10 md:space-y-20 md:pt-6">
          <div className="space-y-10">
            <div className="space-y-3">
              <div className="pl-10">
                <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
              <div className="h-4 w-11/12 animate-pulse bg-TUCMC-gray-300"> </div>
            </div>
            <div className="space-y-3">
              <div className="pl-10">
                <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
            </div>
          </div>
          <div className="space-y-8 md:flex md:justify-center md:space-y-0 md:space-x-4">
            <div className="h-[60vw] w-full animate-pulse rounded-lg bg-TUCMC-gray-300 md:h-[20vw] md:max-h-[230px]"></div>
            <div className="h-[60vw] w-full animate-pulse rounded-lg bg-TUCMC-gray-300 md:h-[20vw] md:max-h-[230px]"></div>
            <div className="h-[60vw] w-full animate-pulse rounded-lg bg-TUCMC-gray-300 md:h-[20vw] md:max-h-[230px]"></div>
          </div>
          <div className="space-y-10 md:space-y-16">
            <div className="h-5 w-[150px] animate-pulse bg-TUCMC-gray-300"> </div>
            <div className="space-y-24">
              <div>
                <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap">
                  <div className="mt-6 ml-4 flex flex-row md:mt-0 md:flex-col">
                    <div className="h-20 w-20 md:h-24 md:w-24">
                      <div className="h-24 w-24 rounded-lg bg-TUCMC-gray-300"></div>
                    </div>
                    <div className="ml-4 mt-1 flex flex-col pl-2 text-gray-500 md:ml-0 md:mt-3 md:pl-0">
                      <div className="h-3 w-[80px] animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2 w-[90px] animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2 w-[56px] animate-pulse bg-TUCMC-gray-300"> </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col md:ml-8">
                    <div className="relative hidden md:block">
                      <span className="absolute left-10 top-6 text-7xl text-gray-300">“</span>
                    </div>
                    <div className="bg-whtie rounded-xl px-6 shadow-lg md:px-16 md:pt-12 md:pb-16">
                      <div className="h-12 pt-2 text-center text-6xl text-gray-300 md:hidden">
                        <span className="absolute">“</span>
                      </div>
                      <div className="space-y-3">
                        <div className="pl-10">
                          <div className="h-4 animate-pulse bg-TUCMC-gray-300"> </div>
                        </div>
                        <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                        <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                        <div className="h-4 w-11/12 animate-pulse bg-TUCMC-gray-300"> </div>
                      </div>
                      <h1 className="mt-4 h-14 w-full text-center text-6xl text-gray-300 md:hidden">”</h1>
                    </div>
                    <div className="relative hidden md:block">
                      <span className="absolute right-16 -top-16 text-7xl text-gray-300">”</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap">
                  <div className="mt-6 ml-4 flex flex-row md:mt-0 md:flex-col">
                    <div className="h-20 w-20 md:h-24 md:w-24">
                      <div className="h-24 w-24 rounded-lg bg-TUCMC-gray-300"></div>
                    </div>
                    <div className="ml-4 mt-1 flex flex-col pl-2 text-gray-500 md:ml-0 md:mt-3 md:pl-0">
                      <div className="h-3 w-[80px] animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2 w-[90px] animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2 w-[56px] animate-pulse bg-TUCMC-gray-300"> </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col md:ml-8">
                    <div className="relative hidden md:block">
                      <span className="absolute left-10 top-6 text-7xl text-gray-300">“</span>
                    </div>
                    <div className="bg-whtie rounded-xl px-6 shadow-lg md:px-16 md:pt-12 md:pb-16">
                      <div className="h-12 pt-2 text-center text-6xl text-gray-300 md:hidden">
                        <span className="absolute">“</span>
                      </div>
                      <div className="space-y-3">
                        <div className="pl-10">
                          <div className="h-4 animate-pulse bg-TUCMC-gray-300"> </div>
                        </div>
                        <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                        <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                        <div className="h-4 w-11/12 animate-pulse bg-TUCMC-gray-300"> </div>
                      </div>
                      <h1 className="mt-4 h-14 w-full text-center text-6xl text-gray-300 md:hidden">”</h1>
                    </div>
                    <div className="relative hidden md:block">
                      <span className="absolute right-16 -top-16 text-7xl text-gray-300">”</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap">
                  <div className="mt-6 ml-4 flex flex-row md:mt-0 md:flex-col">
                    <div className="h-20 w-20 md:h-24 md:w-24">
                      <div className="h-24 w-24 rounded-lg bg-TUCMC-gray-300"></div>
                    </div>
                    <div className="ml-4 mt-1 flex flex-col pl-2 text-gray-500 md:ml-0 md:mt-3 md:pl-0">
                      <div className="h-3 w-[80px] animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2 w-[90px] animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2 w-[56px] animate-pulse bg-TUCMC-gray-300"> </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col md:ml-8">
                    <div className="relative hidden md:block">
                      <span className="absolute left-10 top-6 text-7xl text-gray-300">“</span>
                    </div>
                    <div className="bg-whtie rounded-xl px-6 shadow-lg md:px-16 md:pt-12 md:pb-16">
                      <div className="h-12 pt-2 text-center text-6xl text-gray-300 md:hidden">
                        <span className="absolute">“</span>
                      </div>
                      <div className="space-y-3">
                        <div className="pl-10">
                          <div className="h-4 animate-pulse bg-TUCMC-gray-300"> </div>
                        </div>
                        <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                        <div className="h-4 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                        <div className="h-4 w-11/12 animate-pulse bg-TUCMC-gray-300"> </div>
                      </div>
                      <h1 className="mt-4 h-14 w-full text-center text-6xl text-gray-300 md:hidden">”</h1>
                    </div>
                    <div className="relative hidden md:block">
                      <span className="absolute right-16 -top-16 text-7xl text-gray-300">”</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-14 bg-TUCMC-gray-100 py-16">
        <div className="h-4 w-[120px] animate-pulse bg-TUCMC-gray-300"> </div>
        <div className="mx-auto mt-5 flex w-full max-w-[1100px] flex-wrap justify-center pb-20 md:mt-14">
          <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
            <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
            <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
              <div className="h-[40px]">
                <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-[50px] bg-white"> </div>
            </div>
          </div>
          <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
            <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
            <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
              <div className="h-[40px]">
                <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-[50px] bg-white"> </div>
            </div>
          </div>
          <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
            <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
            <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
              <div className="h-[40px]">
                <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-[50px] bg-white"> </div>
            </div>
          </div>
          <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
            <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
            <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
              <div className="h-[40px]">
                <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-[50px] bg-white"> </div>
            </div>
          </div>
          <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
            <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
            <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
              <div className="h-[40px]">
                <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-[50px] bg-white"> </div>
            </div>
          </div>
          <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
            <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
            <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
              <div className="h-[40px]">
                <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
              </div>
              <div className="h-4 w-[50px] bg-white"> </div>
            </div>
          </div>
          {width >= 770 && (
            <>
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
                <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
                <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                  <div className="h-[40px]">
                    <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                    <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                  </div>
                  <div className="h-4 w-[50px] bg-white"> </div>
                </div>
              </div>
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
                <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
                <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                  <div className="h-[40px]">
                    <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                    <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                  </div>
                  <div className="h-4 w-[50px] bg-white"> </div>
                </div>
              </div>
            </>
          )}
          {width >= 963 && (
            <>
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
                <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
                <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                  <div className="h-[40px]">
                    <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                    <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                  </div>
                  <div className="h-4 w-[50px] bg-white"> </div>
                </div>
              </div>
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 flex w-full flex-col rounded-lg shadow-md minClubs2:mx-1">
                <div className="animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
                <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                  <div className="h-[40px]">
                    <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                    <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                  </div>
                  <div className="h-4 w-[50px] bg-white"> </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClubSkeleton
