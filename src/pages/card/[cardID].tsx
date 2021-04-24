import {GetServerSideProps} from "next";
import PageContainer from "@components/common/PageContainer";
import CardSplash from "@vectors/decorations/CardSplash";
import {Card} from "@components/Card";

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const cardID = params.cardID.toString()
  const cardData = {downloadable: true}
  return {
    props:{
      cardData: cardData
    }
  }
}

const Page = ({cardData}) => {
  return (
    <PageContainer>
      <div className="py-10 flex justify-center">
        <Card/>
      </div>
    </PageContainer>
  )
}

export default Page