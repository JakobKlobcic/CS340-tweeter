import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { DynamoDBDAOFactory } from "../../model/factory/DynamoDBDAOFactory";
export const handler = async (request: PagedUserItemRequest): Promise<PagedUserItemResponse> => {
    const daoFactory = new DynamoDBDAOFactory();
    const followService = new FollowService(daoFactory);
    const [items, hasMore] = await followService.loadMoreFollowees(request.token, request.alias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}