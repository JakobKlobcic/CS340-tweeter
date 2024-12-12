import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand, BatchWriteCommandInput, BatchWriteCommandOutput } from "@aws-sdk/lib-dynamodb";
import * as bcrypt from "bcryptjs";

// User class definition
class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public alias: string,
    public password: string,
    public imageUrl: string
  ) {}
}

// FillUserTableDao class for interacting with DynamoDB
class FillUserTableDao {
  private readonly tableName = "user";
  private readonly userAliasAttribute = "alias";
  private readonly userFirstNameAttribute = "firstName";
  private readonly userLastNameAttribute = "lastName";
  private readonly userImageUrlAttribute = "imageUrl";
  private readonly passwordHashAttribute = "password";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  async createUsers(userList: User[]) {
    if (userList.length === 0) {
      console.log("No users to create.");
      return;
    }

    const hashedPasswordList = await Promise.all(userList.map(user => bcrypt.hash(user.password, 10)));

    const params: BatchWriteCommandInput = {
      RequestItems: {
        [this.tableName]: userList.map((user, index) => ({
          PutRequest: {
            Item: {
              [this.userAliasAttribute]: user.alias,
              [this.userFirstNameAttribute]: user.firstName,
              [this.userLastNameAttribute]: user.lastName,
              [this.userImageUrlAttribute]: user.imageUrl,
              [this.passwordHashAttribute]: hashedPasswordList[index]
            }
          }
        }))
      }
    };

    try {
      let response = await this.client.send(new BatchWriteCommand(params));
      await this.putUnprocessedItems(response, params);
    } catch (err) {
      console.error(`Error while batch writing users: ${err}`);
    }
  }

  private async putUnprocessedItems(response: BatchWriteCommandOutput, params: BatchWriteCommandInput) {
    let delay = 10;
    let attempts = 0;
    while (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
      attempts++;
      if (attempts > 1) {
        await new Promise(res => setTimeout(res, delay));
        if (delay < 1000) delay += 100;
      }
      console.log(`Attempt ${attempts}. Retrying unprocessed items.`);
      params.RequestItems = response.UnprocessedItems;
      response = await this.client.send(new BatchWriteCommand(params));
    }
  }
}

// Main function to create users
async function main() {
  const numbUsersToCreate = 10000;
  const batchSize = 25;
  const users: User[] = [];

  for (let i = 1; i <= numbUsersToCreate; i++) {
    users.push(new User(
      "John",
      `Wick the ${i}`,
      `@${i}`,
      "pass",
      "john_wick.jpg"
    ));
  }

  const fillUserTableDao = new FillUserTableDao();

  for (let i = 0; i < numbUsersToCreate; i += batchSize) {
    console.log(`Creating users batch ${i + 1} to ${i + batchSize}`);
    await fillUserTableDao.createUsers(users.slice(i, i + batchSize));
  }

  console.log("All users created successfully!");
}

main().catch(console.error);