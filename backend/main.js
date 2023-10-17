// @/main.js
const express = require("express");
const mongoose = require("mongoose");

const { Dog } = require("./models");

const app = express();

app.use(express.json());



app.get("api/hello", async (req, res) => {
  const newDog = new Dog({ name: "gg", breed:"what", age: 12, isGoodBoy: true });
  const insertedDog = await newDog.save();

  return res.status(200).json({q: 1, w: insertedDog});
});

app.put("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  await Dog.updateOne({ id }, req.body);
  const updatedDog = await Dog.findById(id);
  return res.status(200).json(updatedDog);
});

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  return res.status(200).json(deletedDog);
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://local_user:Password123@mongo:27017/dogs"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

