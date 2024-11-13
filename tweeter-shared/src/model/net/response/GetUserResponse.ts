import { UserDTO } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface GetUserResponse extends TweeterResponse{
    readonly user: UserDTO | null;
}