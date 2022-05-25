import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const TUCMCPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("https://clubs.triamudom.ac.th")
  }, [])

  return <></>
}

export default TUCMCPage
