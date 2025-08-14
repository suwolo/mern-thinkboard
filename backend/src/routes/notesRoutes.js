import express from "express";
import {
  getAllNotes,
  getNoteDetails,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteDetails);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
