//1. The presenter tells the view to display a logging out message.
//2. The presenter calls logout on the user service with the correct auth token.
//3. When the logout is successful, the presenter tells the view to clear the last info message and clear the user info.
//4. When the logout is not successful, the presenter tells the view to display an error message and does not tell it to clear the last info message or clear the user info.

import {AuthToken} from "tweeter-shared";
import {NavBarPresenter, NavBarView} from "../../src/presenters/NavBarPresenter";
import { instance, mock, verify, spy, when, anything, capture } from "ts-mockito";
import {UserService} from "../../src/model/service/UserService";

describe("NavBarPresenter", () => {
    let mockView: NavBarView;
    let presenter: NavBarPresenter;
    let mockUserService: UserService;

    const authToken: AuthToken = new AuthToken("token", Date.now());

    beforeEach(() => {
        mockView = mock<NavBarView>();
        const mockViewInstance = instance(mockView);

        const presenterSpy = spy(new NavBarPresenter(mockViewInstance));
        presenter = instance(presenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(presenterSpy.userService).thenReturn(mockUserServiceInstance);
    });

    it("tells the view to display a logout message", async () => {
        await presenter.logOut(authToken);
        verify(mockView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the user service with the correct auth token", async () => {
        await presenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();

        //verify(mockUserService.logout(anything())).once();
        //let [capturedAuthToken] = capture(mockUserService.logout).last()
        //expect(capturedAuthToken).toEqual(authToken);
    });

    it("tells the view to clear the last info message, clear the user info", async () => {
        await presenter.logOut(authToken);
        verify(mockView.clearLastInfoMessage()).once();
        verify(mockView.clearUserInfo()).once();
    });

    it("tells the view to display an error message when the logout is not successful", async () => {
        when(mockUserService.logout(authToken)).thenThrow(new Error("An error occurred"));
        await presenter.logOut(authToken);
        verify(mockView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();

        
        verify(mockView.clearLastInfoMessage()).never();
        verify(mockView.clearUserInfo()).never();
    });
});