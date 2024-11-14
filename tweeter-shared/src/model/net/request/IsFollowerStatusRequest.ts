import { UserDTO } from "../../dto/UserDto"
import { TweeterRequest } from "./TweeterRequest"

export interface IsFollowerStatusRequest extends TweeterRequest {
    readonly authToken: string,
    readonly user: UserDTO,
    readonly selectedUser: UserDTO
}