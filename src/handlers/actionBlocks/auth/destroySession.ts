import {ActionBlock} from "@lib/action/createAction";
import {destroySession} from "../../utilities/destroySession";
import {logoutContext} from "@handlers/init/auth";

export const destroySessionBlock = logoutContext.helper.createAction(async (APIParams, parameters) => {
  return destroySession(APIParams.req, APIParams.res, parameters.cause)
})
