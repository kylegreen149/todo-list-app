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

  const updateTask = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const deleteTask = (id) => {
    const deletedTask = tasks.find(task => task.id === id)
    const comfirmDelete = window.confirm("Are you sure you want to delete this task?")
    if (comfirmDelete) {
      console.log("Successfully deleted task:", deletedTask.name)
      setTasks(tasks.filter(task => task.id !== id))
      // console.log(tasks)
    }
  }

  const deleteAllTasks = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all tasks?")
    confirmDelete && setTasks([])
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
      {tasks.length > 0 && <button onClick={deleteAllTasks}>Delete All Tasks</button>}
      {tasks.length === 0 && <h3>No tasks available</h3>}
      <ul>
      {tasks.map(task => <Task key={task.id} task={task} deleteTask={() => deleteTask(task.id)} updateTask={updateTask}/>)}  
      </ul>
    </div>
  )
}

export default App
