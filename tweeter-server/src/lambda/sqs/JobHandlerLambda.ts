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

        await feedDAO.createBatch(post, aliases);
    }
    return null;
};