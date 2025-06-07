import { Request, Response, Router } from "express";

const router = Router();

router.get("/logout", (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Logout Failed!");
      return;
    }

    res.clearCookie("connect.sid").status(200).send({ message: "Logged Out!" });
    return;
  });
});
export default router;
