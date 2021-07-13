import {ActionBlock} from "@lib/action/createAction";
import {destroySession} from "../../utilities/destroySession";

export const destroySessionBlock: ActionBlock<{cause?: string}> = async (APIParams, parameters) => {
  return destroySession(APIParams.req, APIParams.res, parameters.cause)
}