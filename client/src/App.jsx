import { useState } from 'react'
import Task from './Task'
import AddTaskForm from './AddTaskForm'

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

  const [newTaskName, setNewTaskName] = useState("")
  const [newUrgency, setNewUrgency] = useState("--")

  const handleName = (e) => {
    // console.log(e.target.value)
    setNewTaskName(e.target.value)
  }
  
  const handleUrgency = (e) => {
    setNewUrgency(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newTaskName.trim() && newUrgency !== "--") {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        urgency: parseInt(newUrgency)
      }
      console.log("You just added a new task!", newTask)
  
      setTasks([...tasks, newTask])
      setNewTaskName("")
      setNewUrgency("--")
      
    } else {
      alert("Fill out all fields, and select a level of urgency")
    }
  }

  return (
    <div>
      <h1>My Personal To-Do List</h1>
      <h2>Add Task That Need to be Completed Here</h2>
      <AddTaskForm handleName={handleName} 
        handleUrgency={handleUrgency} 
        taskName={newTaskName} 
        newUrgency={newUrgency} 
        handleSubmit={handleSubmit}
      />
      <ul>
      {tasks.map(task => <Task key={task.id} name={task.name} urgency={task.urgency}/>)}  
      </ul>
    </div>
  )
}

export default App
