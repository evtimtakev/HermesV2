import axios from "axios";
import smc from "../../social-media-crawler/index.js"
const { crawlSocialMedia } = smc;

const PREDICT_API_URL = "http://127.0.0.1:5000/predict"

export const getSocialMediaData = async (req: any, res: any) => {

    try {
        const data = await crawlSocialMedia();

        const decoratedData = {
            socials: []
        }

        res.send(JSON.stringify(data));
    } catch (e) {
        res.status(500).send(e);
    }
}

export const classify = async (req: any, res: any) => {

    try {

        const { prm , filter, content} = req.body;

        const response = await axios.post(PREDICT_API_URL, {
            "prm": prm,
            "filter": filter,
            "content": content
        })

        res.send(JSON.stringify(response.data));
    }
    catch (e) {
        res.status(500).send(JSON.stringify(e));
    }
}
