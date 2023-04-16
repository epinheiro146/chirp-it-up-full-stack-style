import * as express from "express";
import usersRouter from "./users";
import chirpsRouter from "./chirps"

const router = express.Router();

router.use("/api/users", usersRouter);
router.use("/api/chirps", chirpsRouter);

export default router;