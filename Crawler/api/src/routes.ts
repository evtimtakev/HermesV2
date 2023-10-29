import axios from "axios";
import smc from "../../social-media-crawler/index.js"
const { crawlSocialMedia } = smc;

const PREDICT_API_URL = "http://127.0.0.1:5000/predict"

const SOCIAL_MEDIA_FILTERS = {
    redit: {
        searchTerms: [],
        filterAmount: 1,
        filterUnit: "w"
    },
    stackoverflow: {
        searchTerms: [],
        filterAmount: 1,
        filterUnit: "w"
    },
    twitter: {
        searchTerms: [],
    }
}

export const getSocialMediaData = async (req: any, res: any) => {

    try {
        const socialNetworks = req.body;
        const data = await crawlSocialMedia(socialNetworks);

        res.send(JSON.stringify(data));
    } catch (e) {
        res.status(500).send(e);
    }
}
