import { UserDTO } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedUserItemResponse extends TweeterResponse {
    readonly items: UserDTO[] | null;
    readonly hasMore: boolean;
}