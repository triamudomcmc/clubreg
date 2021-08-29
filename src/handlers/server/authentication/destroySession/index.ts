import {update} from "@server/tracker";
import Cookies from "cookies"
import {destroyClientSession} from "@server/authentication/destroySession/functions";

export const destroySession = async (req, res, cause = "") => {

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const sessionID = cookies.get("sessionID", {signed: true})

  if (!sessionID) return {status: false}

  const destroySessResult = await destroyClientSession(cookies, sessionID)
  if (!destroySessResult.status) return destroySessResult

  const {data} = destroySessResult

  //update Tracker
  update("system", cause !== "" ? "logout->" + cause : "logout", data.get("clientfp"), data.get("userID"))

  return {status: true}
}
