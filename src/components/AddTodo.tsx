import { useState } from "react";
import { useCreateTodo } from "../hooks/useTodos";

export function AddTodo() {
  const [title, setTitle] = useState("");
  const createTodo = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTodo.mutate(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        className="border px-2 py-1 flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1">
        Add
      </button>
    </form>
  );
}
