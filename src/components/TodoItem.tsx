import type { Todo } from "../repo/todoRepo";
import { useUpdateTodo, useDeleteTodo } from "../hooks/useTodos";

export function TodoItem({ todo }: { todo: Todo }) {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  return (
    <li className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo.mutate({ id: todo.id, data: { completed: !todo.completed } })}
      />
      <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
      <span className="text-xs text-gray-500">{todo.createdAt}</span>
      <button onClick={() => deleteTodo.mutate(todo.id)} className="text-red-500 ml-auto text-sm">
        ✕
      </button>
    </li>
  );
}
