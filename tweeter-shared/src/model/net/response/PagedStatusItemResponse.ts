import { StatusDTO } from "../../dto/StatusDto";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedStatusItemResponse extends TweeterResponse {
    readonly items: StatusDTO[] | null;
    readonly hasMore: boolean;
}