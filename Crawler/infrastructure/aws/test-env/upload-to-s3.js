import dotenv from "dotenv"
dotenv.config()

import AWS from "aws-sdk";
import fs from "fs";

const BUCKET_NAME = "hermesreports";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET
});

export const uploadReportToS3 = (file) => {
    const fileContent = fs.readFileSync(file);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: "index.html",
        Body: fileContent,
        ContentType: "text/html"
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}
