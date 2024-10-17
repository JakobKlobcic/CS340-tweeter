import { UserItemPresenter } from "./UserItemPresenter";
import { AuthToken, User } from "tweeter-shared";

export const PAGE_SIZE = 10;

export class FollowerPresenter extends UserItemPresenter{

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
      return this.service.loadMoreFollowers(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );
    }

    protected getItemDescription(): string {
      return "load follower items";
    }
  }