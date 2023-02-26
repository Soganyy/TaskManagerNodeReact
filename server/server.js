const express = require('express');
const { User } = require('./database');
require('dotenv').config();

const app = express();

app.use(express.json());

// API side for users
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password })
    await user.save(function(err, result) {
        if(err) throw err;
        console.log(result)
    });
    res.json(user);
})

app.get('/api/users', (req, res) => {
    const { name } = req.body;
    const user = User.findOne({ name }, function(err, result) {
        if(err) throw err;
        res.send(result)
    })
})

app.put("/api/users", (req, res) => {
    const { name, password } = req.body;
    User.findOneAndUpdate({ name: name }, {password: password}, {new: true})
    res.json()
})

app.delete("/api/users", (req, res) => {
    const { name } = req.body;
    User.findOneAndRemove({ name: name })
})

// API side for tasks
app.post('/api/tasks', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description, completed: false });
    await task.save();
    res.json(task);
});

app.get('/api/tasks', (req, res) => {
    const { name } = req.body;
    const user = User.find({ name })
    res.json(user);
})

app.put("/api/tasks", (req, res) => {
    const { name, password } = req.body;
    User.findOneAndUpdate({ name: name }, {password: password}, {new: true})
    res.json()
})

app.delete("/api/tasks", (req, res) => {
    const { name } = req.body;
    User.findOneAndRemove({ name: name })
})


app.listen(process.env.PORT, () => {
    console.log("")
    console.log("Listening...")
})