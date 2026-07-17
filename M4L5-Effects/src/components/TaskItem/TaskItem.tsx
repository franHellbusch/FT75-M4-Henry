import type { Task } from "../../types/task";
import "./TaskItem.css"

interface TaskItemProps {
    task: Task;
}

function TaskItem({ task }: TaskItemProps) {
    return <li className={`task-item${task.completed ? " completed" : ""}`}>
        <span>{task.text}</span>
    </li>
}

export default TaskItem

