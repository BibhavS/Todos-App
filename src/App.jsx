import React, { useEffect, useState } from "react"
import './App.css'
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !(prevTodo.completed) } : prevTodo ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 mt-6 text-white">
          <h1 className="text-center text-[2.2rem] glow font-medium tracking-wider text-white mb-16">Manage your Todos</h1>
          <div className="mb-10">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-5">
             {todos.map((todo) => (
               <div key={todo.id} className="w-full">
                  <TodoItem todo={todo}/>
               </div>
             ))}
          </div>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
