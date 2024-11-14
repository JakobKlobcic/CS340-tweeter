import {
    AuthToken,
    AuthTokenDTO,
    ChangeFollowStatusRequest,
    FollowCountRequest,
    FollowCountResponse,
    GetUserRequest,
    GetUserResponse,
    IsFollowerStatusRequest,
    IsFollowerStatusResponse,
    LoginUserRequest,
    LogoutUserRequest,
    PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    PostStatusRequest,
    RegisterUserRequest,
    Status,
    StatusDTO,
    TweeterResponse,
    User,
    UserDTO,
    UserEntryResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator"
import { Buffer } from "buffer";

export class ServerFacade {
    private SERVER_URL = "https://1xnvnwgf21.execute-api.us-west-2.amazonaws.com/dev";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    public async getMoreFollowees(
        request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
        PagedUserItemResponse
        >(request, "/follow/get-followees");

        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
        response.success && response.items
            ? response.items.map((dto: UserDTO) => User.fromDto(dto) as User)
            : null;

        // Handle errors    
        if (response.success) {
        if (items == null) {
            throw new Error(`No followees found`);
        } else {
            return [items, response.hasMore];
        }
        } else {
        console.error(response);
        throw new Error(response.message?? "Unknown error");
        }
    }

    public async getMoreFollowers(
        request: PagedUserItemRequest
        ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            PagedUserItemRequest,
            PagedUserItemResponse
        >(request, "/follow/get-followers");

        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
            response.success && response.items
            ? response.items.map((dto: UserDTO) => User.fromDto(dto) as User)
            : null;

        // Handle errors    
        if (response.success) {
            if (items == null) {
            throw new Error(`No followers found`);
            } else {
            return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message?? "Unknown error");
        }
    }

    public async getIsFollowerStatus(
        request: IsFollowerStatusRequest
    ): Promise<boolean> {
        const response = await this.clientCommunicator.doPost<
            IsFollowerStatusRequest,
            IsFollowerStatusResponse
        >(request, "/follow/get-is-follower");
        if (response.success) {
            return response.isFollower;
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async getFolloweeCount(
        request: FollowCountRequest
    ): Promise<number> {
        const response = await this.clientCommunicator.doPost<
            FollowCountRequest,
            FollowCountResponse
        >(request, "/follow/get-followee-count");
        if (response.success) {
            return response.count;
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async getFollowerCount(
        request: FollowCountRequest
    ): Promise<number> {
        const response = await this.clientCommunicator.doPost<
            FollowCountRequest,
            FollowCountResponse
        >(request, "/follow/get-follower-count");
        if (response.success) {
            return response.count;
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async follow(
        request: ChangeFollowStatusRequest
    ): Promise<void> {
        const response = await this.clientCommunicator.doPost<
            ChangeFollowStatusRequest,
            TweeterResponse
        >(request, "/follow/follow-user");
        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async unfollow(
        request: ChangeFollowStatusRequest
    ): Promise<void> {
        const response = await this.clientCommunicator.doPost<
            ChangeFollowStatusRequest,
            TweeterResponse
        >(request, "/follow/unfollow-user");
        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async getMoreFeedItems(
        request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            PagedStatusItemRequest,
            PagedStatusItemResponse
        >(request, "/status/get-feed");
        if (response.success) {
            const items: Status[] | null =
                response.success && response.items
                ? response.items.map((dto: StatusDTO) => Status.fromDto(dto) as Status)
                : null;
            if (items == null) {
                throw new Error(`No feed items found`);
            } else {
                return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async getMoreStoryItems(
        request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            PagedStatusItemRequest,
            PagedStatusItemResponse
        >(request, "/status/get-stories");
        if (response.success) {
            const items: Status[] | null =
                response.success && response.items
                ? response.items.map((dto: StatusDTO) => Status.fromDto(dto) as Status)
                : null;
            if (items == null) {
                throw new Error(`No story items found`);
            } else {
                return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async postStatus(
        request: PostStatusRequest
    ): Promise<void> {
        const response = await this.clientCommunicator.doPost<
            PostStatusRequest,
            TweeterResponse
        >(request, "/status/post-status");
        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }   

    public async getUser(
        request: GetUserRequest
    ): Promise<User> {
        const response = await this.clientCommunicator.doPost<
            GetUserRequest,
            GetUserResponse
        >(request, "/user/get-user");
        if (response.success) {
            const user: User | null =
                response.success && response.user
                ? User.fromDto(response.user)
                : null;
            if (user == null) {
                throw new Error(`No user found`);
            } else {
                return user;
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async register(
        request: RegisterUserRequest
    ): Promise<[User, AuthToken]> {
        console.log("REGISTERINg", request);
        const response = await this.clientCommunicator.doPost<
            RegisterUserRequest,
            UserEntryResponse
        >(request, "/user/register-user");
        if (response.success) {
            const userData: [User, AuthToken] | null =
                response.success && response.data
                ? [User.fromDto(response.data[0])!, AuthToken.fromDto(response.data[1])!]
                : null;
            console.log("REGISTER--",response, userData);

            if (userData == null) {
                throw new Error(`Invalid registration`);
            } else {
                return userData;
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async login(
        request: LoginUserRequest
    ): Promise<[User, AuthToken]> {
        const response = await this.clientCommunicator.doPost<
            LoginUserRequest,
            UserEntryResponse
        >(request, "/user/login-user");
        if (response.success) {
            const userData: [User, AuthToken] | null =
                response.success && response.data
                ? [User.fromDto(response.data[0])!, AuthToken.fromDto(response.data[1])!]
                : null;
            if (userData == null) {
                throw new Error(`Invalid alias or password`);
            } else {
                return [User.fromDto(response.data[0])!, AuthToken.fromDto(response.data[1])];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }

    public async logout(request: LogoutUserRequest): Promise<void> {
        const response = await this.clientCommunicator.doPost<
            LogoutUserRequest,
            TweeterResponse
        >(request, "/user/logout-user");
        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? "Unknown error");
        }
    }
}