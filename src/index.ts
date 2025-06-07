import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import connectSqlite3 from "connect-sqlite3";
import routes from "./routes/index";
import { loggingMiddleware } from "./utils/middlewares";
import "./strategies/localStrategy";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const SQLiteStore = connectSqlite3(session);

app.use(express.json());

app.use(
  session({
    store: new SQLiteStore({
      db: "sessions.sqlite",
      dir: "./db"
    }) as session.Store,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(loggingMiddleware);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
