import express from "express";
import accountRouter from "./accountRouter.js";
import attendeeRouter from "./attendeeRouter.js";

const router = express.Router();

router.use("/account", accountRouter);
router.use("/attendee", attendeeRouter);

export default router;
