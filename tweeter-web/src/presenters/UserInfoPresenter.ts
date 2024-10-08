import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { FollowService } from "../model/service/FollowService";

export interface UserInfoView{

}

export class UserInfoPresenter{
    private _view: UserInfoView;
    private userService: UserService;
    private followService: FollowService;
    public constructor(view: UserInfoView){
        this._view = view;
        this.userService = new UserService();
        this.followService = new FollowService();
    }
    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        return this.userService.getUser(authToken, alias);
    }
    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return this.followService.getIsFollowerStatus(authToken, user, selectedUser);
    };

    public async getFolloweeCount (
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return this.followService.getFolloweeCount(authToken, user);
    };

    public async getFollowerCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return this.followService.getFollowerCount(authToken, user);
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server
    
        const followerCount = await this.followService.getFollowerCount(authToken, userToFollow);
        const followeeCount = await this.followService.getFolloweeCount(authToken, userToFollow);
    
        return [followerCount, followeeCount];
    };
    
    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server
    
        const followerCount = await this.followService.getFollowerCount(authToken, userToUnfollow);
        const followeeCount = await this.followService.getFolloweeCount(authToken, userToUnfollow);
    
        return [followerCount, followeeCount];
    };
}