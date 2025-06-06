import { Request, Response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { UserRegister } from "../utils/validationSchemas";
import { hashPassword } from "../utils/helpers";
import db from "../db";

const router = Router();

router.post(
  "/register",
  checkSchema(UserRegister),
  async (req: Request, res: Response) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }

    const { username, password } = matchedData(req);

    try {
      const stmt = db.prepare(
        "INSERT INTO users (username, password) VALUES (?, ?)",
      );
      stmt.run(username, hashPassword(password));

      res.status(201).send({ message: "User created!" });
      return;
    } catch (err) {
      res.status(500).send({ errors: err });
      return;
    }
  },
);

export default router;
