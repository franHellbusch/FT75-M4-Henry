import type { Task } from "../../types/task";
import "./TaskItem.css"

interface TaskItemProps {
    task: Task;
    onToggle: () => void;
}

function TaskItem({ task, onToggle }: TaskItemProps) {
    return <li className={`task-item${task.completed ? " task-item--done" : ""}`}>
        <input
            className="task-item__checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
        />
        <div className="task-item__content">
            <span className="task-item__title">{task.title}</span>
            {task.description && (
                <span className="task-item__description">{task.description}</span>
            )}
        </div>
    </li>
}

export default TaskItem

