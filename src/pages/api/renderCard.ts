import { NextApiRequest, NextApiResponse } from "next"
import screenshot from "@utilities/screenshot"

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
    query: { id },
  } = req

  const file = await screenshot(
    `${getProtocol(req)}://${req.headers.host}/renderer/card?id=${id}`,
    990,
    1800
  )

  res.setHeader("Content-Type", `image/png`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}

export default allowCors(handler)

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")
