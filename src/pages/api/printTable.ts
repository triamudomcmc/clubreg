import { NextApiRequest, NextApiResponse } from "next"
import { savePDF } from "@utilities/savePDF"

export const maxDuration = 15
export const dynamic = "force-dynamic"

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', false)
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { path },
  } = req


  const file = await savePDF(`${getProtocol(req)}://${req.headers.host}/panel/print/renderer?path=${path}`)

  res.setHeader("Content-Type", `application/pdf`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}


export default allowCors(handler)

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")
