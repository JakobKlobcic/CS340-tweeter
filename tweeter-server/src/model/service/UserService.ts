import { FakeData, User } from "tweeter-shared";
import { AuthTokenDTO, UserDTO, StatusDTO } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService{
    public async getUser (
        authToken: string,
        alias: string
    ): Promise<UserDTO | null> {
        // TODO: Replace with the result of calling server
        const user = FakeData.instance.findUserByAlias(alias)
        return user && user.dto
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[UserDTO, AuthTokenDTO]>{    
        // TODO: Replace with the result of calling the server
        const user: UserDTO|null = FakeData.instance.firstUser!.dto;
        const authToken = FakeData.instance.authToken

        if (user === null) {
          throw new Error("Invalid registration");
        }

        

        return [user, authToken!.dto];
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[UserDTO, AuthTokenDTO]>{
        // TODO: Replace with the result of calling the server
        const user: UserDTO|null = FakeData.instance.firstUser!.dto;
        const authToken = FakeData.instance.authToken
    
        if (user === null) {
          throw new Error("Invalid alias or password");
        }
    
        return [user, authToken!.dto];
    };

    public async logout(authToken: string): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}