import schedule from "node-schedule";
import { crawl } from "./hermes.js";

schedule.scheduleJob("00 30 10 * * 4", async function() {
    crawl().catch(error=>console.log(error))
});
