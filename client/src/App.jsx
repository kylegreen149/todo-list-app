import { useState } from 'react'
import Task from './Task'

function App() {
const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Code up my website",
      urgency: 3
    },
    {
      id: 2,
      name: "Clean my room",
      urgency: 1
    }
  ])

  // console.log(tasks)

  return (
    <div>
      <h1>My Personal To-Do List</h1>
      <h2>Add Task That Need to be Completed Here</h2>
      <ul>
      {tasks.map(task => <Task key={task.id} name={task.name} urgency={task.urgency}/>)}  
      </ul>
    </div>
  )
}

export default App
