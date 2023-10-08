import dotenv from "dotenv"
dotenv.config()

import smc from "../../../attributes/social-media-crawler/index.js"
import brain from "../../../brain/index.js";
import { uploadReportToS3 } from "./upload-to-s3.js";

const { generatePrintReport, crawlSocialMedia } = smc;
const  { loadModel, predict } = brain;

export const crawl = async () => {
    const data = await crawlSocialMedia();
    await loadModel();

    console.log("Starting................");
    const decoratedData = {
        socials: []
    }

    for (let i=0; i <= data.socials.length -1; i++) {
        const social = data.socials[i];
        console.log("Working on predictions................");
        for (let j =0; j <= social.data.length -1; j++ ) {
            const socialData = social.data[j];
            social.data[j]["status"] = await predict(socialData.title || socialData.description || "");
        }

        decoratedData.socials.push(social);
    }
    
    generatePrintReport(decoratedData)

    if(JSON.parse(process.env.UPLOAD_TO_S3)) {
        uploadReportToS3("./index.html")
    }
}


