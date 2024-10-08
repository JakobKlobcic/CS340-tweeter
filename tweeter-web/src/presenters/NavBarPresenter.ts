import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";

export interface NavBarView{
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
    clearUserInfo: () => void;
    displayInfoMessage: (message: string, duration: number) => void;
}

export class NavBarPresenter{
    private view: NavBarView;
    private userService: UserService;

    public constructor(view: NavBarView){
        this.view = view;
        this.userService = new UserService();
    }

    public async logOut(authToken: AuthToken){
        this.view.displayInfoMessage("Logging Out...", 0);
    
        try {
          await this.logout(authToken!);
    
          this.view.clearLastInfoMessage();
          this.view.clearUserInfo();
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user out because of exception: ${error}`
          );
        }
    };
    
    public async logout(authToken: AuthToken): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };

}