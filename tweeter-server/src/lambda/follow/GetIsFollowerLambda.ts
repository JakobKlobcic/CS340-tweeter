import { IsFollowerStatusRequest, IsFollowerStatusResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: IsFollowerStatusRequest): Promise<IsFollowerStatusResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const followService = new FollowService(daoFactory);
    const isFollower = await followService.getIsFollowerStatus(request.authToken, request.user, request.selectedUser);
    return {
        success: true,
        message: null,
        isFollower: isFollower
    }
}