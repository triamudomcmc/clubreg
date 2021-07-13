import {ActionContext, createActionContext} from "@lib/action/createAction";

export const addBrowserContext: ActionContext<{}> = createActionContext("addBrowser", "account")
export const removeBrowserContext: ActionContext<{browserID: string}> = createActionContext("removeBrowser", "account")
export const toggleBetaContext: ActionContext<{name: string}> = createActionContext("toggleBeta", "account")
export const toggleSafeModeContext: ActionContext<{safeMode: boolean}> = createActionContext("toggleSafeMode", "account")
