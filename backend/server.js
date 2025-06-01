require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Note = require("./routes/notes");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", Note);

mongoose
  .connect(process.env.MONGO_URI, {
    ssl: true,
    tlsInsecure: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });
