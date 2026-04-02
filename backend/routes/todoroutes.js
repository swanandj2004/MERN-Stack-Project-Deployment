const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// ADD todo
router.post("/", async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.json(newTodo);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;