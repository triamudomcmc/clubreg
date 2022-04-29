import PageContainer from "@components/common/PageContainer"
import ClubSplash from "@vectors/decorations/ClubSplash"
import { FilterSearch } from "@components/common/Inputs/Search"
import { ClubCard } from "@components/clubs/ClubCard"
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import * as fs from "fs"
import { objToArr, searchKeyword, sortAudition, sortThaiDictionary } from "@utilities/object"
import classnames from "classnames"
import ClubIndexSkeleton from "@components/clubs/ClubIndexSkeleton"

export const getStaticProps: GetStaticProps = async () => {
  const data = fs.readFileSync("./_map/clubs.json")
  const clubs = JSON.parse(data.toString())

  return {
    props: {
      clubs: clubs,
    },
  }
}

const Clubs = ({ clubs }) => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [query, setQuery] = useState(setTimeout(() => {}, 10))
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [loadingCount, setLoadingCount] = useState(1)

  const apply = () => {
    const dataArr = [...clubs]

    switch (sortMode) {
      case "ascending":
        {
          const sorted = sortThaiDictionary(dataArr, (obj) => obj.name)
          setRawSorted(sorted)
        }
        break
      case "descending":
        {
          const sorted = sortThaiDictionary(dataArr, (obj) => obj.name, true)
          setRawSorted(sorted)
        }
        break
      case "hasAudition":
        {
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
    setLoadingCount(20)
    setTimeout(() => {
      setLoadingCount(0)
    }, 10000)
  }, [])

  const loaded = () => {
    setLoadingCount((prevState) => prevState - 1)
  }

  useEffect(() => {
    clearTimeout(query)

    setQuery(
      setTimeout(() => {
        const escaped = searchContext.replace("ชมรม", "")
        if (escaped !== "") {
          const searchResult = searchKeyword(rawSorted, escaped, (obj) => obj.name)
          setSortedData(searchResult)
        } else {
          setSortedData(rawSorted)
        }
        // }, 900)
      }, 0)
    )
  }, [searchContext, rawSorted])

  return (
    <PageContainer>
      <div
        className={classnames(
          "flex w-full flex-col items-center py-12 md:py-20",
          loadingCount > 0 && "absolute opacity-0"
        )}
      >
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
          {sortedData.map((item, index) => {
            if (index < 60) return <ClubCard key={`club-${index}`} data={item} imageLoadAction={loaded} />
          })}
          {sortedData[60] && sortedData[61] && (
            <div key={`clubWrapper`} className="flex flex-wrap justify-center">
              <ClubCard key={`club-60`} data={sortedData[60]} imageLoadAction={loaded} />
              <ClubCard key={`club-61`} data={sortedData[61]} imageLoadAction={loaded} />
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 h-1 minClubs2:mx-1"></div>
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 h-1 minClubs2:mx-1"></div>
              <div className="minClubs2:w-175px minClubs:w-185px my-1 mx-10 h-1 minClubs2:mx-1"></div>
            </div>
          )}
        </div>
      </div>
      <ClubIndexSkeleton clubs={clubs} className={classnames(loadingCount <= 0 && "hidden")} />
    </PageContainer>
  )
}

export default Clubs
