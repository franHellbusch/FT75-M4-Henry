import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'
import type { Task } from './types/task'
import TaskForm from './components/TaskForm/TaskForm';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';

function App() {
  const [user, setUser] = useState<{ email: string; uid: string } | null>(null)
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
      <Navbar />
      <Routes>
        {/* rutas privadas */}
        <Route element={<RequireAuth user={user} />}>
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
        <Route path='/login' element={
          <Login user={user} onLogin={setUser} onLogout={() => setUser(null)} />
        } />
      </Routes>
    </div>
  )
}

export default App
