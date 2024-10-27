//1. When first rendered the Post Status and Clear buttons are both disabled.
//2. Both buttons are enabled when the text field has text.
//3. Both buttons are disabled when the text field is cleared.
//4. The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.
import { AuthToken, User } from "tweeter-shared";
import useUserInfoHook from "../../../src/components/userInfo/UserInfoHook";
import { MemoryRouter } from "react-router-dom";
import { PostStatusPresenter } from "../../../src/presenters/PostStatusPresenter";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import { instance, mock, verify, anything } from "ts-mockito";
import React from "react";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));      

  describe("PostStatus", () => {
    beforeAll(() => {
        const mockUserInstance: User = new User("John", "Wick", "@johnwick", "image");
        const mockAuthTokenInstance: AuthToken = new AuthToken("token", Date.now());;
        
        (useUserInfoHook as jest.Mock).mockReturnValue({
            currentUser: mockUserInstance,
            authToken: mockAuthTokenInstance,
        });      
    });

    it("starts with the Post Status and Clear buttons disabled", () => {
        const {postStatusButton, clearStatusButton} = renderPostStatusAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("enables the Post Status and Clear buttons when the text field has text", async () => {
        const {postStatusButton, clearStatusButton, postField, user} = renderPostStatusAndGetElements();

        await user.type(postField, "post");

        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
    });

    it("disables the Post Status and Clear buttons when the text field is cleared", async () => {
        const {postStatusButton, clearStatusButton, postField, user} = renderPostStatusAndGetElements();

        await user.type(postField, "post");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();

        await user.clear(postField);
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("calls the presenter's postStatus method with correct parameters when the Post Status button is pressed", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const post = "post";
        const {currentUser, authToken} = useUserInfoHook();

        const {postStatusButton, postField, user} = renderPostStatusAndGetElements(mockPresenterInstance);

        await user.type(postField, post);
        await user.click(postStatusButton);

        verify(mockPresenter.submitPost(anything(), currentUser!, authToken!)).once();
    });

});

const renderPostStatus = (presenter?: PostStatusPresenter) =>{
    return render(
        <MemoryRouter>
            {!!presenter ?
                <PostStatus presenter={presenter}/>
                :
                <PostStatus/>
            }
        </MemoryRouter>
    );
}

const renderPostStatusAndGetElements = (presenter?:PostStatusPresenter) =>{
    const user = userEvent.setup();

    renderPostStatus(presenter);

    const postStatusButton = screen.getByRole("button", {name: /Post Status/i});
    const clearStatusButton = screen.getByRole("button", {name: /Clear/i});
    const postField = screen.getByLabelText("post_field");    

    return {postStatusButton, clearStatusButton, postField, user};
}