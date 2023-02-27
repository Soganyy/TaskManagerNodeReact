const express = require('express');
const { User } = require('./database');
require('dotenv').config();

const app = express();

app.use(express.json());

// API side for users
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password }, );
    await user.save(function(err, result) {
        if(!!err) return console.log(err);
        console.log(result);
    });
    res.json(user);
})

app.get('/api/users', (req, res) => {
    const { email } = req.body;
    const user = User.find({  }, function(err, result) {
        if(err) throw res.send(err);
        res.send(result);
    })
})

app.put("/api/users", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.findOneAndUpdate({ email: email }, {password: password}, {new: true})
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
})

app.delete("/api/users", async (req, res) => {
    const { email } = req.body;
    // await User.findOneAndRemove({ email: email }, function(err, result) {
    //     if(err) return console.log(err);
    //     console.log(result);
    // })
    try {
        const result = await User.findOneAndRemove({ email: email })
        return res.send(result)
    } catch (error) {
        return res.status(401)
    }
})

// API side for tasks
app.post('/api/tasks', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description, completed: false });
    await task.save((err, result) => {
        if(err) throw err;
        res.send(result)
    });
    res.json(task);
});

app.get('/api/tasks', (req, res) => {
    const { name } = req.body;
    const user = User.find({ name })
    res.json(user);
})

app.put("/api/tasks", async (req, res) => {
    
})

app.delete("/api/tasks", (req, res) => {
    const { name } = req.body;
    User.findOneAndRemove({ name: name })
})


app.listen(process.env.PORT, () => {
    console.log("")
    console.log("Listening...")
})