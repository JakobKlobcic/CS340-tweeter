import "isomorphic-fetch";
import { StatusService } from "../../../src/model/service/StatusService";
import { AuthToken, Status } from "tweeter-shared";

describe("StatusService Integration Test", () => {
  const statusService = new StatusService();
  
  it("should retrieve story pages", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const userAlias = "@johndoe";
    const pageSize = 5;
    const lastItem: Status | null = null;

    const [statuses, hasMore] = await statusService.loadMoreStoryItems(authToken, userAlias, pageSize, lastItem);
    expect(Array.isArray(statuses)).toBeTruthy();
    expect(typeof hasMore === 'boolean').toBeTruthy();
  });
});