const EditTask = ({editTask, setEditTask, cancel, save}) => {
    const handleUpdate = (e) => {
        setEditTask(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        editTask.trim() ? save(editTask) : alert("Enter a valid task, with valid characters such as letters and numbers")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Update your task here"
                onChange={handleUpdate}
                value={editTask}
            />
            <button type="button" onClick={cancel}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    )
}

export default EditTask