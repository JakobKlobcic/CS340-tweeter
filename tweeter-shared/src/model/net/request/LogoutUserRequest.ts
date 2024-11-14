import { TweeterRequest } from "./TweeterRequest";

export interface LogoutUserRequest extends TweeterRequest {
    authToken: string 
}