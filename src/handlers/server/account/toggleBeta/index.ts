import initialisedDB from "@server/firebase-admin"
import { fetchSession } from "@server/fetchers/session"

export const toggleBeta = async (req, res) => {
  const { logged, ID } = await fetchSession(req, res)

  if (!logged) return { status: false, report: "sessionError" }
  if (typeof req.body.name !== "string" || req.body.name === "") return { status: false, report: "dataError" }

  const ref = initialisedDB.collection("users").doc(ID.userID)

  await initialisedDB.runTransaction(async (transaction) => {
    const data = await transaction.get(ref)
    let field: string[] = data.get("beta") || []

    if (!field.includes(req.body.name) && req.body.name !== "") {
      field.push(req.body.name)
    }

    transaction.update(ref, "beta", field)
  })

  return { status: true, report: "success" }
}
