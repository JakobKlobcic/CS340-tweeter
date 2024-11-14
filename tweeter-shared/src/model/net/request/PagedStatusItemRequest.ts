import { StatusDTO } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedStatusItemRequest extends TweeterRequest {
    readonly authToken: string,
    readonly userAlias: string,
    readonly pageSize: number,
    readonly lastItem: StatusDTO | null
}