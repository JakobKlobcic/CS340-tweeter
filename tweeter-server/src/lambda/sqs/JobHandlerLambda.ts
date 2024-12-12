import { FeedDAO } from "../../model/dao/FeedDAO";

export const handler = async function (event: any) {
    console.log("JobHandler event size = " + event.Records.length);
    
    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        const bodyJson = JSON.parse(body);
        console.log(bodyJson);
        const post = bodyJson.post;
        const aliases = bodyJson.aliases;
        const feedDAO = new FeedDAO();

        // Chunk the aliases into batches of 25
        const chunkSize = 25;
        for (let j = 0; j < aliases.length; j += chunkSize) {
            const aliasChunk = aliases.slice(j, j + chunkSize);

            // Await the completion of each batch before proceeding
            await feedDAO.createBatch(post, aliasChunk);
        }
    }
};