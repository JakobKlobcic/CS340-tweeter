import { StatusDTO } from "tweeter-shared";
import { BaseDAO } from "./BaseDAO";
import { PutCommand, QueryCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

export class FeedDAO extends BaseDAO{
    constructor() {
        super("feed");
    }

    async createBatch(post: StatusDTO, ids: string[]): Promise<void> {
        if (ids.length > 25) {
            throw new Error("The number of aliases cannot exceed 25.");
        }

        const batch = ids.map(id => ({
            PutRequest: {
                Item: {
                    ...post,
                    receiver_alias: id
                },
            },
        }));

        const params = {
            RequestItems: {
                [this.TABLE_NAME]: batch,
            },
        };

        try {
            await this.ddbDocClient.send(new BatchWriteCommand(params));
        } catch (err) {
            console.error("[Internal Server Error]: Unable to insert batch. Error JSON: ", JSON.stringify(err, null, 2));
            throw new Error("Batch write failed");
        }
    }

    async create(data: StatusDTO, receiverAlias: string): Promise<void>{
        var newData:any = data;
        newData["receiver_alias"] = receiverAlias;
        const params = {
            TableName: this.TABLE_NAME,
            Item: newData
        };
        try {
            await this.ddbDocClient.send(new PutCommand(params));
        } catch (err) {
            throw Error("[Internal Server Error]: Unable to insert item. Error JSON: "+JSON.stringify(err, null, 2)); 
        }
    }

    async getMultiple(alias: string, pageSize: number, lastItem:any): Promise<StatusDTO[]>{
        var newLastItem: StatusDTO | undefined = undefined;
        if( lastItem ){
            newLastItem = lastItem;
        }
        try {
            const command = new QueryCommand({
              TableName: this.TABLE_NAME,
              KeyConditionExpression: "receiver_alias = :val",
              ExpressionAttributeValues: {
                ":val": alias,
              },
              ScanIndexForward: false,
              Limit: pageSize,
              ExclusiveStartKey: newLastItem
            });
     
            const response = await this.ddbDocClient.send(command);
            return response.Items as StatusDTO[];
        } catch (error) {
            throw Error("[Internal Server Error]:  "+JSON.stringify(error, null, 2));
        }
    }
}