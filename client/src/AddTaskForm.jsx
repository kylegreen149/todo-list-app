const AddTaskForm = ({handleName, handleUrgency, taskName, newUrgency, handleSubmit}) => {
    // console.log("Task Name:", taskName, "Urgency:", newUrgency)
    // console.log(newUrgency)
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Add Task Here" onChange={handleName} value={taskName}/>
            <label>Level of Urgency</label>
            <select onChange={handleUrgency} value={newUrgency}>
                <option>--</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddTaskForm