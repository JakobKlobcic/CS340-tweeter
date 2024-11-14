import { StatusDTO } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PostStatusRequest extends TweeterRequest {
    authToken: string,
    newStatus: StatusDTO
}