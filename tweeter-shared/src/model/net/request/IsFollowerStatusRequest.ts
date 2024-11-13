import { UserDTO } from "../../dto/UserDto"

export interface IsFollowerStatusRequest {
    readonly authToken: string,
    readonly user: UserDTO,
    readonly selectedUser: UserDTO
}