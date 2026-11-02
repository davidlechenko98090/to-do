import type { Filter } from '../types'

type TodoFiltersProps = {
  value: Filter
  onChange: (filter: Filter) => void
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' },
]

export function TodoFilters({ value, onChange }: TodoFiltersProps) {
  return (
    <div className="todo-filters" role="tablist" aria-label="Фильтр задач">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          role="tab"
          aria-selected={value === filter.id}
          className={value === filter.id ? 'is-active' : undefined}
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
