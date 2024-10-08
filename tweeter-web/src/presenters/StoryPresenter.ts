import { StatusService } from "../model/service/StatusService";
import { User, AuthToken } from "tweeter-shared";
import { StatusPresenter, StatusView } from "./StatusPresenter";

export const PAGE_SIZE = 10;

export class StoryPresenter extends StatusPresenter{
    private statusService: StatusService;

    public constructor(view: StatusView){
        super(view);
        this.statusService = new StatusService();
    }
    
    public async loadMoreItems (authToken: AuthToken, userAlias: string){
       try {
        const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
            authToken,
            userAlias,
            PAGE_SIZE,
            this.lastItem
        );
    
          this.hasMoreItems = hasMore;
          this.lastItem = newItems[newItems.length - 1];
          this.view.addItems(newItems);
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to load story items because of exception: ${error}`
          );
        }
      };

}