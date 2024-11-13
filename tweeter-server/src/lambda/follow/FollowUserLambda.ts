import { ChangeFollowStatusRequest, TweeterResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
export const handler = async (request: ChangeFollowStatusRequest): Promise<TweeterResponse> => {
    const followService = new FollowService();
    await followService.followUser(request.authToken, request.affectedUser);
    return {
        success: true,
        message: null,
    }
}