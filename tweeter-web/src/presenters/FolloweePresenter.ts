import { UserItemPresenter } from "./UserItemPresenter";
import { User, AuthToken } from "tweeter-shared";

export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter{

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
      return this.service.loadMoreFollowees(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );
    }

    protected getItemDescription(): string {
      return "load followee items";
    }
}