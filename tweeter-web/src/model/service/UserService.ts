import { FakeData } from "tweeter-shared";
import { User, AuthToken } from "tweeter-shared";

export class UserService{
    public async getFirstUser(): Promise<User|null>{
        return FakeData.instance.firstUser
    }

    public async getAuthToken(): Promise<AuthToken>{
        return FakeData.instance.authToken
    }

    public async getUserByAlias(userAlias: string): Promise<User|null>{
        return FakeData.instance.findUserByAlias(userAlias)
    }

    public async getPageOfUsers(
        lastItem: User | null, 
        pageSize: number, 
        userAlias:string): 
    Promise<[User[], boolean]>{
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
    }
}