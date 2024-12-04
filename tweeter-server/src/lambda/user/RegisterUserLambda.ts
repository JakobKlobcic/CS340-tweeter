import { RegisterUserRequest, UserEntryResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: RegisterUserRequest): Promise<UserEntryResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const userService = new UserService(daoFactory);
    const user = await userService.register(
        request.firstName, 
        request.lastName, 
        request.alias, 
        request.password, 
        request.userImageBytes, 
        request.imageFileExtension
    );
    return {
        success: true,
        message: null,
        data: user
    }
}