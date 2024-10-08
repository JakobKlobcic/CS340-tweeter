import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface PostView{

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
}