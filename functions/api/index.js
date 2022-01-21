const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const hpp = require("hpp");
const helmet = require("helmet");
const sentry = require("@sentry/node")
const tracing = require("@sentry/tracing")

const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const util = require("../lib/util");
const slackBot = require("../utils/slackBot");
dotenv.config();

const app = express();
app.use(cors());

sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new sentry.Integrations.Http({tracing: true}),
    new tracing.Integrations.Express({app}),
  ],
  tracesSampleRate: 1.0,
});

app.use(sentry.Handlers.requestHandler());
app.use(sentry.Handlers.tracingHandler());

if (process.env.NODE_ENV === "production") {
  app.use(hpp());
  app.use(helmet());
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/v1", require("./routes"));

app.use(sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    slackBot.send('api-서버-로그',
        `오류가 발생했습니다 !\n\`Error Message\`: ${err.message}\n`).then();

    res.status(statusCode.BAD_REQUEST)
      .json(util.fail(statusCode.BAD_REQUEST, err.message))
});

app.use("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "존재하지 않는 경로입니다.",
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