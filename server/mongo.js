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

const task = new Task({
  name: 'Clean the stove',
  urgency: 1,
})

task.save().then(result => {
  console.log('task saved!')
  mongoose.connection.close()
})