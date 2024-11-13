import { AuthTokenDTO } from "../../dto/AuthTokenDto";
import { UserDTO } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface UserEntryResponse extends TweeterResponse{
    data: [UserDTO, AuthTokenDTO]
}
