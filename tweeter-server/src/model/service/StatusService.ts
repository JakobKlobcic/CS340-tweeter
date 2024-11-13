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

    public async postStatus(
        authToken: string,
        newStatus: StatusDTO
    ): Promise<void>{
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
    };

    public async getFakeStatuses(lastItem: StatusDTO | null, pageSize: number): Promise<[StatusDTO[], boolean]>{
        const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDto(lastItem), pageSize);
        const dtos = items.map((user) => user.dto);
        return [dtos, hasMore];
    }
}