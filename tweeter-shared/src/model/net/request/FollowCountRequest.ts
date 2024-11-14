import { UserDTO } from "../../dto/UserDto"
import { TweeterRequest } from "./TweeterRequest";

export interface FollowCountRequest extends TweeterRequest {
    readonly authToken: string,
    readonly user: UserDTO,
}