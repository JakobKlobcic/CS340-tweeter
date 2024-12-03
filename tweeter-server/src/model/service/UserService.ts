import { AuthTokenDTO, UserDTO } from "tweeter-shared";
import { Buffer } from "buffer";
import { UserDAO, UserDB } from "../dao/UserDAO";
import { SessionDAO } from "../dao/SessionDAO";




export class UserService{
    public async getUser (
        authToken: string,
        alias: string
    ): Promise<UserDTO | null> {
        // TODO: authenticate token, get user from alias
        if( ! SessionDAO.instance.tokenIsValid(authToken) ){
            throw new Error("Invalid token");
        }

        const user:UserDB|null = await UserDAO.instance.get(alias);

        if(user === null){
            return null;
        }

        const userDto:UserDTO = {
            firstName:user.firstName,
            lastName:user.lastName,
            alias:user.alias,
            imageUrl:user.imageUrl,
        }
        return userDto
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[UserDTO, AuthTokenDTO]>{  
        //TODO: upload image to s3 and get the url 
        const imageUrl = "testUrl";
        try{
            await UserDAO.instance.create({
                firstName: firstName,
                lastName: lastName,
                alias: alias,
                password: password,
                imageUrl: imageUrl
            })
        }catch(err){
            throw new Error("Unable to register user. Error JSON: "+JSON.stringify(err, null, 2));
        }
        const user:UserDTO = {
            firstName,
            lastName,
            alias,
            imageUrl,
        }
        const authToken = await SessionDAO.instance.create(alias);

        return [user, authToken];
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[UserDTO, AuthTokenDTO]>{
        const user: UserDB = await UserDAO.instance.get(alias);

        if ( !user ) {
          throw new Error("Invalid alias or password");//TODO: replace with an error that will be caught by APIGateway
        }
        if( user.password !== password ) {
            throw new Error("Invalid alias or password");//TODO: replace with an error that will be caught by APIGateway
        }
    
        const authToken = await SessionDAO.instance.create(alias);

        const userDTO: UserDTO = {
            firstName: user.firstName,
            lastName: user.lastName,
            alias: user.alias,
            imageUrl: user.imageUrl
        };
        return [userDTO, authToken]; 
    };

    public async logout(authToken: string): Promise<void>{
        await SessionDAO.instance.delete(authToken);
    };
}