import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import {v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
    console.log(id)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete:false}]
    })
    console.log(todos)
    todoNameRef.current.value = null
  }

  const handleClearTodo = (e) => {
    setTodos(todos.filter(todo => {
      return !todo.complete
    }))
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add to do</button>
      <button onClick={handleClearTodo}>Clear to do</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
