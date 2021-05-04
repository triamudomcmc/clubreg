import {Card} from "@components/Card";
import {useAuth} from "@client/auth";
import {useRouter} from "next/router";
import Auth from "../auth";


const CardRender = ({query}) => {

  const userData = JSON.parse(unescape(query.userData))

  return(
    <div className="font-display">
      <Card width={990} userData={userData}/>
    </div>
  )
}
CardRender.getInitialProps = ({query}) => {
  return {query}
}


export default CardRender