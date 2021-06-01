import IndexSplash from "@vectors/decorations/IndexSplash";
import React, {useEffect, useState} from "react";
import PageContainer from "@components/common/PageContainer";
import {
  InformationCircleIcon
} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import Timeline from "@components/index/Timeline";
import FAQ from "@components/index/FAQ";
import Clubs from "@components/index/Clubs";
import Footer from "@components/common/Footer";
import {AnimateSharedLayout, motion} from "framer-motion";
import Error from "next/error";

const addZero = (num) => {
  return ('0' + num).slice(-2)
}

const Index = () => {

  const countTo = 1623024000000
  const [time, setTime] = useState({day: "00", hour: "00", min: "00", sec: "00"})

  useEffect(() => {
    setInterval(() => {
      const ts = countTo - new Date().getTime()
      const t = new Date(ts)
      setTime({
        day: addZero(t.getDate()),
        hour: addZero(t.getHours()),
        min: addZero(t.getMinutes()),
        sec: addZero(t.getSeconds())
      })
    }, 1000)
  },[])

  return (
    <Error statusCode={404}/>
  )
}

export default Index