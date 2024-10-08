import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";

export interface LoginView{

}

export class LoginPresenter{
    private view: LoginView;
    private userService: UserService;

    public constructor(view: LoginView){
        this.view = view;
        this.userService = new UserService();
    }

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]>{
        return this.userService.login(alias, password);
    };

}