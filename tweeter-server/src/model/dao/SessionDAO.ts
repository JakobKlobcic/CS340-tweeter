import { BaseDAO } from "./BaseDAO";
import { PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { AuthTokenDTO } from "tweeter-shared";
import { v4 as uuidv4 } from 'uuid';

interface SessionDTO {
    authtoken: string,
    alias:string,
    timestamp: number
}
export class SessionDAO extends BaseDAO{
    constructor() {
        super("session");
    }

    async create(alias: string): Promise<AuthTokenDTO>{
        const session = {
            authtoken: uuidv4(),
            alias: alias,
            timestamp: Date.now()
        }
        const params = {
            TableName: this.TABLE_NAME,
            Item: session
        };

        try {
            await this.ddbDocClient.send(new PutCommand(params));
            console.log("Item inserted:", session);
            return {token: session.authtoken, timestamp: session.timestamp};
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to insert item. Error JSON: "+JSON.stringify(err, null, 2)); 
        }
    }

    async get(key: string): Promise<SessionDTO>{
        const params = {
            TableName: this.TABLE_NAME,
            Key: {authtoken: key}
        };

        try {
            const session = await this.ddbDocClient.send(new GetCommand(params));
            console.log("Got Item:", JSON.stringify(session, null, 2));
            return session.Item as SessionDTO;
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to get item. Error JSON: "+JSON.stringify(err, null, 2));
        }
    }

    async delete(authtoken: string): Promise<void>{
        const params = {
            TableName: this.TABLE_NAME,
            Key: {authtoken: authtoken}
        };

        try {
            await this.ddbDocClient.send(new DeleteCommand(params));
            console.log("Item deleted:", params.Key);
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to delete item. Error JSON: "+JSON.stringify(err, null, 2));
        }
    }

    async tokenIsValid(authtoken: string): Promise<boolean>{
        var session;
        try{
            session = await this.get(authtoken);  
        }catch(err){
            return false
        }
        if (session === null) {
            return false;
        }
        return true;
    }
}