import "isomorphic-fetch";
import { AuthToken, Status, User } from "tweeter-shared";
import { ServerFacade } from "../src/network/ServerFacade";
import { PostStatusPresenter, PostStatusView } from "../src/presenters/PostStatusPresenter";
import { StatusService } from "../src/model/service/StatusService";
import { instance, mock, verify } from "ts-mockito";

describe("Status Integration Test", () => {
  const serverFacade = new ServerFacade();
  let presenter: PostStatusPresenter;
  let mockView: PostStatusView;
  const statusService = new StatusService();
  let authToken: AuthToken;

  const testAlias = "@1";
  const newStatusText = "Here's a new test status!";
  const testUser: User = new User("John", "Wick the 1 ", testAlias, "http://image.url/johndoe.png");

  jest.setTimeout(10000); // Increase timeout to 10 seconds

  beforeEach(async () => {
    // Login the user to obtain an AuthToken
    const [userLoggedIn, token] = await serverFacade.login({ alias: testAlias, password: "pass" });
    authToken = token;

    // Initialize mock view
    mockView = mock<PostStatusView>();

    // Initialize PostStatusPresenter with a real service
    presenter = new PostStatusPresenter(instance(mockView));

    // Post a status
    const status = new Status(newStatusText, userLoggedIn, Date.now());
    await presenter.submitPost(status, userLoggedIn, authToken);
  });

  it("should correctly append posted status to user's story", async () => {
    // Verify that a "Successfully Posted!" message was displayed
    verify(mockView.displayInfoMessage("Status posted!", 2000)).once();

    // Retrieve user's story
    const [storyStatuses] = await statusService.loadMoreStoryItems(authToken, testAlias, 10, null);

    // Check if the newly posted status is present in user's story
    const postedStatus = storyStatuses.find(status => status.post === newStatusText && status.user.alias === testUser.alias);

    // Verify the status details
    expect(postedStatus).toBeDefined();
    expect(postedStatus!.post).toBe(newStatusText);
    expect(postedStatus!.user.alias).toBe(testUser.alias);
  });
});