import { StatusDTO } from "tweeter-shared";
import { SessionDAO } from "../dao/SessionDAO";
import { StoryDAO } from "../dao/StoryDAO";
import { FollowsDAO } from "../dao/FollowsDAO";
import { FeedDAO } from "../dao/FeedDAO";
export class StatusService{
    public async loadMoreStoryItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]>{
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("Invalid token");
        }
        try{
            const stories = await StoryDAO.instance.getMultiple(userAlias, pageSize, lastItem);
            return [stories , stories.length === pageSize];
        }catch(err){
            throw new Error("Unable to load more story items. Error JSON: "+JSON.stringify(err, null, 2));
        }
    };
    public async loadMoreFeedItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]>{
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("Invalid token");
        }
        try{
            const feed = await FeedDAO.instance.getMultiple(userAlias, pageSize, lastItem);
            return [feed , feed.length === pageSize];
        }catch(err){
            throw new Error("Unable to load more feed items. Error JSON: "+JSON.stringify(err, null, 2));
        }
        
    };

    public async postStatus(
        authToken: string,
        newStatus: StatusDTO
    ): Promise<void>{
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("Invalid token");
        }
        try{
            await StoryDAO.instance.create(newStatus);
            console.log("STORY created");
            const followers:string[] = []
            var hasMore = true
            while(hasMore){
                console.log("STORY - current followers:", followers)
                const newFollowers = await FollowsDAO.instance.getFollowers( newStatus.user.alias, 100, followers[followers.length-1] )
                hasMore = newFollowers.length === 100
            }
            console.log("STORY - Followers", followers)
            followers.forEach(async follower => {
                await FeedDAO.instance.create(newStatus, follower);
            })
        }catch(err){
            throw new Error("Unable to post status. Error JSON: "+JSON.stringify(err, null, 2));
        }

    };

}