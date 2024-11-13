import { StatusDTO } from "../../dto/StatusDto";

export interface PagedStatusItemRequest {
    readonly authToken: string,
    readonly userAlias: string,
    readonly pageSize: number,
    readonly lastItem: StatusDTO | null
}