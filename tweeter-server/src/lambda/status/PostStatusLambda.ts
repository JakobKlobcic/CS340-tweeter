import { PostStatusRequest } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { TweeterResponse } from "tweeter-shared/dist/model/net/response/TweeterResponse";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: PostStatusRequest): Promise<TweeterResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const statusService = new StatusService(daoFactory);
    const startTime = new Date().getTime();
    await statusService.postStatus(request.authToken, request.newStatus);
    const endTime = new Date().getTime();

    console.log("PostStatusLambda duration: " + (endTime - startTime) + "ms");
    return {
        success: true,
        message: null,
    }
}