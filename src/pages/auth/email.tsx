import { GetStaticProps } from "next"
import Router from "next/router"
import { useEffect } from "react"
import { Loader } from "@components/common/Loader"

const Email = () => {
  useEffect(() => {
    Router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  }, [])

  return <Loader display={true} />
}

export default Email
