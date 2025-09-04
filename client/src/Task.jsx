import { useState } from "react"
import axios from "axios"
import EditTask from "./EditTask"

const Task = ({task, deleteTask, updateTask, url}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editTask, setEditTask] = useState(task.name)

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {setIsEditing(false); setEditTask(task.name)}
    const handleSave = (updatedName) => {
        axios.put(`${url}/${task.id}`, { ...task, name: updatedName }).then((res) => {
            // console.log(res.data)
            updateTask(res.data)
            setIsEditing(false)
        })
    }

    return (
        <>
            <li>{task.name}, Level of Urgency: {task.urgency}</li>
            <button onClick={handleEdit}>Edit Task</button>
            {isEditing && <EditTask task={task} editTask={editTask} setEditTask={setEditTask} cancel={handleCancel} save={handleSave}/>}
            <button onClick={deleteTask}>Delete Task</button>
        </>
    )
}

export default Task