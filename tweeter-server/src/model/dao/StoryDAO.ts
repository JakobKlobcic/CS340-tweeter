import { StatusDTO } from "tweeter-shared";
import { BaseDAO } from "./BaseDAO";
import { PutCommand, GetCommand, DeleteCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

export class StoryDAO extends BaseDAO{
    private static _instance: StoryDAO;

    constructor() {
        super("story");
    }

    static get instance() {
        if (StoryDAO._instance == null) {
            StoryDAO._instance = new StoryDAO();
        }
        return this._instance;
    }

    async create(data: StatusDTO): Promise<void>{
        var newData:any = data;
        newData["author_alias"] = newData.user.alias;

        const params = {
            TableName: this.TABLE_NAME,
            Item: newData
        };
        console.log("STORYDAO--", params);
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
              KeyConditionExpression: "author_alias = :val",
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