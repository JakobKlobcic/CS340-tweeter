import { GetUserRequest, GetUserResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: GetUserRequest): Promise<GetUserResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const userService = new UserService(daoFactory);
    const user = await userService.getUser(request.authToken, request.alias);
    return {
        success: true,
        message: null,
        user: user
    }
}