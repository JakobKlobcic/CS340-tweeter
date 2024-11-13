import { IsFollowerStatusRequest, IsFollowerStatusResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
export const handler = async (request: IsFollowerStatusRequest): Promise<IsFollowerStatusResponse> => {
    const followService = new FollowService();
    const isFollower = await followService.getIsFollowerStatus(request.authToken, request.user, request.selectedUser);
    return {
        success: true,
        message: null,
        isFollower: isFollower
    }
}