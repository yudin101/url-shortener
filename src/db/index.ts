import Database from "better-sqlite3";

const db = new Database("urlShortenerDB.sqlite");

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
