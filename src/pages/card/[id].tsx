import { GetServerSideProps } from "next"
import initialisedDB from "@server/firebase-admin"
import { Card } from "@components/Card"
import { useWindowDimensions } from "@utilities/document"
import Error from "next/error"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id?.toString() || null

  if (id) {
    try {
      const cardDoc = await initialisedDB.collection("cards").doc(id).get()

      if (!cardDoc.exists) {
        return {
          props: {
            cardData: null,
            teacherData: null,
            isLoading: false,
          }
        }
      }

      const cardData = cardDoc.data()
      const userSnapshot = await initialisedDB.collection("data").where("club", "==", cardData.club).get()

      const teacher = userSnapshot.docs.find(doc => {
        const userData = doc.data()
        return userData.level === "9" && userData.room === "111" && userData.title === "ครู"
      })

      if (teacher) {
        return {
          props: {
            cardData: { ...cardData, cardID: id },
            teacherData: teacher.data(),
            isLoading: false,
          },
        }
      }
    } catch (error) {
      console.error("Error fetching card data:", error)
      return {
        props: {
          cardData: null,
          teacherData: null,
          isLoading: false,
          error: "Failed to fetch data"
        },
      }
    }
  }

  return {
    props: {
      cardData: null,
      teacherData: null,
      isLoading: false,
    },
  }
}

const Page = ({ cardData, teacherData, isLoading }) => {
  const { width } = useWindowDimensions()

  let cardWidth,
    padding = 18,
    maxWidth = 480

  if (width < maxWidth) {
    cardWidth = width - 2 * padding
  } else {
    cardWidth = maxWidth - 2 * padding
  }

  if (cardData == null) {
    return <Error statusCode={404} />
  }

  return (
    <div className="font-display">
      <div className="flex justify-center py-10">
        <Card
          width={cardWidth}
          userData={cardData}
          clubData={cardData}
          teacherData={teacherData}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Page
