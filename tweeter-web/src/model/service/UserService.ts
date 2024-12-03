import { User, AuthToken } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../../network/ServerFacade";

export class UserService{
    private serverFacade: ServerFacade = new ServerFacade();
    
    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return await this.serverFacade.getUser({authToken:authToken.token, alias});
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
    
        return await this.serverFacade.register({
            firstName, 
            lastName, 
            alias, 
            password, 
            userImageBytes, //TODO becomes string
            imageFileExtension
        });
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]>{    
        return await this.serverFacade.login({alias, password});
    };

    public async logout(authToken: AuthToken): Promise<void>{
        return await this.serverFacade.logout({authToken:authToken.token});
    };
}