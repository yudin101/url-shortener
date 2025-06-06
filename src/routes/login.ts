import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { UserLogin } from "../utils/validationSchemas";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  checkSchema(UserLogin),
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(400).send({ erros: result.array() });
      return;
    }

    res.status(200).send({ message: "Logged in" });
    return;
  },
);

export default router;
