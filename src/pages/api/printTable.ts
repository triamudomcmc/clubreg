import { NextApiRequest, NextApiResponse } from "next"
import { savePDF } from "@utilities/savePDF"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { path },
  } = req


  const file = await savePDF(`${getProtocol(req)}://${req.headers.host}/panel/print/renderer?path=${path}`)

  res.setHeader("Content-Type", `application/pdf`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")
