import { UserService } from "../model/service/UserService";
import { User, AuthToken, Status } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface PostStatusView extends View{
    displayInfoMessage: (message: string, duration: number) => void;
    setPost: (post: string) => void;
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView>{
    private _userService: UserService | null = null;

    public constructor(view: PostStatusView){
        super(view);
    }

    protected get view(): PostStatusView{
      return super.view as PostStatusView;
    }

    public get service(): UserService{
        if(this._userService === null){
            return new UserService();
        }
        return this._userService;
    }

    
    public async submitPost (status: Status, currentUser: User, authToken: AuthToken){
      try {
        this.view.displayInfoMessage("Posting status...", 0);

        await this.service.postStatus(authToken!, status);

        this.view.setPost("");
        this.view.displayInfoMessage("Status posted!", 2000);
      } catch (error) {
          this.view.displayErrorMessage(
          `Failed to post the status because of exception: ${(error as Error).message}`
        );
      } finally {
          this.view.clearLastInfoMessage();
      }
    };   

}