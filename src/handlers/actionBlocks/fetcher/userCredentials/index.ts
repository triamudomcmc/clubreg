import {getUserCredentialsFromID} from "@actionBlocks/fetcher/userCredentials/functions";
import {fetchSession} from "@server/fetchers/session";
import {ActionBlock} from "@lib/action/createAction";
import {fetchUserCredentialContext} from "@handlers/init/account";

export const fetchUserCredentialBlock = fetchUserCredentialContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const { userCredentials } = await getUserCredentialsFromID(paramsFromCondition.userID, APIParams.fingerPrint)

  return {status: true, report: "success", data: userCredentials}
})
