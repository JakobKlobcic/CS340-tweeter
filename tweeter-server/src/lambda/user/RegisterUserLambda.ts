import { RegisterUserRequest, UserEntryResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
export const handler = async (request: RegisterUserRequest): Promise<UserEntryResponse> => {
    const userService = new UserService();
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