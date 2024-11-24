const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { todo } = require("node:test");

const port = 3000;

mongoose.connect('mongodb+srv://sourangvu:sourangvu@maincluster.idci6.mongodb.net/?retryWrites=true&w=majority&appName=Maincluster');
mongoose.connection.on('connected', () => console.log('DB Connected'));


app.use(express.json());

const TodoSchema = new mongoose.Schema({
    todo: String,
    
  });
  const Todo = mongoose.model('todo', TodoSchema);
  
  
  app.get('/', async(req, res) => {
    const todo = await Todo.find()
    console.log(todo)
    res.json({todo})
  })
  
  app.post('/', async (req, res) => {
    const {todo} = req.body 
   await Todo.create({todo}) 
    res.send('Created')
  })
  
  app.put('/:id', async (req, res) => {
    const id = req.params.id
    await Todo.findByIdAndUpdate(id, req.body)
    res.json({message:"updated"})
  })
  
  app.delete('/:id', async  (req, res) => {
    const id = req.params.id
    await Todo.findByIdAndDelete(id)
    res.json({message:"deleted"})
  })
app.listen(port, () => console.log("Server running on port", port));
