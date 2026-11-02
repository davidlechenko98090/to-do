import type { Filter, Todo } from '../types'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  filter: Filter
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'Нет задач',
  active: 'Нет активных задач',
  completed: 'Нет выполненных задач',
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p>{EMPTY_MESSAGES[filter]}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
