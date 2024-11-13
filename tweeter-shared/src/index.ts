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

//Requests
export type { PagedUserItemRequest } from "./model/net/request/PagedUserItemRequest";
export type { IsFollowerStatusRequest } from "./model/net/request/IsFollowerStatusRequest";
export type { FollowCountRequest } from "./model/net/request/FollowCountRequest";
export type { PagedStatusItemRequest } from "./model/net/request/PagedStatusItemRequest";
//Responses
export type { PagedUserItemResponse } from "./model/net/response/PagedUserItemResponse";
export type { IsFollowerStatusResponse } from "./model/net/response/IsFollowerStatusResponse";
export type { FollowCountResponse } from "./model/net/response/FollowCountResponse";
export type { PagedStatusItemResponse } from "./model/net/response/PagedStatusItemResponse";