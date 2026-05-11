export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number; // epoch ms
}

let todos: Todo[] = [];

export const todoRepo = {
  getAll: (): Todo[] => [...todos],

  getById: (id: string): Todo | undefined => todos.find((t) => t.id === id),

  create: (title: string): Todo => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    todos.push(todo);
    return todo;
  },

  update: (id: string, data: Partial<Pick<Todo, "title" | "completed">>): Todo => {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Todo not found");
    todos[idx] = { ...todos[idx], ...data };
    return todos[idx];
  },

  delete: (id: string): void => {
    todos = todos.filter((t) => t.id !== id);
  },

  /** @internal test only */
  _reset: (): void => {
    todos = [];
  },
};
