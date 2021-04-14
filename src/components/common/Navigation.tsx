import {WhiteLogo} from "@vectors/Logo";
import {DropdownMenu} from "@vectors/buttons/Menu";

const Navigation = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-TUCMC-gray-900 h-16 px-6">
      <WhiteLogo/>
      <DropdownMenu/>
    </div>
  )
}

export default Navigation
