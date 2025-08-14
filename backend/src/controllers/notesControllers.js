import Note from "../models/Note.js";

const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // .sort({createdAt: -1}) means desc by created date
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNoteDetails = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found." });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json({ message: "Note created successfully." });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });

    if (!note) return res.status(404).json({ message: "Note not found." });

    res.status(200).json({ message: "Note updated successfully." });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found." });

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllNotes, getNoteDetails, createNote, updateNote, deleteNote };
