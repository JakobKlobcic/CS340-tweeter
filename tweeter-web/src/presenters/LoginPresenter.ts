import { UserService } from "../model/service/UserService";
import { User, AuthToken, FakeData } from "tweeter-shared";

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
        // TODO: Replace with the result of calling the server
        const user = FakeData.instance.firstUser;
    
        if (user === null) {
          throw new Error("Invalid alias or password");
        }
    
        return [user, FakeData.instance.authToken];
      };

}