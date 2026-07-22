import type { Task } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css"

interface TaskListProps {
    tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
    if (tasks.length == 0) {
        return <p className="task-empty">No hay tareas todavia. Agrega la primera.</p>;
    }

    return <ul className="task-list">
        {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
        ))}
    </ul>
}

export default TaskList