import { TweeterRequest } from "./TweeterRequest";

export interface RegisterUserRequest extends TweeterRequest {
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
}