import { Status, AuthToken } from "tweeter-shared";
import { StatusPresenter } from "./StatusPresenter";

export const PAGE_SIZE = 10;

export class FeedPresenter extends StatusPresenter{

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
      return this.service.loadMoreFeedItems(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );
    }

    protected getItemDescription(): string {
      return "load feed items";
    } 
}