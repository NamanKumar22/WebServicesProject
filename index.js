// this is a https web-service
// const https = require("https");

// const express = require("express");
// const startUp = require("./routes/startup");

import https from "https";
import fs from "fs";
import express from "express";
import * as dotenv from 'dotenv'
import  startUp  from "./routes/startUp.js";
//import { getLoggerInstance } from "./logger.js";

const app = express();
const port = 8080;

//const logger = getLoggerInstance();
dotenv.config();

const httpsOptions = {
    key: fs.readFileSync("./key.pem"), // private key for the server (required)
    cert: fs.readFileSync("./cert.pem"), // certificate for the server (required)
};
const server = https.createServer(httpsOptions, app);

app.use(express.json());
app.use("/", startUp);


server.listen(port, () => {
    // logger.info(`Server Listening on port ${port}
    console.log(`Server Listening on port ${port}`)
});
