import {ActionContext, createActionContext} from "@lib/action/createAction";

interface RegisterParamsType {
  stdID: string,
  email: string,
  phone: string,
  room: string,
  level: string,
  number: string,
  firstname: string,
  lastname: string,
  confirmPassword: string,
  password: string,
}

export const loginContext: ActionContext<{stdID: string, password: string, verify: string}> = createActionContext("login", "auth")
export const forgotContext: ActionContext<{email: string}> = createActionContext("forgot", "auth")
export const resetPasswordContext: ActionContext<{password: string, conPassword: string, actionID: string}> = createActionContext("resetPassword", "auth")
export const registerContext: ActionContext<RegisterParamsType> = createActionContext("register", "auth")
export const logoutContext: ActionContext<{cause?: string}> = createActionContext("logout", "auth")
