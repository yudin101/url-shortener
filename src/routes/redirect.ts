import { Request, Response, Router } from "express";
import db from "../db";

const router = Router();

router.get("/:string", (req: Request, res: Response) => {
  const { string } = req.params;

  try {
    const stmt = db.prepare("SELECT original FROM urls WHERE shortened = ?");
    const { original: originalUrl } = stmt.get(string) as { original: string };

    if (!originalUrl) {
      res.status(404).send({ error: "URL Not Found!" });
      return;
    }

    res.redirect(originalUrl);
    return;
  } catch (error) {
    res.status(500).send({ errors: error });
    return;
  }
});

export default router;
