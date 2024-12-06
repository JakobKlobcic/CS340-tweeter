import { StatusDTO } from "tweeter-shared";
import { SQSAccess } from "./SQSAccess";
import { SessionDAO } from "../dao/SessionDAO";

export class PostHandler{
    private sqsAccess: SQSAccess;

    constructor(){
        this.sqsAccess = new SQSAccess();
    }

    public async postStatus(
        newStatus: StatusDTO
    ): Promise<void>{
        try{
            await this.sqsAccess.writeToPostQ(newStatus);
        }catch(err){
            throw new Error("[Internal Server Error]: Unable to post status. Error JSON: "+JSON.stringify(err, null, 2));
        }
    };
}