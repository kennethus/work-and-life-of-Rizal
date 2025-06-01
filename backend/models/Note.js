// models/Note.js
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  nickname: { type: String, default: "Anonymous" },
  color: { type: String, default: "#ffeb3b" }, // yellow note default
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
