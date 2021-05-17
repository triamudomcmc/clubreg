import React, {useEffect} from "react";
import Error from "next/error";
import Router from "next/router";

const Index = () => {

  useEffect(() => {
    Router.push("/clubs")
  }, [])
  return (
    <Error statusCode={404}/>
  )
}

export default Index