import { StatusDTO } from "tweeter-shared";
import { SessionDAO } from "../dao/SessionDAO";
import { StoryDAO } from "../dao/StoryDAO";
import { FollowsDAO } from "../dao/FollowsDAO";
import { FeedDAO } from "../dao/FeedDAO";
import { DAOFactory } from "../factory/DAOFactory";
export class StatusService{
    private sessionDAO: SessionDAO;
    private storyDAO: StoryDAO;
    private feedDAO: FeedDAO;
    private followsDAO: FollowsDAO;

    constructor(daoFactory: DAOFactory){
        this.sessionDAO = daoFactory.getSessionDAO();
        this.storyDAO = daoFactory.getStoryDAO();
        this.feedDAO = daoFactory.getFeedDAO();
        this.followsDAO = daoFactory.getFollowsDAO();
    }

    public async loadMoreStoryItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]>{
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        try{
            const stories = await this.storyDAO.getMultiple(userAlias, pageSize, lastItem);
            return [stories , stories.length === pageSize];
        }catch(err){
            throw new Error("[Internal Server Error]: Unable to load more story items. Error JSON: "+JSON.stringify(err, null, 2));
        }
    };
    public async loadMoreFeedItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]>{
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        try{
            const feed = await this.feedDAO.getMultiple(userAlias, pageSize, lastItem);
            return [feed , feed.length === pageSize];
        }catch(err){
            throw new Error("[Internal Server Error]: Unable to load more feed items. Error JSON: "+JSON.stringify(err, null, 2));
        }
        
    };

    public async postStatus(
        authToken: string,
        newStatus: StatusDTO
    ): Promise<void>{
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }
        try{
            await this.storyDAO.create(newStatus);
            const followers:string[] = await this.followsDAO.getFollowers( newStatus.user.alias, 100, null)
            for (const follower of followers) {
                await this.feedDAO.create(newStatus, follower);
            }
        }catch(err){
            throw new Error("[Internal Server Error]: Unable to post status. Error JSON: "+JSON.stringify(err, null, 2));
        }

    };

}