import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'
import type { Task } from './types/task'
import TaskForm from './components/TaskForm/TaskForm';

const initialTasks: Task[] = [
  { text: "Aprender React", completed: true },
  { text: "Construir la TODO App", completed: false },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

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
