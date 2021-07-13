import {establishAPIContext} from "@lib/api/registry";
import {
  addBrowserContext,
  fetchUserCredentialContext,
  removeBrowserContext,
  toggleBetaContext,
  toggleSafeModeContext
} from "@handlers/init/account";
import {addBrowserBlock} from "@actionBlocks/account/addBrowser";
import {conditionBlocks} from "@lib/blocks/conditionBlocks";
import {removeBrowserBlock} from "@actionBlocks/account/removeBrowser";
import {toggleBetaBlock} from "@actionBlocks/account/toggleBeta";
import {toggleSafeModeBlock} from "@actionBlocks/account/toggleSafeMode";
import {fetchUserCredentialBlock} from "@actionBlocks/fetcher/userCredentials";

export default establishAPIContext("POST", [
  addBrowserContext.init(addBrowserBlock, conditionBlocks.checkSession),
  removeBrowserContext.init(removeBrowserBlock, conditionBlocks.checkSession),
  toggleBetaContext.init(toggleBetaBlock, conditionBlocks.checkSession),
  toggleSafeModeContext.init(toggleSafeModeBlock, conditionBlocks.checkSession),
  fetchUserCredentialContext.init(fetchUserCredentialBlock, conditionBlocks.checkSession)
])