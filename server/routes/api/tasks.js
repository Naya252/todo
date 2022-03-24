const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get Tasks
router.get("/", async (req, res) => {
  const tasks = await loadTasksCollection();
  res.send(await tasks.find({}).toArray());
});

//Get Task by ID
router.get("/:id", async (req, res) => {
  const tasks = await loadTasksCollection();
  res.send(
    await tasks.find({ _id: new mongodb.ObjectId(req.params.id) }).toArray()
  );
});

//Add Task
router.post("/", async (req, res) => {
  const tasks = await loadTasksCollection();
  await tasks.insertOne({
    text: req.body.text,
  });
  res.status(201).send();
});

//Delete Task
router.delete("/:id", async (req, res) => {
  const tasks = await loadTasksCollection();
  await tasks.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

async function loadTasksCollection() {
  const client = await mongodb.MongoClient.connect(
    `mongodb://localhost:27017/todo`,
    {
      useNewUrlParser: true,
    }
  );

  return client.db("todo").collection("tasks");
}

module.exports = router;
