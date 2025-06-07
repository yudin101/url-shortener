import { Router } from "express";
import registerRouter from "./register";
import loginRouter from "./login";
import addRouter from "./add";
import redirectRouter from "./redirect";
import linksRouter from "./links"
import deleteLinksRouter from "./deleteLink"
import logoutRouter from "./logout"

const router = Router();

router.use(redirectRouter);
router.use("/api", loginRouter);
router.use("/api", registerRouter);
router.use("/api", addRouter);
router.use("/api", linksRouter);
router.use("/api", deleteLinksRouter);
router.use("/api", logoutRouter);

export default router;
