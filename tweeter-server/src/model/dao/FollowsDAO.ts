import { BaseDAO } from "./BaseDAO";
import { PutCommand, GetCommand, DeleteCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

export interface FollowsDTO {
    follower_alias: string;
    followee_alias: string;
}
export class FollowsDAO extends BaseDAO{
    constructor() {
        super("follows");
    }   

    async getFolloweeCount(alias: string): Promise<number | undefined>{
        try {
            const command = new ScanCommand({
              TableName: this.TABLE_NAME,
              FilterExpression: "followee_alias = :val",
              ExpressionAttributeValues: {
                ":val": alias,
              },
              Select: "COUNT"
            });
     
            const response = await this.ddbDocClient.send(command);
            return response.Count;
        } catch (error) {
            throw Error("[Internal Server Error]: "+JSON.stringify(error, null, 2));
        }
    }

    async getFollowerCount(alias: string): Promise<number | undefined>{
        try {
            const command = new ScanCommand({
              TableName: this.TABLE_NAME,
              FilterExpression: "follower_alias = :val",
              ExpressionAttributeValues: {
                ":val": alias,
              },
              Select: "COUNT"
            });
     
            const response = await this.ddbDocClient.send(command);
            return response.Count;
        } catch (error) {
            throw Error("[Internal Server Error]: "+JSON.stringify(error, null, 2));
        }
    }

    async create(data: FollowsDTO): Promise<void>{
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

    async get(data: FollowsDTO): Promise<FollowsDTO>{
        const params = {
            TableName: this.TABLE_NAME,
            Key: data
        };

        try {
            const follows = await this.ddbDocClient.send(new GetCommand(params));
            console.log("Got Item:", JSON.stringify(follows, null, 2));
            return follows.Item as FollowsDTO;
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to get item. Error JSON: "+JSON.stringify(err, null, 2));
        }
    }

    async getFollowers(alias: string, pageSize: number, lastItem?:any): Promise<string[]>{
        let params: any= {
            TableName: this.TABLE_NAME,
            IndexName: "followee_alias-index",
            KeyConditionExpression: "followee_alias = :followee_alias",
            ExpressionAttributeValues: {
                ":followee_alias": alias
            },
            ProjectionExpression: "follower_alias", // Filtering to only get `follower_alias` fields
            Limit: pageSize,
        }
        if (lastItem) {
            params.ExclusiveStartKey = lastItem;
        }

        try {
            const queryCommand = new QueryCommand(params);
            const queryResponse = await this.ddbDocClient.send(queryCommand);
            return queryResponse.Items?.map(item => item.follower_alias) || [];
        } catch (error) {
            console.error("[Internal Server Error]: Error querying followees:", error);
            throw error;
        }
    }

   async getFollowees(alias: string, pageSize: number, lastItem?: any): Promise<string[]> {
        let params: any = {
            TableName: this.TABLE_NAME,
            KeyConditionExpression: "follower_alias = :follower_alias",
            ExpressionAttributeValues: {
                ":follower_alias": alias
            },
            Limit: pageSize
        }
        if (lastItem) {
            params.ExclusiveStartKey = lastItem;
        }

        try {
            const queryCommand = new QueryCommand(params);
            const queryResponse = await this.ddbDocClient.send(queryCommand);
            return queryResponse.Items?.map(item => item.followee_alias) || [];
        } catch (error) {
            console.error("[Internal Server Error]: Error querying followees:", error);
            throw error;
        }
    }

    async delete(data: FollowsDTO): Promise<void>{
        const params = {
            TableName: this.TABLE_NAME,
            Key: data
        };

        try {
            await this.ddbDocClient.send(new DeleteCommand(params));
            console.log("Item deleted:", params.Key);
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to delete item. Error JSON: "+JSON.stringify(err, null, 2));
        }
    }
}