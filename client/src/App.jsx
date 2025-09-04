import { useState, useEffect } from 'react'
import axios from 'axios'
import Task from './Task'
import AddTaskForm from './AddTaskForm'

function App() {
const [tasks, setTasks] = useState([])
const baseURL = "http://localhost:3001/api/tasks"

useEffect(() => {
  axios.get(baseURL).then(res => setTasks(res.data))
}, [])

  const [newTaskName, setNewTaskName] = useState("")
  const [newUrgency, setNewUrgency] = useState("--")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleName = (e) => setNewTaskName(e.target.value)
  const handleUrgency = (e) => setNewUrgency(e.target.value)

  const handleSortOrder = (e) => setSortOrder(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newTaskName.trim() && newUrgency !== "--") {
      const newTask = {
        name: newTaskName,
        urgency: parseInt(newUrgency)
      }

      axios.post(baseURL, newTask).then(res => {
        setTasks([...tasks, res.data])
        console.log("You just added a new task!", newTask)
      })
  
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
      axios.delete(`${baseURL}/${id}`).then(() => {
        console.log("Successfully deleted task:", deletedTask.name)
        setTasks(tasks.filter(task => task.id !== id))
      })
    }
  }

  const deleteAllTasks = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all tasks?")
    //JSON can't delete everything at once, so map over everything one by one (O(n))
    if (confirmDelete) {
      await Promise.all(tasks.map(task => axios.delete(`${baseURL}/${task.id}`)))
      setTasks([])
    }
  }

  const sortedTasks = tasks.slice().sort((a,b) => {
    if (sortOrder === "asc") {
      return a.urgency - b.urgency
    } else {
      return b.urgency - a.urgency
    }
  })

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
      {tasks.length > 0 && (
        <>
          <button onClick={deleteAllTasks}>Delete All Tasks</button>
          <select value={sortOrder} onChange={handleSortOrder}>
            <option value="none" disabled>-- Sort Tasks By Urgency --</option>
            <option value="asc">Sort by Urgency (Ascending)</option>
            <option value="desc">Sort by Urgency (Descending)</option>
          </select>
        </>
      )}
      {sortedTasks.length === 0 && <h3>No tasks available</h3>}
      <ul>
      {sortedTasks.map(task => <Task key={task.id} task={task} deleteTask={() => deleteTask(task.id)} updateTask={updateTask} url={baseURL} />)}  
      </ul>
    </div>
  )
}

export default App
