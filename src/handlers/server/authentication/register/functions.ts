import {
  compareDataPair,
  createDataPair,
  isValidEmail,
  isValidPassword,
} from "@server/authentication/register/dataChecking"
import { isNumeric } from "@utilities/texts"
import bcrypt from "bcryptjs"
import { openTime } from "@config/time"
import initialisedDB from "@server/firebase-admin"

export const checkCredentials = async (userColl, req, ref) => {
  // if (new Date().getTime() < openTime) return { status: false, report: "not_allowed" }

  const ousd = await userColl.where("stdID", "==", req.body.stdID).get()

  if (!ousd.empty) return { status: false, report: "user_exists" }

  const refDB = await ref.where("student_id", "==", req.body.stdID).get()

  if (refDB.empty) return { status: false, report: "invalid_stdID" }

  const dataPair = createDataPair(refDB.docs[0].data(), req.body)

  if (refDB.docs[0].get("firstname") === "any" || !compareDataPair(dataPair, "lastname"))
    return {
      status: false,
      report: "mismatch_data",
    }

  if (!isValidEmail(req.body.email) || !isNumeric(req.body.phone))
    return {
      status: false,
      report: "invalid_data",
    }

  if (!isValidPassword(req.body.password))
    return {
      status: false,
      report: "invalid_credentials",
    }

  if (req.body.password !== req.body.confirmPassword)
    return {
      status: false,
      report: "password_mismatch",
    }

  return { status: true, refDB }
}

export const appendData = async (dataColl, refDB, req) => {
  const ex = await initialisedDB.collection("data").where("student_id", "==", req.body.stdID).get()

  if (ex.empty) {
    return await dataColl.add({
      ...{
        club: "",
        audition: {},
      },
      ...refDB.docs[0].data(),
    })
  } else {
    return ex.docs[0]
  }
}

export const appendUser = async (userColl, req, refDB, dataDoc) => {
  return await userColl.add({
    stdID: refDB.docs[0].get("student_id"),
    email: req.body.email,
    phone: req.body.phone,
    dataRefID: dataDoc.id,
    password: await bcrypt.hash(req.body.password, 10),
    safeMode: false,
    authorised: {},
  })
}
