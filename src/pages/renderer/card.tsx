import { Card } from "@components/Card"
import { GetServerSideProps } from "next"
import initialisedDB from "@server/firebase-admin"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id.toString() || null
  let data = null

  if (id) {
    data = await initialisedDB.collection("cards").doc(id).get()
    const userSnapshot = (await initialisedDB.collection("data").where("club", "==", data.data().club).get())
    const teacher = userSnapshot.docs.find(doc => doc.data().level === "9" && doc.data().room === "111" && doc.data().title === "ครู")

    if (data.exists && teacher.exists) {
      return {
        props: {
          cardData: { ...data.data(), ...{ cardID: id } },
          teacherData: teacher.data()
        },
      }
    }
  }

  return {
    props: {
      cardData: null,
      teacherData: null,
    },
  }
}

const CardRender = ({ cardData, teacherData }) => {
  return (
    <div className="font-display">
      <Card width={990} userData={cardData} clubData={cardData} teacherData={teacherData} />
    </div>
  )
}

export default CardRender
