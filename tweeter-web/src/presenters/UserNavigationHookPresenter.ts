import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";

export interface UserNavigationHookView{
    setDisplayedUser: (user: User) => void,
    displayErrorMessage: (message: string) => void
}

export class UserNavigationHookPresenter{
    private view: UserNavigationHookView;
    private userService: UserService;

    public constructor(view: UserNavigationHookView){
        this.view = view;
        this.userService = new UserService();
    }    
    
    public extractAlias(value: string): string{
        const index = value.indexOf("@");
        return value.substring(index);
    };
    
    public async navigateToUser (currentUser:User, authToken:AuthToken, target:string): Promise<void> {
        try {
          const alias = this.extractAlias(target);
    
          const user = await this.userService.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this.view.setDisplayedUser(currentUser!);
            } else {
                this.view.setDisplayedUser(user);
            }
          }
        } catch (error) {
          this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };  

}