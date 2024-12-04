import { LogoutUserRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: LogoutUserRequest): Promise<TweeterResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const userService = new UserService(daoFactory);
    await userService.logout(request.authToken);
    return {
        success: true,
        message: null,
    }
}