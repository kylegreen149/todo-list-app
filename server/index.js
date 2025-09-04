const express = require('express') // Used to import express
const app = express() // Function that is used to create an Express application stored in the app variable

app.use(express.json()) // Middleware that parses incoming requests with JSON payloads to access data easily

app.use(express.static('dist')) // Serve static files from the 'dist' directory

const cors = require('cors') // Import CORS package to handle cross-origin requests
app.use(cors()) // Use CORS middleware to allow cross-origin requests

let tasks = [
    {
        id: "1",
        name: "Make dinner",
        urgency: 2
    },
    {
        id: "2",
        name: "Do laundry",
        urgency: 1
    },
    {
        id: "3",
        name: "Prepare presentation",
        urgency: 3
    }
]

app.get("/", (req, res) => {
    res.send("<p>Hello World!</>")
})

app.get("/api/tasks", (req, res) => {
    res.json(tasks)
})

app.get("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    const task = tasks.find(t => t.id === id)
    task ? res.status(200).json(task) : res.status(404).end("Task not found")
})

app.post("/api/tasks", (req, res) => {
    const body = req.body // The body of the request can be accessed through the request object
    // console.log(body)
    if (!body.name || !body.urgency) {
        return res.status(400).json({ error: "name or urgency missing" })
    }
    const task = {
        id: (tasks.length + 1).toString(),
        name: body.name,
        urgency: body.urgency
    }
    tasks = tasks.concat(task)
    res.status(201).json(task)
    console.log(task)
})

app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    tasks = tasks.filter(t => t.id !== id)
    res.status(204).end()
})

// Put this middleware after all request in case all fail, shown if link is invalid
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})