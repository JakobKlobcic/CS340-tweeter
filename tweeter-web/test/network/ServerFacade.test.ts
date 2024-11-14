import "isomorphic-fetch";
import { Buffer } from "buffer";
import { ServerFacade } from "../../src/network/ServerFacade";
import {
  RegisterUserRequest,
  PagedUserItemRequest,
  FollowCountRequest,
  AuthToken,
  User,
  ChangeFollowStatusRequest,
  GetUserRequest,
  IsFollowerStatusRequest,
  LoginUserRequest,
  LogoutUserRequest,
  PagedStatusItemRequest,
  PostStatusRequest,
  Status,
} from "tweeter-shared";

describe("ServerFacade Integration Tests", () => {
  const serverFacade = new ServerFacade();
  const testAlias = "@allen";
  const testUser: User =new User(
    "John", "Wick", testAlias, "http://image.url/johnwick.png")
    

  it("should register a new user", async () => {
    const request: RegisterUserRequest = {
      firstName: "John",
      lastName: "Wick",
      alias: testAlias,
      password: "babayaga",
      userImageBytes: Buffer.from([]),
      imageFileExtension: "png"
    };

    const [user, authToken] = await serverFacade.register(request);
    expect(user).toBeInstanceOf(User);
    expect(authToken).toBeInstanceOf(AuthToken);
    expect(user.alias).toBe(request.alias);
  });

  it("should get more followers", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: PagedUserItemRequest = {
      token: authToken.token,
      alias: testAlias,
      pageSize: 10,
      lastItem: null
    };

    const [followers, hasMore] = await serverFacade.getMoreFollowers(request);
    expect(Array.isArray(followers)).toBeTruthy();
    expect(typeof hasMore === 'boolean').toBeTruthy();
  });

  it("should get more followees", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: PagedUserItemRequest = {
      token: authToken.token,
      alias: testAlias,
      pageSize: 10,
      lastItem: null
    };

    const [followees, hasMore] = await serverFacade.getMoreFollowees(request);
    expect(Array.isArray(followees)).toBeTruthy();
    expect(typeof hasMore === 'boolean').toBeTruthy();
  });

  it("should get follower count", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: FollowCountRequest = {
      authToken: authToken.token,
      user: testUser
    };

    const followerCount = await serverFacade.getFollowerCount(request);
    expect(typeof followerCount).toBe("number");
  });

  it("should get followee count", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: FollowCountRequest = {
      authToken: authToken.token,
      user: testUser
    };

    const followeeCount = await serverFacade.getFolloweeCount(request);
    expect(typeof followeeCount).toBe("number");
  });

  it("should follow a user", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: ChangeFollowStatusRequest = {
      authToken: authToken.token,
      affectedUser: testUser
    };

    await expect(serverFacade.follow(request)).resolves.not.toThrow();
  });

  it("should unfollow a user", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: ChangeFollowStatusRequest = {
      authToken: authToken.token,
      affectedUser: testUser
    };

    await expect(serverFacade.unfollow(request)).resolves.not.toThrow();
  });

  it("should get user details", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: GetUserRequest = {
      authToken: authToken.token,
      alias: testAlias
    };

    const user = await serverFacade.getUser(request);
    expect(user).toBeInstanceOf(User);
  });

  it("should check if a user is a follower", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: IsFollowerStatusRequest = {
      authToken: authToken.token,
      user: testUser,
      selectedUser: testUser
    };

    const isFollower = await serverFacade.getIsFollowerStatus(request);
    expect(typeof isFollower).toBe("boolean");
  });

  it("should log in a user", async () => {
    const request: LoginUserRequest = {
      alias: testAlias,
      password: "babayaga"
    };

    const [user, authToken] = await serverFacade.login(request);
    expect(user).toBeInstanceOf(User);
    expect(authToken).toBeInstanceOf(AuthToken);
  });

  it("should log out a user", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: LogoutUserRequest = {
      authToken: authToken.token
    };

    await expect(serverFacade.logout(request)).resolves.not.toThrow();
  });

  it("should post a status", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const status: Status = 
      new Status("I'm back.",testUser, Date.now())
    
    const request: PostStatusRequest = {
      authToken: authToken.token,
      newStatus: status.dto
    };

    await expect(serverFacade.postStatus(request)).resolves.not.toThrow();
  });

  it("should get more feed items", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: PagedStatusItemRequest = {
      authToken: authToken.token,
      userAlias: testAlias,
      pageSize: 10,
      lastItem: null
    };

    const [statuses, hasMore] = await serverFacade.getMoreFeedItems(request);
    expect(Array.isArray(statuses)).toBeTruthy();
    expect(typeof hasMore === "boolean").toBeTruthy();
  });

  it("should get more story items", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const request: PagedStatusItemRequest = {
      authToken: authToken.token,
      userAlias: testAlias,
      pageSize: 10,
      lastItem: null
    };

    const [statuses, hasMore] = await serverFacade.getMoreStoryItems(request);
    expect(Array.isArray(statuses)).toBeTruthy();
    expect(typeof hasMore === "boolean").toBeTruthy();
  });
});