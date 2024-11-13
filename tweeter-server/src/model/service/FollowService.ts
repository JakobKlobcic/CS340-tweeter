import { User, FakeData, UserDTO } from "tweeter-shared";

export class FollowService{
    public async loadMoreFollowers(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        return this.getFakeUserData(lastItem, pageSize, userAlias);
    };

    public async loadMoreFollowees (
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        return this.getFakeUserData(lastItem, pageSize, userAlias);
    };

    public async getIsFollowerStatus(
        authToken: string,
        user: UserDTO,
        selectedUser: UserDTO
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    };
    
    public async getFolloweeCount (
        authToken: string,
        user: UserDTO
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweeCount(user.alias);
    };

    public async getFollowerCount(
        authToken: string,
        user: UserDTO
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowerCount(user.alias);
    };

    private async getFakeUserData(lastItem: UserDTO | null, pageSize: number, userAlias: string): Promise<[UserDTO[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => user.dto);
        return [dtos, hasMore];
    }

}