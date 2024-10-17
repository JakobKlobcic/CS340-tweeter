import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";
import { UserEntryPresenter, UserEntryView } from "./UserEntryPresenter";

export interface LoginView extends UserEntryView{
}

export class LoginPresenter extends UserEntryPresenter{
    private userService: UserService;

    public constructor(view: LoginView){
        super(view);
        this.userService = new UserService();
    }
    
    protected get view(): LoginView{
        return super.view as LoginView;
    }
    protected async doEntryAction(alias: string, password: string, email: string): Promise<void> {
        
    }
    
    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string): Promise<void> {
        this.handleRequest("log userin ", async ()=>{
                const [user, authToken] = await this.userService.login(alias, password);
                this.view.updateUserInfo(user, user, authToken, rememberMe);
        })
    }

}