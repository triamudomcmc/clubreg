import { Card } from "@components/Card"
import { GetServerSideProps } from "next"
import initialisedDB from "@server/firebase-admin"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id.toString() || null

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

const CardRender = ({ cardData, teacherData, isLoading }) => {
  return (
    <div className="font-display">
      <Card width={990} userData={cardData} clubData={cardData} teacherData={teacherData} isLoading={isLoading} />
    </div>
  )
}

export default CardRender
