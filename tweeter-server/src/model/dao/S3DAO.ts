import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export class S3DAO {
    private static _instance: S3DAO;

    static get instance() {
        if (S3DAO._instance == null) {
            S3DAO._instance = new S3DAO();
        }
        return this._instance;
    }

    async s3upload(base64Image: string, fileName:string, extension: string) {
        try {
            const client = new S3Client({ region: "us-west-2" });
    
            // Decode the base64 image
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
            const binaryData = Buffer.from(base64Data, 'base64');
    
            // Set the parameters for the S3 upload
            const params = {
                Body: binaryData,
                Bucket: "tweeter-bucket-cs340",
                Key: fileName,
                ContentType: `image/${extension}`,
                ContentEncoding: 'base64'
            };
    
            const command = new PutObjectCommand(params);
            const response = await client.send(command);
    
            console.log("File upload successful with ", response.$metadata.httpStatusCode);
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
    }
}