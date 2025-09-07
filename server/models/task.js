const mongoose = require("mongoose")

const password = process.argv[2]
const url = process.env.MONGODB_URI
console.log('MongoDB URL:', url)

// Schema used to show how data is stored/ordered in the database
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    urgency: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    }
})

// Change ids from object to string format the time of JSON conversion
taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task, url }