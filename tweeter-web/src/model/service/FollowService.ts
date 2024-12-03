import { AuthToken, User } from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class FollowService{
    private serverFacade: ServerFacade = new ServerFacade();
    
    public async loadMoreFollowers(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return this.serverFacade.getMoreFollowers({
            token: authToken.token,
            alias:userAlias,
            pageSize,
            lastItem: lastItem && lastItem.dto
        });
    };

    public async loadMoreFollowees (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return await this.serverFacade.getMoreFollowees({
            token: authToken.token,
            alias: userAlias,
            pageSize,
            lastItem: lastItem && lastItem.dto
        });
    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return await this.serverFacade.getIsFollowerStatus({
            authToken: authToken.token,
            user: user.dto,
            selectedUser: selectedUser.dto
        });
    };
    
    public async getFolloweeCount (
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return await this.serverFacade.getFolloweeCount({
            authToken: authToken.token,
            user: user.dto
        });
    };

    public async getFollowerCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return await this.serverFacade.getFollowerCount({
            authToken: authToken.token,
            user: user.dto
        });
    };

    public async followUser(
        authToken: AuthToken,
        userToUnfollow: User
    ){
        return await this.serverFacade.follow({
            authToken: authToken.token,
            affectedUser: userToUnfollow.dto
        });
    }

    public async unfollowUser(
        authToken: AuthToken,
        userToUnfollow: User
    ){
        // Pause so we can see the follow message. Remove when connected to the server
        return await this.serverFacade.unfollow({
            authToken: authToken.token,
            affectedUser: userToUnfollow.dto
        });
    }

}