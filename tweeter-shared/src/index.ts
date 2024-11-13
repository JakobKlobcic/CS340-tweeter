//Domain Classes
export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

// All classes that should be avaialble to other modules need to exported here. export * does not work when 
// uploading to lambda. Instead we have to list each export.
export { FakeData } from "./util/FakeData";

//DTOs
export type { UserDTO } from "./model/dto/UserDto";
export type { StatusDTO } from "./model/dto/StatusDto";
export type { PostSegmentDTO } from "./model/dto/PostSegmentDto";
export type { AuthTokenDTO } from "./model/dto/AuthTokenDto";

//Requests
export type { TweeterRequest as TwitterRequest } from "./model/net/request/TweeterRequest";
export type { PagedUserItemRequest } from "./model/net/request/PagedUserItemRequest";
export type { IsFollowerStatusRequest } from "./model/net/request/IsFollowerStatusRequest";
export type { FollowCountRequest } from "./model/net/request/FollowCountRequest";
export type { PagedStatusItemRequest } from "./model/net/request/PagedStatusItemRequest";
export type { PostStatusRequest } from "./model/net/request/PostStatusRequest";
export type { GetUserRequest } from "./model/net/request/GetUserRequest";
export type { LoginUserRequest} from "./model/net/request/LoginUserRequest";
export type { LogoutUserRequest } from "./model/net/request/LogoutUserRequest";
export type { RegisterUserRequest } from "./model/net/request/RegisterUserRequest";
export type { ChangeFollowStatusRequest } from "./model/net/request/ChangeFollowStatusRequest";

//Responses
export type {TweeterResponse} from "./model/net/response/TweeterResponse";
export type { PagedUserItemResponse } from "./model/net/response/PagedUserItemResponse";
export type { IsFollowerStatusResponse } from "./model/net/response/IsFollowerStatusResponse";
export type { FollowCountResponse } from "./model/net/response/FollowCountResponse";
export type { PagedStatusItemResponse } from "./model/net/response/PagedStatusItemResponse";
export type { UserEntryResponse } from "./model/net/response/UserEntryResponse";
export type { GetUserResponse } from "./model/net/response/GetUserResponse";