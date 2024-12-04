import { PagedStatusItemRequest, PagedStatusItemResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: PagedStatusItemRequest): Promise<PagedStatusItemResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const statusService = new StatusService(daoFactory);
    const [items, hasMore] = await statusService.loadMoreStoryItems(request.authToken, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}