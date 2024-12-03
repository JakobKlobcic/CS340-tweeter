import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export abstract class BaseDAO{
  protected client: DynamoDBClient;
  protected ddbDocClient: DynamoDBDocumentClient;
  protected TABLE_NAME: string;

  constructor( tableName: string) {
    this.client = new DynamoDBClient({ region: "us-west-2" });
    this.ddbDocClient = DynamoDBDocumentClient.from(this.client);
    this.TABLE_NAME = tableName;
  }
}