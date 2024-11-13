import { StatusDTO } from "../../dto/StatusDto";

export interface PostStatusRequest {
    authToken: string,
    newStatus: StatusDTO
}