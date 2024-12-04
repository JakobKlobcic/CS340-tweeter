import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface PostView extends View{
    setDisplayedUser: (user: User) => void;
    displayErrorMessage: (message: string) => void;
}

export class PostPresenter extends Presenter<PostView>{
    private userService: UserService;
    public constructor(view: PostView){
        super(view);
        this.userService = new UserService();
    }

    protected get view(): PostView{
      return super.view as PostView;
    }

    public extractAlias(value: string): string{
      const vals = value.split("/");
      return vals[vals.length-1];
    };

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        return this.userService.getUser(authToken, alias);
    }
    public async navigateToUser (currentUser:User, authToken: AuthToken,target:string): Promise<void> {  
      this.handleRequest("get user", async ()=>{
        const alias = this.extractAlias(target);
    
          const user = await this.getUser(authToken!, alias);

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