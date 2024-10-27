//1. When first rendered the sign-in button is disabled.
//2. The sign-in button is enabled when both the alias and password fields have text.
//3. The sign-in button is disabled if either the alias or password field is cleared.
//4. The presenter's login method is called with correct parameters when the sign-in button is pressed.
import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { instance, mock, verify } from "ts-mockito";
import { LoginPresenter } from "../../../../src/presenters/LoginPresenter";
import "@testing-library/jest-dom"

library.add(fab);


describe("Login", () => {   
    it("starts with  the sign-in button is disabled", () => {
        const {signInButton} = renderLoginAndGetElements("/");

        expect(signInButton).toBeDisabled();
    });

    it("enables the sign-in button when both the alias and password fields have text", async () => {
        const {signInButton, aliasField, passwordField, user} = renderLoginAndGetElements("/");

        await user.type(aliasField, "alias");
        await user.type(passwordField, "password");

        expect(signInButton).toBeEnabled();
    });

    it("disables the sign-in button if either the alias or password field is cleared", async () => {
        const {signInButton, aliasField, passwordField, user} = renderLoginAndGetElements("/");

        await user.type(aliasField, "alias");
        await user.type(passwordField, "password");
        expect(signInButton).toBeEnabled();

        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();

        await user.type(aliasField, "alias");
        expect(signInButton).toBeEnabled();

        await user.clear(passwordField);
        expect(signInButton).toBeDisabled();
    });

    it("calls the presenter's login method with correct parameters when the sign-in button is pressed", async () => {
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const originalUrl = "www.example.com";
        const alias = "@alias";
        const password = "password";

        const {signInButton, aliasField, passwordField, user} = renderLoginAndGetElements(originalUrl, mockPresenterInstance);

        await user.type(aliasField, alias);
        await user.type(passwordField, password);

        await user.click(signInButton);

        verify(mockPresenter.doLogin(alias, password, false)).once();
    });
});

const renderLogin = (originalUrl:string, presenter?: LoginPresenter) =>{
    return render(
        <MemoryRouter>
            {!!presenter ?
                <Login originalUrl={originalUrl} presenter={presenter}/>
                :
                <Login originalUrl={originalUrl}/>
            }
        </MemoryRouter>
    );
}

const renderLoginAndGetElements = (originalUrl:string, presenter?:LoginPresenter) =>{
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    const signInButton = screen.getByRole("button", {name: /Sign In/i});
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    return {signInButton, aliasField, passwordField, user};
}