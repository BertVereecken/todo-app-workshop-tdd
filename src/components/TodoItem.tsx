import type { Todo } from "../repo/todoRepo";
import { useUpdateTodo } from "../hooks/useTodos";

export function TodoItem({ todo }: { todo: Todo }) {
  const updateTodo = useUpdateTodo();

  return (
    <li className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo.mutate({ id: todo.id, data: { completed: !todo.completed } })}
      />
      <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
      <span className="text-xs text-gray-500">{todo.createdAt}</span>
    </li>
  );
}
