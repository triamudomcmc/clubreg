import initialisedDB from "@server/firebase-admin";
import {fetchSession} from "@server/fetchers/session";
import {ActionBlock} from "@lib/action/createAction";
import {toggleBetaContext} from "@handlers/init/account";

export const toggleBetaBlock = toggleBetaContext.helper.createAction(async (APIParams, parameters, paramsFromCondition) => {

  const {name} = parameters

  if (typeof name !== "string" || name === "")return {status: false, report: "dataError"}

  const ref = initialisedDB.collection("users").doc(paramsFromCondition.userID)

  await initialisedDB.runTransaction(async (transaction) => {
    const data = await transaction.get(ref)
    let field: string[] = data.get("beta") || []

    if (!field.includes(name) && name !== "") {
      field.push(name)
    }

    transaction.update(ref,"beta", field)
  })

  return {status: true, report: "success"}

})
