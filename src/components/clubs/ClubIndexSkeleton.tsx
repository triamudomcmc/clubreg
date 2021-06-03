import ClubSplash from "@vectors/decorations/ClubSplash";
import {FilterSearch} from "@components/common/Inputs/Search";
import {useState} from "react";

const ClubIndexSkeleton = ({clubs, className}) => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")

  return (
    <div className={className}>
      <div className="flex flex-col items-center w-full py-12 md:py-20">
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold">ชมรม</h1>
          <div className="mt-8 md:mt-12 w-full px-14">
            <ClubSplash />
          </div>
        </div>
        <div className="mt-8 md:mt-12 pb-4 border-b mx-8 md:mx-0 md:border-none md:px-8 md:w-full max-w-xl">
          <FilterSearch setSearchContext={setSearchContext} setSortMode={setSortMode} sortMode={sortMode}/>
        </div>
        <div className="flex flex-wrap w-full justify-center max-w-5xl mt-5 px-0 marg:px-[0.35rem] md:mt-14">
          {clubs.map((item, index) => {
            if (index < 60) return <div key={`skel-${index}`} className="flex flex-col rounded-lg mx-1 marg:mx-[0.35rem] my-[0.35rem] mx-10 shadow-lg w-full max-w-[260px] minClubs2:w-175px minClubs:w-185px">
              <div className="bg-TUCMC-gray-300 rounded-t-lg w-[260px] h-[143px] minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
              <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                <div className="h-[40px]">
                  <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                  <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                </div>
                <div className="bg-white h-4 w-[50px]"> </div>
              </div>
            </div>
          })}
          <div  key={`skelWrapper-2`} className="flex flex-wrap justify-center">
            <div  key={`skel-60`} className="flex flex-col rounded-lg mx-1 marg:mx-[0.35rem] my-[0.35rem] mx-10 shadow-lg w-full max-w-[260px] minClubs2:w-175px minClubs:w-185px">
              <div className="bg-TUCMC-gray-300 rounded-t-lg w-[260px] h-[143px] minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
              <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                <div className="h-[40px]">
                  <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                  <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                </div>
                <div className="bg-white h-4 w-[50px]"> </div>
              </div>
            </div>
            <div  key={`skel-61`} className="flex flex-col rounded-lg mx-1 marg:mx-[0.35rem] my-[0.35rem] mx-10 shadow-lg w-full max-w-[260px] minClubs2:w-175px minClubs:w-185px">
              <div className="bg-TUCMC-gray-300 rounded-t-lg w-[260px] h-[143px] minClubs2:w-[175px] minClubs:w-[185px] minClubs2:h-[96px] minClubs:h-[102px] animate-pulse"></div>
              <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
                <div className="h-[40px]">
                  <div className="bg-TUCMC-gray-300 h-2.5 w-full animate-pulse"> </div>
                  <div className="bg-TUCMC-gray-300 h-2.5 w-10/12 animate-pulse mt-2"> </div>
                </div>
                <div className="bg-white h-4 w-[50px]"> </div>
              </div>
            </div>
            <div className="minClubs2:mx-1 my-1 mx-10 minClubs2:w-175px minClubs:w-185px h-1">
            </div>
            <div className="minClubs2:mx-1 my-1 mx-10 minClubs2:w-175px minClubs:w-185px h-1">
            </div>
            <div className="minClubs2:mx-1 my-1 mx-10 minClubs2:w-175px minClubs:w-185px h-1">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubIndexSkeleton