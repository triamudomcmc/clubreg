import ClubSplash from "@vectors/decorations/ClubSplash"
import { FilterSearch } from "@components/common/Inputs/Search"
import { useState } from "react"

const ClubIndexSkeleton = ({ clubs, className }) => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")

  return (
    <div className={className}>
      <div className="flex w-full flex-col items-center py-12 md:py-20">
        <div className="flex w-full max-w-md flex-col items-center">
          <h1 className="text-2xl font-bold">ชมรม</h1>
          {/* <div className="mt-8 w-full px-14 md:mt-12">
            <ClubSplash />
          </div> */}
        </div>
        <div className="mx-8 mt-8 max-w-xl border-b pb-4 md:mx-0 md:mt-12 md:w-full md:border-none md:px-8">
          <FilterSearch setSearchContext={setSearchContext} setSortMode={setSortMode} sortMode={sortMode} />
        </div>
        <div className="mt-5 flex w-full max-w-5xl flex-wrap justify-center px-0 marg:px-[0.35rem]">
          {clubs.map((item, index) => {
            if (index < 60)
              return (
                <div
                  key={`skel-${index}`}
                  className="minClubs2:w-175px minClubs:w-185px mx-1 my-[0.35rem] mx-10 flex w-full max-w-[260px] flex-col rounded-lg shadow-lg marg:mx-[0.35rem]"
                >
                  <div className="h-[143px] w-[260px] animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
                  <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                    <div className="h-[40px]">
                      <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                      <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                    </div>
                    <div className="h-4 w-[50px] bg-white"> </div>
                  </div>
                </div>
              )
          })}
          <div key={`skelWrapper-2`} className="flex flex-wrap justify-center">
            <div
              key={`skel-60`}
              className="minClubs2:w-175px minClubs:w-185px mx-1 my-[0.35rem] mx-10 flex w-full max-w-[260px] flex-col rounded-lg shadow-lg marg:mx-[0.35rem]"
            >
              <div className="h-[143px] w-[260px] animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
              <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                <div className="h-[40px]">
                  <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                  <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                </div>
                <div className="h-4 w-[50px] bg-white"> </div>
              </div>
            </div>
            <div
              key={`skel-61`}
              className="minClubs2:w-175px minClubs:w-185px mx-1 my-[0.35rem] mx-10 flex w-full max-w-[260px] flex-col rounded-lg shadow-lg marg:mx-[0.35rem]"
            >
              <div className="h-[143px] w-[260px] animate-pulse rounded-t-lg bg-TUCMC-gray-300 minClubs2:h-[96px] minClubs2:w-[175px] minClubs:h-[102px] minClubs:w-[185px]"></div>
              <div className="space-y-2.5 rounded-b-lg bg-white px-2 py-2">
                <div className="h-[40px]">
                  <div className="h-2.5 w-full animate-pulse bg-TUCMC-gray-300"> </div>
                  <div className="mt-2 h-2.5 w-10/12 animate-pulse bg-TUCMC-gray-300"> </div>
                </div>
                <div className="h-4 w-[50px] bg-white"> </div>
              </div>
            </div>
            <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 h-1 minClubs2:mx-1"></div>
            <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 h-1 minClubs2:mx-1"></div>
            <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 h-1 minClubs2:mx-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubIndexSkeleton
