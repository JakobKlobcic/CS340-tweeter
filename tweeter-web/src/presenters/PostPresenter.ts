import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface PostView{
    setDisplayedUser: (user: User) => void;
    displayErrorMessage: (message: string) => void;
}

export class PostPresenter{
    private _view: PostView;
    private userService: UserService;
    public constructor(view: PostView){
        this._view = view;
        this.userService = new UserService();
    }
    public extractAlias(value: string): string{
        const index = value.indexOf("@");
        return value.substring(index);
    };

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        return this.userService.getUser(authToken, alias);
    }
    public async navigateToUser (currentUser:User, authToken: AuthToken,target:string): Promise<void> {    
        try {
          const alias = this.extractAlias(target);
    
          const user = await this.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this._view.setDisplayedUser(currentUser!);
            } else {
              this._view.setDisplayedUser(user);
            }
          }
        } catch (error) {
            this._view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
      };
}