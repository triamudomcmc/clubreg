import {establishAPIContext} from "@lib/api/registry";
import {forgotContext, loginContext, logoutContext, registerContext, resetPasswordContext} from "@handlers/init/auth";
import {forgotBlock} from "@actionBlocks/auth/forgot";
import {conditionBlocks} from "@lib/blocks/conditionBlocks";
import {resetPasswordBlock} from "@actionBlocks/auth/resetPassword";
import {loginBlock} from "@actionBlocks/auth/login";
import {registerBlock} from "@actionBlocks/auth/register";
import {destroySessionBlock} from "@actionBlocks/auth/destroySession";

export default establishAPIContext("POST", [
  loginContext.init(loginBlock),
  registerContext.init(registerBlock),
  forgotContext.init(forgotBlock, conditionBlocks.checkEmail),
  resetPasswordContext.init(resetPasswordBlock),
  logoutContext.init(destroySessionBlock)
])