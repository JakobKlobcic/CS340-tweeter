import {  UserDTO } from "tweeter-shared";
import { FollowsDAO } from "../dao/FollowsDAO";
import { SessionDAO } from "../dao/SessionDAO";
import { UserDAO } from "../dao/UserDAO";
export class FollowService{
    public async loadMoreFollowers(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const followerAliases = await FollowsDAO.instance.getFollowers(userAlias, pageSize, lastItem);

        const usersDB = await UserDAO.instance.getMultiple(followerAliases);
        
        const users = usersDB.map(user => {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                alias: user.alias,
                imageUrl: user.imageUrl
            }
        })

        return [users , users.length === pageSize];
    };

    public async loadMoreFollowees (
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const follows = await FollowsDAO.instance.getFollowees(userAlias, pageSize, lastItem);
        //const userAliases = follows.map(follow);
        console.log("FOLLOWEES ALIASES", follows)
        const usersDB = await UserDAO.instance.getMultiple(follows);

        const users = usersDB.map(user => {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                alias: user.alias,
                imageUrl: user.imageUrl
            }
        })

        return [users , users.length === pageSize];2
    };

    public async getIsFollowerStatus(
        authToken: string,
        user: UserDTO,
        selectedUser: UserDTO
    ): Promise<boolean> {
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        const follows = await FollowsDAO.instance.get({
            follower_alias: user.alias,
            followee_alias: selectedUser.alias
        });

        return !!follows
    };
    
    public async getFolloweeCount (
        authToken: string,
        user: UserDTO
    ): Promise<number> {
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        return await FollowsDAO.instance.getFolloweeCount(user.alias) || 0;
    };

    public async getFollowerCount(
        authToken: string,
        user: UserDTO
    ): Promise<number> {
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        return await FollowsDAO.instance.getFollowerCount(user.alias) || 0;
    };

    public async followUser(
        authToken: string,
        userToFollow: UserDTO
    ){
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const currentAlias = await SessionDAO.instance.get(authToken).then((session) => session.alias);
        // Pause so we can see the follow message. Remove when connected to the server
        await FollowsDAO.instance.create({
            follower_alias: currentAlias,
            followee_alias: userToFollow.alias
        });
    }

    public async unfollowUser(
        authToken: string,
        userToUnfollow: UserDTO
    ){
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const currentAlias = await SessionDAO.instance.get(authToken).then((session) => session.alias);

        await FollowsDAO.instance.delete({
            follower_alias: currentAlias,
            followee_alias: userToUnfollow.alias
        });
    }

}