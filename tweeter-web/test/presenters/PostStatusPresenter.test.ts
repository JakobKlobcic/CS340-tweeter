//1. The presenter tells the view to display a posting status message.
//2. The presenter calls postStatus on the post status service with the correct status string and auth token.
//3. When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message.
//4. When posting of the status is not successful, the presenter tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message.

import {AuthToken, User, Status} from "tweeter-shared";   
import {PostStatusPresenter, PostStatusView} from "../../src/presenters/PostStatusPresenter";
import { instance, mock, verify, spy, when, anything, capture } from "ts-mockito";
import {UserService} from "../../src/model/service/UserService";

describe("PostStatusPresenter", () => {
    let mockView: PostStatusView;
    let presenter: PostStatusPresenter;
    let mockUserService: UserService;

    const authToken: AuthToken = new AuthToken("token", Date.now());
    const post: string = "post";
    const user: User = new User("John", "Wick", "@johnwick", "image");
    const status= new Status(post, user!, Date.now());


    beforeEach(() => {
        mockView = mock<PostStatusView>();
        const mockViewInstance = instance(mockView);

        const presenterSpy = spy(new PostStatusPresenter(mockViewInstance));
        presenter = instance(presenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(presenterSpy.service).thenReturn(mockUserServiceInstance);
    });

    it("tells the view to display a posting status message", async () => {
        await presenter.submitPost(status, user, authToken);
        verify(mockView.displayInfoMessage("Posting status...", 0)).once();
    });
    

    it("calls postStatus on the post status service with the correct status string and auth token", async () => {
        await presenter.submitPost(status, user, authToken);
        verify(mockUserService.postStatus(authToken, status)).once();
    });

    it("tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
        await presenter.submitPost(status, user, authToken);
        verify(mockView.clearLastInfoMessage()).once();
        verify(mockView.setPost("")).once();
        verify(mockView.displayInfoMessage("Status posted!", 2000)).once();
    });

    it("tells the view to display an error message when the posting of the status is not successful", async () => {
        when(mockUserService.postStatus(authToken, status)).thenThrow(new Error("An error occurred"));
        await presenter.submitPost(status, user, authToken);
        verify(mockView.displayErrorMessage("Failed to post the status because of exception: An error occurred")).once();
    });
    
});