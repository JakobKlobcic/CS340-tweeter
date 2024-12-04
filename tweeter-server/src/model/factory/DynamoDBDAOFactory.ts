import { SessionDAO } from "../dao/SessionDAO";
import { FeedDAO } from "../dao/FeedDAO";
import { FollowsDAO } from "../dao/FollowsDAO";
import { S3DAO } from "../dao/S3DAO";
import { StoryDAO } from "../dao/StoryDAO";
import { UserDAO } from "../dao/UserDAO";
import { DAOFactory } from "./DAOFactory";


export class DynamoDBDAOFactory implements DAOFactory {
    public getUserDAO(): UserDAO {
        return new UserDAO(); // Assume UserDAO is properly implemented
    }

    public getSessionDAO(): SessionDAO {
        return new SessionDAO(); // Assume SessionDAO is properly implemented
    }

    public getS3DAO(): S3DAO {
        return new S3DAO(); // Assume S3DAO is properly implemented
    }

    public getStoryDAO(): StoryDAO {
        return new StoryDAO(); // Assume StoryDAO is properly implemented
    }

    public getFeedDAO(): FeedDAO {
        return new FeedDAO(); // Assume FeedDAO is properly implemented
    }

    public getFollowsDAO(): FollowsDAO {
        return new FollowsDAO(); // Assume FollowsDAO is properly implemented
    }
}