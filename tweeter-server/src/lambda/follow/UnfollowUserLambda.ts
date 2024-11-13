import { ChangeFollowStatusRequest, TweeterResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
export const handler = async (request: ChangeFollowStatusRequest): Promise<TweeterResponse> => {
    const followService = new FollowService();
    await followService.unfollowUser(request.authToken, request.affectedUser);
    return {
        success: true,
        message: null,
    }
}