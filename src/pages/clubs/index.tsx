import PageContainer from "@components/common/PageContainer";
import ClubSplash from "@vectors/decorations/ClubSplash";
import {FilterSearch} from "@components/common/Inputs/Search";
import {ClubCard} from "@components/clubs/ClubCard";
import {useState} from "react";

const Clubs = () => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")

  return (
    <PageContainer>
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
        <div className="flex flex-wrap w-full justify-center max-w-5xl mt-5 md:mt-14">
          <ClubCard audition={true}/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard audition={true}/>
          <ClubCard audition={true}/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard audition={true}/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard audition={true}/>
          <ClubCard audition={true}/>
          <ClubCard/>
          <ClubCard/>
          <ClubCard audition={true}/>
          <ClubCard/>
          <ClubCard/>
        </div>
      </div>
    </PageContainer>
  )
}

export default Clubs