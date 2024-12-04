import { PostStatusRequest } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { TweeterResponse } from "tweeter-shared/dist/model/net/response/TweeterResponse";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: PostStatusRequest): Promise<TweeterResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const statusService = new StatusService(daoFactory);
    await statusService.postStatus(request.authToken, request.newStatus);
    return {
        success: true,
        message: null,
    }
}