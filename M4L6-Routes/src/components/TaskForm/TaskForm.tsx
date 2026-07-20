import "./TaskForm.css"
import { useState } from "react";

interface TaskFormProps {
    onAddTask: (text: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputValue.trim() == "") return

        onAddTask(inputValue.trim())
        setInputValue("")
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                className="task-input"
                type="text"
                placeholder="Nueva tarea..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className="task-btn" type="submit">Agregar</button>
        </form >
    )
}

export default TaskForm