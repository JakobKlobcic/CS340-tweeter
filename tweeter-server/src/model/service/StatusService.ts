import { FakeData, Status, StatusDTO, User } from "tweeter-shared";
export class StatusService{
    public async loadMoreStoryItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]>{
        // TODO: Replace with the result of calling server
        return this.getFakeStatuses(lastItem, pageSize);
    };
    public async loadMoreFeedItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]>{
        // TODO: Replace with the result of calling server
        return this.getFakeStatuses(lastItem, pageSize);
    };

    public async getFakeStatuses(lastItem: StatusDTO | null, pageSize: number): Promise<[StatusDTO[], boolean]>{
        const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDto(lastItem), pageSize);
        const dtos = items.map((user) => user.dto);
        return [dtos, hasMore];
    }
}