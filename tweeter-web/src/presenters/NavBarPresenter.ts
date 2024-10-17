import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface NavBarView extends View{
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
    clearUserInfo: () => void;
    displayInfoMessage: (message: string, duration: number) => void;
}

export class NavBarPresenter extends Presenter<NavBarView>{
    private userService: UserService;

    public constructor(view: NavBarView){
        super(view);
        this.userService = new UserService();
    }

    protected get view(): NavBarView{
      return super.view as NavBarView;
    }

    public async logOut(authToken: AuthToken){
        this.view.displayInfoMessage("Logging Out...", 0);
        this.handleRequest("log user out", async ()=>{
          await this.logout(authToken!);
    
          this.view.clearLastInfoMessage();
          this.view.clearUserInfo();
        }
      )
    };
    
    public async logout(authToken: AuthToken): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };

}