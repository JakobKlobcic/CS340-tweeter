import { StatusDTO } from "tweeter-shared";
import { BaseDAO } from "./BaseDAO";
import { PutCommand, GetCommand, DeleteCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

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
        newData["author_alias"] = newData.user.alias;
        newData["receiver_alias"] = receiverAlias;

        const params = {
            TableName: this.TABLE_NAME,
            Item: newData
        };
        console.log("FEEDDAO--", params);
        try {
            await this.ddbDocClient.send(new PutCommand(params));
            console.log("Item inserted:", params.Item);
        } catch (err) {
            throw Error("Unable to insert item. Error JSON: "+JSON.stringify(err, null, 2)); 
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
            throw Error("Internal server Error: "+JSON.stringify(error, null, 2));
        }
    }
}