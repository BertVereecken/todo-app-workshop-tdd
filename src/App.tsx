import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todos</h1>
        <AddTodo />
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}
