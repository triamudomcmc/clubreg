import {update} from "@server/tracker";
import {NextApiRequest, NextApiResponse} from "next";
import initialisedDB from "@server/firebase-admin";
import Cookies from "cookies"

const destroyClientSession = async (cookies, sessionID) => {

  try {

    //destroy cookie and remove session from db
    cookies.set("sessionID")
    const doc = initialisedDB.collection("sessions").doc(sessionID)
    const data = await doc.get()
    await doc.delete()

    return {status: true, report: "success", data}

  } catch (e) {

    return {status: false, report: e}

  }

}

export const destroySession = async (req: NextApiRequest, res: NextApiResponse, cause: string = "") => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  //console.log(cause)

  if (!sessionID) return {status: false, report: "invalid_sessionID"}

  const destroySessResult = await destroyClientSession(cookies, sessionID)
  if (!destroySessResult.status) return destroySessResult

  const {data} = destroySessResult

  //update Tracker
  update("system", cause ? "logout->" + cause : "logout", data.get("clientfp"), data.get("userID"))

  return {status: true, report: "success"}
}
