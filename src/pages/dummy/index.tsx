import { NextPage, NextPageContext, GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Page: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/dummy/auth")
  }, [])

  return <div></div>
}

export default Page
