import { StatusDTO } from "tweeter-shared";
import { SessionDAO } from "../dao/SessionDAO";
import { StoryDAO } from "../dao/StoryDAO";
import { FollowsDAO } from "../dao/FollowsDAO";
import { FeedDAO } from "../dao/FeedDAO";
import { DAOFactory } from "../factory/DAOFactory";
import { SQSAccess } from "../sqs/SQSAccess";
import { PostHandler } from "../sqs/PostHandler";
export class StatusService{
    private sessionDAO: SessionDAO;
    private storyDAO: StoryDAO;
    private feedDAO: FeedDAO;
    private followsDAO: FollowsDAO;
    private postHandler: PostHandler;

    constructor(daoFactory: DAOFactory){
        this.sessionDAO = daoFactory.getSessionDAO();
        this.storyDAO = daoFactory.getStoryDAO();
        this.feedDAO = daoFactory.getFeedDAO();
        this.followsDAO = daoFactory.getFollowsDAO();
        this.postHandler = new PostHandler();
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
            const stories = await this.storyDAO.getMultiple(userAlias, pageSize, lastItem && {author_alias: userAlias, timestamp: lastItem.timestamp});
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
            const feed = await this.feedDAO.getMultiple(userAlias, pageSize, lastItem && {receiver_alias: userAlias, timestamp: lastItem.timestamp});
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
        const startTime = new Date().getTime();
        await this.storyDAO.create(newStatus);
        const endTime = new Date().getTime();

        console.log("Time taken to write to story table: ", endTime - startTime);

        const startTime2 = new Date().getTime();
        await this.postHandler.postStatus(newStatus);
        const endTime2 = new Date().getTime();

        console.log("Time taken to write to post queue: ", endTime2 - startTime2);
    };

}