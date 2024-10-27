import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface NavBarView extends View{
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
    clearUserInfo: () => void;
    displayInfoMessage: (message: string, duration: number) => void;
}

export class NavBarPresenter extends Presenter<NavBarView>{
    private _userService: UserService | null = null;

    public constructor(view: NavBarView){
        super(view);
    }

    protected get view(): NavBarView{
      return super.view as NavBarView;
    }

    public get userService(): UserService{
      if (this._userService === null){
        this._userService = new UserService();
      } 
      return this._userService;
    }

    public async logOut(authToken: AuthToken){
        this.view.displayInfoMessage("Logging Out...", 0);
        this.handleRequest("log user out", async ()=>{
          await this.userService.logout(authToken!);
    
          this.view.clearLastInfoMessage();
          this.view.clearUserInfo();
        }
      )
    };

}