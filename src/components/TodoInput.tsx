import { useState, type FormEvent } from 'react'

type TodoInputProps = {
  onAdd: (text: string) => boolean
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const added = onAdd(text)

    if (added) {
      setText('')
    }
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-text">
        Новая задача
      </label>
      <input
        id="todo-text"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Задача"
        autoComplete="off"
      />
      <button type="submit" disabled={!text.trim()}>
        Добавить
      </button>
    </form>
  )
}
