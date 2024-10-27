import { FakeData } from "tweeter-shared";
import { User, AuthToken, Status } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService{
    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[User, AuthToken]>{
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string =
          Buffer.from(userImageBytes).toString("base64");
    
        // TODO: Replace with the result of calling the server
        const user: User|null = FakeData.instance.firstUser;
      
        if (user === null) {
          throw new Error("Invalid registration");
        }
    
        return [user, FakeData.instance.authToken];
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]>{
        // TODO: Replace with the result of calling the server
        const user: User|null = FakeData.instance.firstUser;
    
        if (user === null) {
          throw new Error("Invalid alias or password");
        }
    
        return [user, FakeData.instance.authToken];
    };

    public async getPageOfUsers(
        lastItem: User | null, 
        pageSize: number, 
        userAlias:string): 
    Promise<[User[], boolean]>{
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
    }

    public async logout(authToken: AuthToken): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void>{
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
    };
}