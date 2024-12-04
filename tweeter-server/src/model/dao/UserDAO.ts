import { BaseDAO } from "./BaseDAO";
import { PutCommand, GetCommand, BatchGetCommand } from "@aws-sdk/lib-dynamodb";

export interface UserDB{
    firstName: string;
    lastName: string;
    alias: string;
    password: string;
    imageUrl: string;
}

export class UserDAO extends BaseDAO{
    private static _instance: UserDAO;
    constructor() {
        super("user");
    }   

    static get instance() {
        if (UserDAO._instance == null) {
            UserDAO._instance = new UserDAO();
        }
        return this._instance;
    }

    async create(data: UserDB): Promise<void>{
        const params = {
            TableName: this.TABLE_NAME,
            Item: data
        };

        try {
            await this.ddbDocClient.send(new PutCommand(params));
            console.log("Item inserted:", params.Item);
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to insert item. Error JSON: "+JSON.stringify(err, null, 2)); 
        }
    }

    async get(alias: string): Promise<UserDB>{
        const params = {
            TableName: this.TABLE_NAME,
            Key: {alias: alias}
        };

        try {
            const follows = await this.ddbDocClient.send(new GetCommand(params));
            console.log("Got Item:", JSON.stringify(follows, null, 2));
            
            return follows.Item as UserDB;
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to get item. Error JSON: "+JSON.stringify(err, null, 2));
        }
    }

    async getMultiple(aliases: string[]): Promise<UserDB[]> {
        try {
            const batchGetParams = {
                RequestItems: {
                    [this.TABLE_NAME]: {
                        Keys: aliases.map(alias => ({
                            alias: alias,
                        })),
                    },
                }
            }
        
            const batchGetResponse = await this.ddbDocClient.send(new BatchGetCommand(batchGetParams));
    
            const users = (batchGetResponse.Responses?.[this.TABLE_NAME] || []).map(item => ({
                alias: item.alias,
                firstName: item.firstName || null,
                lastName: item.lastName || null,
                imageUrl: item.imageUrl || null,
            } as UserDB));
    
            return users;
            
        } catch (error) {
            console.error("[Internal Server Error]: Error fetching followees info:", error);
        }
        return [];
    }
}