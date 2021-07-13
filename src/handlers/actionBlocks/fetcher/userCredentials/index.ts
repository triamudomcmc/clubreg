import {getUserCredentialsFromID} from "@actionBlocks/fetcher/userCredentials/functions";
import {fetchSession} from "@server/fetchers/session";
import {ActionBlock} from "@lib/action/createAction";

export const fetchUserCredentialBlock: ActionBlock<{}>  = async (APIParams, parameters, paramsFromCondition) => {

  const { userCredentials } = await getUserCredentialsFromID(paramsFromCondition.userID, APIParams.fingerPrint)

  return {status: true, report: "success", data: userCredentials}
}