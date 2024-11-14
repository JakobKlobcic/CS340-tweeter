import { TweeterRequest } from "./TweeterRequest";

export interface RegisterUserRequest extends TweeterRequest {
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
}