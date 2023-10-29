import dotenv from "dotenv"
dotenv.config()

import express from "express"
import bodyParser from "body-parser";
import { getSocialMediaData } from "./routes";

const APP_PORT = 3000;


const app = express();
app.use(bodyParser());

// Define APP routes
app.post("/v1/crawler/collect", getSocialMediaData);

app.listen(APP_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
});
