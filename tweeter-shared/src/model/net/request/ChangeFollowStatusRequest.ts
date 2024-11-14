import { UserDTO } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface ChangeFollowStatusRequest extends TweeterRequest{
    authToken: string,
    affectedUser: UserDTO
}