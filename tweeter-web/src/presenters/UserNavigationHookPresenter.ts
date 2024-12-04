import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";


export interface UserNavigationHookView extends View{
    setDisplayedUser: (user: User) => void,
    displayErrorMessage: (message: string) => void
}

export class UserNavigationHookPresenter extends Presenter<UserNavigationHookView>{
    private userService: UserService;

    public constructor(view: UserNavigationHookView){
        super(view);
        this.userService = new UserService();
    }    
    
    protected get view(): UserNavigationHookView{
        return super.view as UserNavigationHookView;
    }
    public extractAlias(value: string): string{
        const vals = value.split("/");
        return vals[vals.length-1];
    };
    
    public async navigateToUser (currentUser:User, authToken:AuthToken, target:string): Promise<void> {
      this.handleRequest("get user", async ()=>{
          const alias = this.extractAlias(target);
      
          const user = await this.userService.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this.view.setDisplayedUser(currentUser!);
            } else {
                this.view.setDisplayedUser(user);
            }
          }
        }
      )
    };  

}