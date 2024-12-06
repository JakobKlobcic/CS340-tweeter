import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { StatusDTO } from "tweeter-shared";


export class SQSAccess{
    private sqsClient;

    constructor(){
      this.sqsClient = new SQSClient({});
    }

    async writeToPostQ(post: StatusDTO): Promise<void>{
      const sqs_url = "https://sqs.us-west-2.amazonaws.com/183631326760/tweeter-post-q";
    
      const params = {
        MessageBody: JSON.stringify(post),
        QueueUrl: sqs_url,
      };
    
      try {
        const data = await this.sqsClient.send(new SendMessageCommand(params));
        console.log("Success, message sent. MessageID:", data.MessageId);
      } catch (err) {
        throw err;
      }
    }

    async writeToJobsQ( post: StatusDTO, aliases: string[] ): Promise<void>{
      const sqs_url = "https://sqs.us-west-2.amazonaws.com/183631326760/tweeter-jobs-q";
    
      const params = {
        MessageBody: JSON.stringify({post, aliases}),
        QueueUrl: sqs_url,
      };
    
      try {
        const data = await this.sqsClient.send(new SendMessageCommand(params));
        console.log("Success, message sent. MessageID:", data.MessageId);
      } catch (err) {
        throw err;
      }
    }
  }