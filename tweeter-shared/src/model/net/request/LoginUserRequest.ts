import { TweeterRequest } from "./TweeterRequest";

export interface LoginUserRequest extends TweeterRequest {
    alias: string,
    password: string
}