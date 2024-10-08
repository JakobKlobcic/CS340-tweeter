import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { useContext } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import { UserNavigationHookPresenter, UserNavigationHookView } from "../../presenters/UserNavigationHookPresenter";
import { useState } from "react";
interface UserNavigationHook{
    navigateToUser: (event: React.MouseEvent) => Promise<void>;
}
const useUserNavigationHook = (): UserNavigationHook => {
    const { setDisplayedUser, currentUser, authToken } =
    useContext(UserInfoContext);
    const { displayErrorMessage } = useToastListener();

    const listener : UserNavigationHookView = {
      setDisplayedUser: (user) => setDisplayedUser(user),
      displayErrorMessage: (message) => displayErrorMessage(message)
    }
  
    const [presenter] = useState(new UserNavigationHookPresenter(listener));
  
    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        presenter.navigateToUser(currentUser!, authToken!, event.target.toString());
    };    

    return {
        navigateToUser
    };
}
export default useUserNavigationHook