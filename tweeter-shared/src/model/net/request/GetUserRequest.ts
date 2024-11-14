import { TweeterRequest } from "./TweeterRequest";

export interface GetUserRequest extends TweeterRequest {
    authToken: string,
    alias: string
}