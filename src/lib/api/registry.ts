import {APIInitialiser} from "../action/createAction";
import {NextApiRequest, NextApiResponse} from "next";

type Initialisers = APIInitialiser | Array<APIInitialiser>
type APIContext = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export const establishAPIContext = (preferredMethod: "POST" | "GET", initialisers: Initialisers): APIContext => {

  const APIContext = async (req: NextApiRequest, res: NextApiResponse) => {

    // destructure request
    const {method} = req

    if (method !== preferredMethod) {
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }

    let data
    if (preferredMethod === "POST") {
      data = req.body
    }else{
      data = req.query
    }

    if (Array.isArray(initialisers)) {

      await initialisers.find(value => { if (value.namespace === data.action) return value }).contextAction(data, req, res)

    }else{

      initialisers.namespace === data.action && await initialisers.contextAction(data, req, res)

    }

  }

  return APIContext

}