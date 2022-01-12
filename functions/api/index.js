const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const hpp = require("hpp");
const helmet = require("helmet");

dotenv.config();

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(hpp());
  app.use(helmet());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", require("./routes"));

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "잘못된 경로입니다.",
  });
});

module.exports = functions
  .runWith({
    timeoutSeconds: 300, 
    memory: "512MB", 
  })
  .region("asia-northeast3") 
  .https.onRequest(async (req, res) => {
    console.log("\n\n", "[api]", `[${req.method.toUpperCase()}]`, req.originalUrl, req.body);

    return app(req, res);
  });