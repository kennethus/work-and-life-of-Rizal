// routes/notes.js
const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find()
      .sort({ createdAt: -1 }) // sort by newest first
      .limit(10); // limit to 10 notes

    if (!notes || notes.length === 0) {
      return res.status(200).json({ success: false, message: "No notes" });
    }

    res.status(200).json({
      success: true,
      message: "Notes successfully fetched",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { content, nickname, color } = req.body;
    const newNote = new Note({ content, nickname, color });
    await newNote.save();
    res.status(201).json({
      success: true,
      message: "Notes successfully posted",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error posting notes",
      error: error.message,
    });
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
