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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})