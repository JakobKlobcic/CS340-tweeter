import { FeedDAO } from "../dao/FeedDAO";
import { FollowsDAO } from "../dao/FollowsDAO";
import { S3DAO } from "../dao/S3DAO";
import { SessionDAO } from "../dao/SessionDAO";
import { StoryDAO } from "../dao/StoryDAO";
import { UserDAO } from "../dao/UserDAO";

export interface DAOFactory {
    getUserDAO(): UserDAO;
    getSessionDAO(): SessionDAO;
    getS3DAO(): S3DAO;
    getStoryDAO(): StoryDAO;
    getFeedDAO(): FeedDAO;
    getFollowsDAO(): FollowsDAO;
}