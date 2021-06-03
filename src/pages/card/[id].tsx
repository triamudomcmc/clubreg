import {GetServerSideProps} from "next";
import initialisedDB from "@server/firebase-admin";
import {Card} from "@components/Card";
import React, {useState} from "react";
import {useWindowDimensions} from "@utilities/document";
import Error from "next/error";

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const id = params?.id?.toString() || null
  let data = null

  if (id) {
    data = await initialisedDB.collection("cards").doc(id).get()
    if (data.exists) {
      return {
        props: {
          cardData: {...data.data(), ...{cardID: id}}
        }
      }
    }
  }

  return {
    props: {
      cardData: null
    }
  }

}

const Page = ({ cardData }) => {

  const { width } = useWindowDimensions()

  let cardWidth, padding = 18, maxWidth = 480;

  if(width < maxWidth){
    cardWidth = width - (2 * padding)
  }else{
    cardWidth = maxWidth - (2 * padding)
  }

  if (cardData == null) {
    return (
      <Error statusCode={404}/>
    )
  }
  return (
    <div className="font-display">
      <div className="py-10 flex justify-center">
        <Card width={cardWidth} userData={cardData} clubData={cardData}/>
      </div>
    </div>
  )
}

export default Page