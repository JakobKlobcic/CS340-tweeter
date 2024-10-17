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
    private userService: UserService;

    public constructor(view: PostStatusView){
        super(view);
        this.userService = new UserService();
    }

    protected get view(): PostStatusView{
      return super.view as PostStatusView;
    }

    
    public async submitPost (post: string, currentUser: User, authToken: AuthToken){
      try {
        this.view.displayInfoMessage("Posting status...", 0);

        const status = new Status(post, currentUser!, Date.now());

        await this.postStatus(authToken!, status);

        this.view.setPost("");
        this.view.displayInfoMessage("Status posted!", 2000);
      } catch (error) {
          this.view.displayErrorMessage(
          `Failed to post the status because of exception: ${error}`
        );
      } finally {
          this.view.clearLastInfoMessage();
      }
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void>{
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
    };
    

}