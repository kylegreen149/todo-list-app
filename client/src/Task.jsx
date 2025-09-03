const Task = ({name, urgency, deleteTask}) => {
    return (
        <>
            <li>{name}, Level of Urgency: {urgency}</li>
            <button>Edit Task</button>
            <button onClick={deleteTask}>Delete Task</button>
        </>
    )
}

export default Task