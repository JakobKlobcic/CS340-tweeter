import { AuthTokenDTO, UserDTO } from "tweeter-shared";
import { UserDAO, UserDB } from "../dao/UserDAO";
import { SessionDAO } from "../dao/SessionDAO";
import { S3DAO } from "../dao/S3DAO";
import { DAOFactory } from "../factory/DAOFactory";




export class UserService{
    private userDAO: UserDAO;
    private sessionDAO: SessionDAO;
    private s3DAO: S3DAO;

    constructor(daoFactory: DAOFactory) {
        this.userDAO = daoFactory.getUserDAO();
        this.sessionDAO = daoFactory.getSessionDAO();
        this.s3DAO = daoFactory.getS3DAO();
    }

    public async getUser (
        authToken: string,
        alias: string
    ): Promise<UserDTO | null> {
        // TODO: authenticate token, get user from alias
        if( ! this.sessionDAO.tokenIsValid(authToken) ){
            throw new Error("[Auth Error]: Invalid token");
        }

        const user:UserDB|null = await this.userDAO.get(alias);
        if(!user){
            return null;
        }

        const userDto:UserDTO = {
            firstName:user.firstName && user.firstName,
            lastName:user.lastName && user.lastName,
            alias:user.alias && user.alias,
            imageUrl:user.imageUrl && user.imageUrl,
        }
        return userDto
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: string,
        imageFileExtension: string
    ): Promise<[UserDTO, AuthTokenDTO]>{  
        
        
        const imageUrl = await this.s3DAO.upload(userImageBytes, alias, imageFileExtension);
        try{
            await this.userDAO.create({
                firstName: firstName,
                lastName: lastName,
                alias: alias,
                password: password,
                imageUrl: imageUrl
            })
        }catch(err){
            throw new Error("[Internal Server Error]: Unable to register user. Error JSON: "+JSON.stringify(err, null, 2));
        }
        const user:UserDTO = {
            firstName,
            lastName,
            alias,
            imageUrl,
        }
        const authToken = await this.sessionDAO.create(alias);

        return [user, authToken];
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[UserDTO, AuthTokenDTO]>{
        const user: UserDB = await this.userDAO.get(alias);

        if ( !user ) {
            throw new Error("[Auth Error]: Invalid alias or password");
        }
        if( user.password !== password ) {
            throw new Error("[Auth Error]: Invalid alias or password");
        }
    
        const authToken = await this.sessionDAO.create(alias);

        const userDTO: UserDTO = {
            firstName: user.firstName,
            lastName: user.lastName,
            alias: user.alias,
            imageUrl: user.imageUrl
        };
        return [userDTO, authToken]; 
    };

    public async logout(authToken: string): Promise<void>{
        await this.sessionDAO.delete(authToken);
    };
}