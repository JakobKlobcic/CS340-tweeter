import {LoginUserRequest, UserEntryResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: LoginUserRequest): Promise<UserEntryResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const userService = new UserService(daoFactory);
    const user = await userService.login(request.alias, request.password);
    return {
        success: true,
        message: null,
        data: user
    }
}