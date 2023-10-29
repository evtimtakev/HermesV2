"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const APP_PORT = 3000;
const app = (0, express_1.default)();
app.use((0, body_parser_1.default)());
// Define APP routes
app.post("/v1/crawler/collect/data", routes_1.getSocialMediaData);
app.listen(APP_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
});
//# sourceMappingURL=app.js.map