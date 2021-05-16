import PageContainer from "@components/common/PageContainer";
import ClubSplash from "@vectors/decorations/ClubSplash";
import {FilterSearch} from "@components/common/Inputs/Search";
import {ClubCard} from "@components/clubs/ClubCard";
import {useEffect, useState} from "react";
import {GetStaticProps} from "next";
import * as fs from "fs";
import {objToArr, searchKeyword, sortAudition, sortThaiDictionary} from "@utilities/object";
import {sliceArr} from "@utilities/array";
import classnames from "classnames"
import ClubIndexSkeleton from "@components/clubs/ClubIndexSkeleton";

export const getStaticProps: GetStaticProps = async () => {
  const data = fs.readFileSync("./_map/clubs.json")
  const clubs = JSON.parse(data.toString())

  return {
    props: {
      clubs: clubs
    }
  }
}

const Clubs = ({ clubs }) => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [loadingCount, setLoadingCount] = useState(1)

  const apply = () => {
    const dataArr = [...clubs]

    switch (sortMode) {
      case "ascending": {
        const sorted = sortThaiDictionary(dataArr, obj => (obj.name))
        setRawSorted(sorted)
      }
        break
      case "descending": {
        const sorted = sortThaiDictionary(dataArr, obj => (obj.name), true)
        setRawSorted(sorted)
      }
        break
      case "hasAudition": {
        const sorted = sortAudition(dataArr)
        setRawSorted(sorted)
      }
        break
      case "notHasAudition": {
        const sorted = sortAudition(dataArr, true)
        setRawSorted(sorted)
      }
    }
  }

  useEffect(() => {
    apply()
  }, [sortMode, clubs])

  useEffect(() => {
    setLoadingCount(clubs.length - 1)
    setTimeout(() => {
      setLoadingCount(0)
    }, 10000)
  },[])

  const loaded = () => {
    setLoadingCount(prevState => (prevState - 1))
  }

  useEffect(() => {
    const escaped = searchContext.replace("ชมรม", "")
    if (escaped !== "") {
      const searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.name))
      setSortedData(searchResult)
    } else {
      setSortedData(rawSorted)
    }
  }, [searchContext, rawSorted])

  return (
    <PageContainer>
      <div className={classnames("flex flex-col items-center w-full py-12 md:py-20", loadingCount > 0 && "absolute opacity-0")}>
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
          {sortedData.map((item, index) => {
            return <ClubCard key={`club-${index}`} data={item} imageLoadAction={loaded}/>
          })}
        </div>
      </div>
      <ClubIndexSkeleton clubs={clubs} className={classnames(loadingCount <= 0 && "hidden")}/>
    </PageContainer>
  )
}

export default Clubs