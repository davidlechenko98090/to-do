import { useMemo, useState } from 'react'
import { TodoFilters } from './components/TodoFilters'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import type { Filter } from './types'
import './App.css'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }

    return todos
  }, [todos, filter])

  return (
    <div className="app">
      <h1>To-do list</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilters value={filter} onChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  )
}

export default App
