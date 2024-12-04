import { StatusDTO } from "tweeter-shared";
import { BaseDAO } from "./BaseDAO";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export class FeedDAO extends BaseDAO{
    private static _instance: FeedDAO;
    constructor() {
        super("feed");
    }

    static get instance() {
        if (FeedDAO._instance == null) {
            FeedDAO._instance = new FeedDAO();
        }
        return this._instance;
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

    async getMultiple(alias: string, pageSize: number, lastItem:StatusDTO|null): Promise<StatusDTO[]>{
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