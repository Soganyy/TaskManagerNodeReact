const mongoose = require("mongoose");
require("dotenv").config();

const Schema = mongoose.Schema;

// Connect to database
mongoose.connect(process.env.CONN, { useNewUrlParser: true, useUnifiedTopology: true });

// Schemas for User and Task
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);


module.exports = { Task, User }