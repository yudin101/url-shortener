import { Request, Response, Router } from "express";
import db from "../db";

const router = Router();

router.get("/deleteLink/:id", (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  const { id: linkId } = req.params;
  const { id: userId } = req.user;

  try {
    const deleteStmt = db
      .prepare("DELETE FROM urls WHERE id = ? AND user_id = ?")
      .run(linkId, userId);

    if (deleteStmt.changes === 0) {
      res.status(404).send({ errors: "Link not found!" });
      return;
    }

    res.status(200).send({ message: "Link deleted!" });
    return;
  } catch (err) {
    res.status(500).send({ errors: err });
    return;
  }
});
export default router;
