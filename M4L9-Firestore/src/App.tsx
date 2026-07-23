import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'
import type { Task } from './types/task'
import TaskForm from './components/TaskForm/TaskForm';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RequireAuth from './components/RequireAuth/RequireAuth';
import LoginPage from './pages/LoginPage/LoginPage';
import Register from './pages/Register/Register';

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

  const handleAddTask = (formData: { title: string; description: string }) => {
    const newTask: Task = { ...formData, completed: false };
    setTasks(prev => [...prev, newTask])
  }

  return (
    <div>
      <h1>TODO App</h1>
      <Navbar />
      <Routes>
        {/* rutas privadas */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={
            <>
              <TaskForm onAddTask={handleAddTask} />
              <TaskList tasks={tasks} />
            </>
          } />
          <Route path='/home' element={
            <>
              <TaskForm onAddTask={handleAddTask} />
              <TaskList tasks={tasks} />
            </>
          } />
        </Route>

        {/* Rutas publicas */}
        <Route path='/login' element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
