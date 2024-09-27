import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { AuthToken, FakeData, User } from "tweeter-shared";
import { Context, createContext, useState, useContext } from "react";
import useToastListener from "../toaster/ToastListenerHook";

interface UserNavigationHook{
    navigateToUser: (event: React.MouseEvent) => Promise<void>;
}
const useUserNavigationHook = (): UserNavigationHook => {
    const { setDisplayedUser, currentUser, authToken } =
    useContext(UserInfoContext);
    const { displayErrorMessage } = useToastListener();

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
    
        try {
          const alias = extractAlias(event.target.toString());
    
          const user = await getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              setDisplayedUser(currentUser!);
            } else {
              setDisplayedUser(user);
            }
          }
        } catch (error) {
          displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };
    
    const extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };
    
    const getUser = async (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
    };
    

    return {
        navigateToUser
    };
}
export default useUserNavigationHook