import { useEffect, useState } from 'react'
import type { Todo } from '../types'

const STORAGE_KEY = 'todos'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<Todo>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.text === 'string' &&
    typeof candidate.completed === 'boolean'
  )
}

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isTodo)
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (rawText: string) => {
    const text = rawText.trim()

    if (!text) {
      return false
    }

    const todo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }

    setTodos((current) => [todo, ...current])
    return true
  }

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}
