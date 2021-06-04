import LooseTypeObject from "@interfaces/LooseTypeObject";
import {fixGrammar, isASCII} from "@utilities/texts";

export const createDataPair = (ref1: LooseTypeObject<string>, ref2: LooseTypeObject<string>) => {
  const ref1Keys = Object.keys(ref1), ref2Keys = Object.keys(ref2)
  let primary = ref1, secondary = ref2
  if (ref1Keys.length < ref2Keys.length) primary = ref2; secondary = ref1
  const dataPair = {}
  Object.keys(primary).map(value => {
    dataPair[value] = [fixGrammar(primary[value]), value in secondary ? fixGrammar(secondary[value]) : ""]
  })

  return dataPair
}

export const compareDataPair = (dataPair: LooseTypeObject<string>, key: string) => dataPair[key][0] === dataPair[key][1]

export const isValidEmail = (email: string) => email !== "" && email.includes("@") && email.includes(".")

export const isValidPassword = (password: string) => password.length >= 8 && isASCII(password)