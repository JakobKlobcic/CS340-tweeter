import { FollowsDAO } from "../../model/dao/FollowsDAO";
import { SQSAccess } from "../../model/sqs/SQSAccess";

export const handler = async function (event: any) {
    console.log("FollowFetcher event size = " + event.Records.length);
    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        const post = JSON.parse(body);
        console.log(post);
        const followsDAO = new FollowsDAO();
        const sqsAccess = new SQSAccess();
        const pageSize = 100;
        const batchSize = 25;
        
        let lastItem = null;

        while (true) {
            const followers = await followsDAO.getFollowers(post.user.alias, pageSize, lastItem);
            
            // Loop through followers in batches of 25
            for (let j = 0; j < followers.length; j += batchSize) {
                const batch = followers.slice(j, j + batchSize);
                console.log(`Adding batch of ${batch.length} followers to jobs queue`);
                console.log(`Batch: ${JSON.stringify(batch)}`);
                await sqsAccess.writeToJobsQ(post, batch);
            }

            if (followers.length < pageSize) {
                break;
            }
            
            lastItem = {follower_alias: followers[pageSize - 1], followee_alias: post.user.alias};
        }
    }
    return null;
};