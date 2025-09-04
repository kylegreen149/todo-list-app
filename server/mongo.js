const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kylegreen149_db_user:${password}@cluster0.x5k8ng7.mongodb.net/taskApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const taskSchema = new mongoose.Schema({
  name: String,
  urgency: Number,
})

const Task = mongoose.model('Task', taskSchema)

// const task = new Task({
//   name: 'Clean the stove',
//   urgency: 1,
// })

// If you want to search for specific tasks, add the search criteria inside the find method's object
// For instance of looking for tasks of urgency of 3: Task.find({urgency: 3}).then(result => {...
Task.find({}).then(result => {
    result.forEach(task => {
        console.log(task)
    })
    mongoose.connection.close()
})

// task.save().then(result => {
//   console.log('task saved!')
//   mongoose.connection.close()
// })