import { ChangeFollowStatusRequest, TweeterResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: ChangeFollowStatusRequest): Promise<TweeterResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const followService = new FollowService(daoFactory);
    await followService.unfollowUser(request.authToken, request.affectedUser);
    return {
        success: true,
        message: null,
    }
}