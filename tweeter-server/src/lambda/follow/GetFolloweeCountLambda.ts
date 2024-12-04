import { FollowCountRequest, FollowCountResponse} from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: FollowCountRequest): Promise<FollowCountResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const followService = new FollowService(daoFactory);
    const count = await followService.getFolloweeCount(request.authToken, request.user);
    return {
        success: true,
        message: null,
        count: count
    }
}