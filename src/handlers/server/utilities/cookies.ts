import Cookies from "cookies"

export const getSessionID = (req, res) => {
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] })
  const sessionID = cookies.get("sessionID", { signed: true })

  return { sessionID, cookies }
}
