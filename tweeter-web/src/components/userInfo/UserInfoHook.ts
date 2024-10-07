import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { useContext } from "react";

const useUserInfoHook = () => useContext(UserInfoContext);

export default useUserInfoHook;
