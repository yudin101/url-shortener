import { Request, Response, Router } from "express";
import db from "../db";

const router = Router();

router.get("/links", (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const { id: userId } = req.user;

  try {
    const stmt = db.prepare(
      "SELECT original, shortened FROM urls WHERE user_id = ?",
    );
    const userUrls = stmt.all(userId);

    res.status(200).send({ urls: userUrls });
    return;
  } catch (err) {
    res.status(500).send({ errors: err });
    return;
  }
});
export default router;
