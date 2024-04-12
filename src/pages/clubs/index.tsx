import PageContainer from "@components/common/PageContainer"
import ClubSplash from "@vectors/decorations/ClubSplash"
import { FilterSearch } from "@components/common/Inputs/Search"
import { ClubCard } from "@components/clubs/ClubCard"
import {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from "react"
import { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from "next"
import * as fs from "fs"
import {objToArr, searchKeyword, searchKeywordOtimised, sortAudition, sortThaiDictionary} from "@utilities/object"
import classnames from "classnames"
import ClubIndexSkeleton from "@components/clubs/ClubIndexSkeleton"
import initialisedDB from "@server/firebase-admin"
import { ClubDisplay } from "@interfaces/clubDisplay"
import { DescribeRoute } from "@components/common/Meta/OpenGraph"
import {AnimateSharedLayout, motion} from "framer-motion"
import {convertToStaticFileUri} from "@utilities/files";

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<{ clubs: { name: string; audition: boolean; clubID: string; imageURL: string }[] }>
> => {
  // const data = fs.readFileSync("./_map/clubs.json")
  // const clubs = JSON.parse(data.toString())

  // name
  // audition
  // clubID

  // const clubDisplayDocs = await initialisedDB.collection("clubDisplayPending").get()
  const clubDisplayDocs = await initialisedDB.collection("clubDisplay").get()
  const clubs = clubDisplayDocs.docs.map((club) => {
    const data = club.data() as ClubDisplay


    return {
      name: data.nameTH,
      audition: data.audition,
      clubID: club.id,
      imageURL: convertToStaticFileUri(data?.images?.mainImage || `/assets/thumbnails/${club.id}.jpg`),
    }
  })

  return {
    props: {
      clubs: clubs,
    },
  }
}

const Clubs: FC = ({ clubs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")
  const [query, setQuery] = useState(setTimeout(() => {}, 10))
  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [loadingCount, setLoadingCount] = useState(0)

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


  const loaded = () => {
    setLoadingCount((prevState) => prevState - 1)
  }

  useEffect(() => {
    clearTimeout(query)

    setQuery(
      setTimeout(() => {
        const escaped = searchContext.replace("ชมรม", "")
        if (escaped !== "") {
          const searchResult = searchKeywordOtimised(rawSorted, escaped, (obj) => obj.name)
          if(Math.abs(searchResult.length - sortedData.length) > 40) {
            setSortedData([])
          }
          setSortedData(searchResult)
        } else {
          setSortedData([])
          setSortedData(rawSorted.map(d => (d.clubID)))
        }
        // }, 900)
      }, 200)
    )
  }, [searchContext, rawSorted])

  return (
    <DescribeRoute
      title="ชมรม"
      description="รายชื่อชมรมโรงเรียนเตรียมอุดมศึกษา ประจำปีการศึกษา 2567"
      imgURL="/assets/meta/index.jpg"
    >
      <PageContainer>
        <div
          className={classnames(
            "flex w-full flex-col items-center py-12 md:py-20",
            loadingCount > 0 && "absolute opacity-0"
          )}
        >
          <div className="flex w-full max-w-md flex-col items-center">
            <h1 className="text-2xl font-bold">ชมรม</h1>
          </div>
          <div className="mx-8 mt-8 max-w-xl border-b pb-4 md:mx-0 md:mt-12 md:w-full md:border-none md:px-8">
            <FilterSearch setSearchContext={setSearchContext} setSortMode={setSortMode} sortMode={sortMode} />
          </div>

          <AnimateSharedLayout>
          <div className="mt-5 flex w-full max-w-5xl flex-wrap justify-center px-0 marg:px-[0.35rem]">
            {sortedData.length > 0 && rawSorted.map((item, index) => {
              return <motion.div key={`club-${index}`} layout={"position"} animate={false} style={{display: sortedData.includes(item.clubID) ? "block" : "none"}}><ClubCard data={item} /></motion.div>
            })}
          </div>
          </AnimateSharedLayout>
        </div>
        <ClubIndexSkeleton clubs={clubs} className={classnames(loadingCount <= 0 && "hidden")} />
      </PageContainer>
    </DescribeRoute>
  )
}

export default Clubs
