import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export class S3DAO {
    async upload(base64Image: string, alias:string, extension: string): Promise<string> {
        try {
            const client = new S3Client({ region: "us-west-2" });
    
            // Decode the base64 image
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
            const binaryData = Buffer.from(base64Data, 'base64');
    
            // Set the parameters for the S3 upload
            const params = {
                Body: binaryData,
                Bucket: "tweeter-bucket-cs340",
                Key: alias + "." + extension,
                ContentType: `image/${extension}`,
                ContentEncoding: 'base64'
            };
    
            const command = new PutObjectCommand(params);
            const response = await client.send(command);
    
            console.log("File upload successful with ", response.$metadata.httpStatusCode);
            return "https://tweeter-bucket-cs340.s3-us-west-2.amazonaws.com/" + alias + "." + extension;
        } catch (error) {
            throw Error("[Internal Server Error]: "+JSON.stringify(error, null, 2));
        }
    }
}