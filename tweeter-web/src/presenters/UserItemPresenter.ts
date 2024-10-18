import {User, AuthToken} from "tweeter-shared"
import { Presenter, View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { FollowService } from "../model/service/FollowService";
import { ItemPresenter, ItemView } from "./ItemPresenter";

export interface UserItemView extends ItemView<User>{
    addItems: (newItems: User[]) => void,
}

export abstract class UserItemPresenter extends ItemPresenter<User, FollowService>{
    protected createService(): FollowService{
        return new FollowService()
    }
}