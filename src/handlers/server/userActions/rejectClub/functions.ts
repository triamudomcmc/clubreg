import bcrypt from "bcryptjs"

export const checkInputs = async (dataDoc, userData, req) => {
  if (!(req.body.clubID in dataDoc.get("audition")) || dataDoc.get("club") !== "")
    return { status: false, report: "not_audition" }
  if (dataDoc.get("audition")[req.body.clubID] !== "passed") return { status: false, report: "not_pass" }
  if (!(await bcrypt.compare(req.body.password, userData.get("password"))))
    return {
      status: false,
      report: "invalid_password",
    }

  return { status: true }
}
