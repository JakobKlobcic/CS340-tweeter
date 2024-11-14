import { UserDTO } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedUserItemRequest extends TweeterRequest {
    readonly token: string;
    readonly alias: string;
    readonly pageSize: number;
    readonly lastItem: UserDTO | null;
}