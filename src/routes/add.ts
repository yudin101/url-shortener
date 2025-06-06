import { Request, Response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import cryptoRandomString from "crypto-random-string";
import { UrlAdd } from "../utils/validationSchemas";
import db from "../db";

const router = Router();

router.post("/add", checkSchema(UrlAdd), (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const results = validationResult(req);

  if (!results.isEmpty()) {
    res.status(400).send({ errors: results.array() });
    return;
  }

  const { link } = matchedData(req);
  const { id: userId } = req.user;
  let randomString = "";
  let checkRandomString;

  try {
    do {
      randomString = cryptoRandomString({
        length: 10,
        type: "alphanumeric",
      });

      const stmt = db.prepare("SELECT * FROM urls WHERE shortened = ?");
      checkRandomString = stmt.get(randomString);
    } while (checkRandomString);

    const insert = db.prepare(
      "INSERT INTO urls (user_id, original, shortened) VALUES (?, ?, ?)",
    );
    insert.run(userId, link, randomString);

    const shortenedUrl = `${req.protocol}://${req.get("host")}/${randomString}`

    res.status(201).send({ message: "URL added", shortenedUrl: shortenedUrl });
    return;
  } catch (err) {
    res.status(500).send({ errors: err });
    return;
  }
});

export default router;
