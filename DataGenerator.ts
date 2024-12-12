import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand, BatchWriteCommandInput, BatchWriteCommandOutput } from "@aws-sdk/lib-dynamodb";

// Define a simple Follow relationship class
class Follow {
  constructor(
    public followerAlias: string,
    public followeeAlias: string
  ) {}
}

// DAO for batch writing follows to DynamoDB
class FillFollowTableDao {
  private readonly tableName = "follows";
  private readonly followerAliasAttribute = "follower_alias";
  private readonly followeeAliasAttribute = "followee_alias";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  async createFollows(followList: Follow[]) {
    if (followList.length === 0) {
      console.log("No follows to create.");
      return;
    }

    const params: BatchWriteCommandInput = {
      RequestItems: {
        [this.tableName]: followList.map(follow => ({
          PutRequest: {
            Item: {
              [this.followerAliasAttribute]: follow.followerAlias,
              [this.followeeAliasAttribute]: follow.followeeAlias
            }
          }
        }))
      }
    };

    try {
      let response = await this.client.send(new BatchWriteCommand(params));
      await this.putUnprocessedItems(response, params);
    } catch (err) {
      console.error(`Error while batch writing follows: ${err}`);
    }
  }

  private async putUnprocessedItems(response: BatchWriteCommandOutput, params: BatchWriteCommandInput) {
    let delay = 300;
    let attempts = 2;
    while (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
      attempts++;
      if (attempts > 1) {
        await new Promise(res => setTimeout(res, delay));
        if (delay < 1000) delay += 100;
      }
      console.log(`Attempt ${attempts}. Retrying unprocessed follow items.`);
      params.RequestItems = response.UnprocessedItems;
      response = await this.client.send(new BatchWriteCommand(params));
    }
  }
}

// Main function to create follow relationships
async function main() {
  const numbFollowsToCreate = 10001;
  const batchSize = 25;
  const followee = "@0";
  const follows: Follow[] = [];

  for (let i = 1; i <= numbFollowsToCreate; i++) {
    follows.push(new Follow(`@${i}`, followee));
  }

  const fillFollowTableDao = new FillFollowTableDao();

  for (let i = 0; i < numbFollowsToCreate; i += batchSize) {
    console.log(`Creating follows batch ${i + 1} to ${Math.min(i + batchSize, numbFollowsToCreate)}`);
    await fillFollowTableDao.createFollows(follows.slice(i, i + batchSize));
  }

  console.log("All follows created successfully!");
}

main().catch(console.error);