import { UserService } from "../model/service/UserService";
import { UserEntryPresenter,UserEntryView } from "./UserEntryPresenter";

export interface LoginView extends UserEntryView{
}
export class LoginPresenter extends UserEntryPresenter<UserService, LoginView> {

  protected createService(): UserService {
    return new UserService();
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean): Promise<void> {
    const performLogin = () => this.service.login(alias, password);
    await this.doEntryAction(performLogin, rememberMe);
  }

  public switchAuthenticationMethodGenerator(): string {
    return "/login"
  };

}