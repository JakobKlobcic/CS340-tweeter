import {  UserDTO } from "tweeter-shared";
import { FollowsDAO } from "../dao/FollowsDAO";
import { SessionDAO } from "../dao/SessionDAO";
import { UserDAO } from "../dao/UserDAO";
import { DAOFactory } from "../factory/DAOFactory";
export class FollowService{
    private sessionDAO: SessionDAO;
    private userDAO: UserDAO;
    private followsDAO: FollowsDAO;
    
    constructor(daoFactory: DAOFactory){
        this.sessionDAO = daoFactory.getSessionDAO();
        this.userDAO = daoFactory.getUserDAO();
        this.followsDAO = daoFactory.getFollowsDAO();
    }
    public async loadMoreFollowers(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const followerAliases = await this.followsDAO.getFollowers(userAlias, pageSize, lastItem && {follower_alias: lastItem.alias, followee_alias: userAlias});

        const usersDB = await this.userDAO.getMultiple(followerAliases);
        
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
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const follows = await this.followsDAO.getFollowees(userAlias, pageSize, lastItem && {follower_alias: userAlias, followee_alias: lastItem.alias});
        const usersDB = await this.userDAO.getMultiple(follows);
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
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        const follows = await this.followsDAO.get({
            follower_alias: user.alias,
            followee_alias: selectedUser.alias
        });

        return !!follows
    };
    
    public async getFolloweeCount (
        authToken: string,
        user: UserDTO
    ): Promise<number> {
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        return await this.followsDAO.getFolloweeCount(user.alias) || 0;
    };

    public async getFollowerCount(
        authToken: string,
        user: UserDTO
    ): Promise<number> {
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        return await this.followsDAO.getFollowerCount(user.alias) || 0;
    };

    public async followUser(
        authToken: string,
        userToFollow: UserDTO
    ){
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const currentAlias = await this.sessionDAO.get(authToken).then((session) => session.alias);
        // Pause so we can see the follow message. Remove when connected to the server
        await this.followsDAO.create({
            follower_alias: currentAlias,
            followee_alias: userToFollow.alias
        });
    }

    public async unfollowUser(
        authToken: string,
        userToUnfollow: UserDTO
    ){
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        const currentAlias = await this.sessionDAO.get(authToken).then((session) => session.alias);

        await this.followsDAO.delete({
            follower_alias: currentAlias,
            followee_alias: userToUnfollow.alias
        });
    }

}