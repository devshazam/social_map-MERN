```js

const {Dog} = require("../models/models");

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