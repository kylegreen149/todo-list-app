require("dotenv").config() // Load environment variables from a .env file into process.env

const express = require('express') // Used to import express
const { Task, url } = require("./models/task")

const app = express() // Function that is used to create an Express application stored in the app variable

app.use(express.static('dist')) // Serve static files from the 'dist' directory
app.use(express.json()) // Middleware that parses incoming requests with JSON payloads to access data easily


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next() // Call the next middleware function in the stack  
}
app.use(requestLogger) // Middleware to log details of each incoming request


// const cors = require('cors') // Import CORS package to handle cross-origin requests
// app.use(cors()) // Use CORS middleware to allow cross-origin requests

const mongoose = require("mongoose")

mongoose.set('strictQuery', false)
mongoose.connect(url)

const taskSchema = new mongoose.Schema({
    name: String,
    urgency: Number,
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// const Task = mongoose.model('Task', taskSchema)

app.get("/", (req, res) => {
    res.send("<p>Hello World!</>")
})

app.get("/api/tasks", (req, res) => {
    Task.find({}).then(tasks => {
        res.json(tasks)
    })
})

app.get("/api/tasks/:id", (req, res, next) => {
    const id = req.params.id
    Task.findById(id).then(task => {
        task ? res.status(200).json(task) : res.status(404).end("Task not found")
    }).catch(error => next(error))
})

app.post("/api/tasks", (req, res) => {
    const body = req.body // The body of the request can be accessed through the request object
    // console.log(body)
    if (!body.name || !body.urgency) {
        return res.status(400).json({ error: "name or urgency missing" })
    }
    const task = new Task({
        name: body.name,
        urgency: body.urgency
    })
    task.save().then(savedTask => {
        res.status(201).json(savedTask)
    })
})

app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id).then(result => {
        console.log("deleted", result)
        res.status(204).end()
    }).catch(error => {
        console.log(error)
        res.status(400).send({ error: "malformatted id" })
    })
})

// Put this middleware after all request in case all fail, shown if link is invalid
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handling middleware
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})