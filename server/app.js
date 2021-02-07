import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import jwsAuth from "./routes/jwtAuth";
import router from "./api";
import { httpsOnly, logErrors, pushStateRouting } from "./middleware/middleware";
import cookieSession from "cookie-session";
var app = express();

 app.set("trust proxy", 1); // trust first proxy

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.cookieSessionKey],
    secureProxy: true,
  })
);
console.log(process.env.cookieSessionKey);
const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");



//Routes
//register and login rout


//routes.initialize(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(require('./routes/jwtAuth'))
//app.use(require('./routes/dashboard'))
app.use(express.json());
app.use(helmet());
app.use(logErrors());
app.use(morgan("dev"));


if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

export default app;
