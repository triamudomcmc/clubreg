import {isNumeric} from "@utilities/texts";
import bcrypt from "bcryptjs"
import {openTime} from "@config/time";
import initialisedDB from "@server/firebase-admin";
import {RegisterParamsType} from "../../../init/auth";
import LooseTypeObject from "@interfaces/LooseTypeObject";
import {compareDataPair, createDataPair, isValidEmail, isValidPassword} from "./dataChecking";

export const checkCredentials = async (userColl, parameters: RegisterParamsType, ref) => {

  if (new Date().getTime() < openTime) return {status: false, report: "not_allowed"}

  const ousd = await userColl.where("stdID", "==", parameters.stdID).get()

  if (!ousd.empty) return {status: false, report: "user_exists"}

  const refDB = await ref.where("student_id", "==", parameters.stdID).get()

  if (refDB.empty) return {status: false, report: "invalid_stdID"}

  const dataPair = createDataPair(refDB.docs[0].data(), parameters as unknown as LooseTypeObject<string>)

  if (refDB.docs[0].get("firstname") === "any" || (!compareDataPair(dataPair, "lastname"))) return {
    status: false, report: "mismatch_data"
  }

  if (!isValidEmail(parameters.email) || !isNumeric(parameters.phone)) return {
    status: false, report: "invalid_data"
  }

  if (!isValidPassword(parameters.password)) return {
    status: false, report: "invalid_credentials"
  }

  if(parameters.password !== parameters.confirmPassword) return {
    status: false, report: "password_mismatch"
  }

  return {status: true, report: "success", data: {refDB}}
}

export const appendData = async (dataColl, refDB, stdID) => {

  const ex = await initialisedDB.collection("data").where("student_id", "==", stdID).get()

  if (ex.empty) {
    return await dataColl.add({
      ...{
        club: "",
        audition: {}
      },
      ...refDB.docs[0].data()
    })
  }else{
    return ex.docs[0]
  }

}

export const appendUser = async (userColl, parameters: RegisterParamsType, refDB, dataDoc) => {
  return await userColl.add({
    stdID: refDB.docs[0].get("student_id"),
    email: parameters.email,
    phone: parameters.phone,
    dataRefID: dataDoc.id,
    password: await bcrypt.hash(parameters.password, 10),
    safeMode: false,
    authorised: {}
  })
}