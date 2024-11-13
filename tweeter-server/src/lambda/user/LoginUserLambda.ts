import {LoginUserRequest, UserEntryResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
export const handler = async (request: LoginUserRequest): Promise<UserEntryResponse> => {
    const userService = new UserService();
    const user = await userService.login(request.alias, request.password);
    return {
        success: true,
        message: null,
        data: user
    }
}