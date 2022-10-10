const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// Rout 1 :fetch all notes get "/api/notes/allnotes" login require
router.get("/allnotes", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.user.id });
    res.json(note);
    // res.json([])
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "error occcoure" });
  }
});

// Rout 2 :add notes POST "/api/notes/addnotes" login require
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a title").isLength({ min: 3 }),
    body("description", "Enter a description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "error occcoure" });
    }
  }
);

// Rout 3 :add notes put "/api/notes/updatenotes" login require
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const {title,description,tag} =req.body
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{ $set: newNote },{ new: true });
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Rout 4 :delete notes delete "/api/notes/deletenotes" login require
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    // if tag present then changed the tag content and put into the newNote obj
    let note = await Notes.findById(req.params.id); //req.params.id means "/updatenotes/:id"
    //if notes is note present
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("not valid user");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "error occcoure" });
  }
});

module.exports = router;
