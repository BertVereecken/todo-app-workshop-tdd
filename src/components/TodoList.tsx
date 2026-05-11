import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data: todos, isLoading } = useTodos();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
