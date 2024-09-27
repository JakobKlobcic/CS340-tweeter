import { AuthToken, User } from "tweeter-shared";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { useContext } from "react";

interface useUserInfoHook{
    currentUser: User | null;
    displayedUser: User | null;
    authToken: AuthToken | null;
    updateUserInfo: (
      currentUser: User,
      displayedUser: User | null,
      authToken: AuthToken,
      remember: boolean
    ) => void;
    clearUserInfo: () => void;
    setDisplayedUser: (user: User) => void;
}

const useUserInfoHook = () => {
    const { currentUser, displayedUser, authToken, updateUserInfo, clearUserInfo, setDisplayedUser } = useContext(UserInfoContext);
    return {
        currentUser,
        displayedUser,
        authToken,
        updateUserInfo,
        clearUserInfo,
        setDisplayedUser
    };
    
}

export default useUserInfoHook