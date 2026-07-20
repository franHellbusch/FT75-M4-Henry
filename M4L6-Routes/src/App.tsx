import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'
import type { Task } from './types/task'
import TaskForm from './components/TaskForm/TaskForm';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const pendientes = tasks.filter(t => !t.completed).length;
    document.title = pendientes > 0 ? `TODO App (${pendientes} pendientes)` : "TODO App";
  }, [tasks])

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      text,
      completed: false
    }

    setTasks(prev => [...prev, newTask])
  }

  return (
    <div>
      <h1>TODO App</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App
