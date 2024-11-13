import { UserDTO } from "../../dto/UserDto"

export interface FollowCountRequest {
    readonly authToken: string,
    readonly user: UserDTO,
}