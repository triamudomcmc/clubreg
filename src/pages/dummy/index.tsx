import Router from "next/router"
import { useEffect } from "react"

const Index = () => {
  useEffect(() => {
    Router.push("/dummy/select")
  }, [])
  return <div></div>
}
export default Index
