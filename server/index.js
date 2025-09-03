const express = require('express') // Used to import express
const app = express() // Function that is used to create an Express application stored in the app variable

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

app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    tasks = tasks.filter(t => t.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})