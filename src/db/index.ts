import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dbDir = path.resolve("db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const db = new Database("./db/urlShortenerDB.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    PRIMARY KEY(id)
);
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER,
    user_id INTEGER,
    original TEXT NOT NULL,
    shortened TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
`);

export default db;
