const http = require('http')

let tasks = [
    {
        id: "1",
        title: "Make dinner",
        urgency: 2
    },
    {
        id: "2",
        title: "Do laundry",
        urgency: 1
    },
    {
        id: "3",
        title: "Prepare presentation",
        urgency: 3
    }
]

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(tasks))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)