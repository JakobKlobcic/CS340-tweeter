import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfoHook from "../../userInfo/UserInfoHook";
import { LoginPresenter, LoginView } from "../../../presenters/LoginPresenter";
import { UserEntryView } from "../../../presenters/UserEntryPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfoHook();
  const { displayErrorMessage } = useToastListener();

  const listener : LoginView = {
    updateUserInfo: (currentUser, displayedUser, authToken, remember) => updateUserInfo(currentUser, displayedUser, authToken, remember),
    displayErrorMessage: displayErrorMessage,
  }

  const [presenter] = useState(new LoginPresenter(listener));

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const doLogin = async () => {
    setIsLoading(true);
    presenter.doLogin(alias, password, rememberMe);
    if (!!props.originalUrl) {
      navigate(props.originalUrl);
    } else {
      navigate("/");
    }
    setIsLoading(false);
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationFields 
        onKeyDown={
          (event: React.KeyboardEvent<HTMLElement>)=>presenter.actionOnEnter(event, checkSubmitButtonStatus, doLogin)
        } 
        setAlias={setAlias} 
        setPassword={setPassword}/>
      </>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={presenter.switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
