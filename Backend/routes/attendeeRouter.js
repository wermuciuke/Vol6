import express from "express";
import {
  createNewAttendee,
  deleteAttendee,
  getAttendees,
  updateAttendee,
} from "../controllers/attendeeController.js";
import { validateAttendee } from "../middlewares/validateAttendeeBody.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/attendees", validateToken, getAttendees);

router.post("/attendees", validateToken, validateAttendee, createNewAttendee);

router.put(
  "/attendees/:id",
  validateToken,
  validateIdParam,
  validateAttendee,
  updateAttendee
);

router.delete("/attendees/:id", validateToken, validateIdParam, deleteAttendee);

export default router;
