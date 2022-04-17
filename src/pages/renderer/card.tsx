import { Card } from "@components/Card"
import { GetServerSideProps } from "next"
import initialisedDB from "@server/firebase-admin"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id.toString() || null
  let data = null

  if (id) {
    data = await initialisedDB.collection("cards").doc(id).get()
    if (data.exists) {
      return {
        props: {
          cardData: { ...data.data(), ...{ cardID: id } },
        },
      }
    }
  }

  return {
    props: {
      cardData: null,
    },
  }
}

const CardRender = ({ cardData }) => {
  return (
    <div className="font-display">
      <Card width={990} userData={cardData} clubData={cardData} />
    </div>
  )
}

export default CardRender
