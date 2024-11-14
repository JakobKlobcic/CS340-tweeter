import { AuthToken, Status, FakeData } from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";
export class StatusService{
    private serverFacade: ServerFacade = new ServerFacade();

    public async loadMoreStoryItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>{
        return await this.serverFacade.getMoreStoryItems({
            authToken:authToken.token, 
            userAlias, 
            pageSize, 
            lastItem:lastItem && lastItem.dto
        });
    };
    public async loadMoreFeedItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>{
        // TODO: Replace with the result of calling server
        return await this.serverFacade.getMoreStoryItems({
            authToken:authToken.token, 
            userAlias, 
            pageSize, 
            lastItem:lastItem && lastItem.dto
        });
    };
    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void>{
        // Pause so we can see the logging out message. Remove when connected to the server
        return await this.serverFacade.postStatus({
            authToken:authToken.token, 
            newStatus:newStatus && newStatus.dto
        });
    };

}