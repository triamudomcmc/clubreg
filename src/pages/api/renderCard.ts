import { NextApiRequest, NextApiResponse } from "next"
import screenshot from "@utilities/screenshot"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req

  // console.log(id)

  const file = await screenshot(`${getProtocol(req)}://${req.headers.host}/renderer/card?id=${id}`)

  res.setHeader("Content-Type", `image/png`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")
