export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number; // epoch ms
}

let todos: Todo[] = [];

export const todoRepo = {
  getAll: () => {},

  getById: (id: string): Todo | undefined => {},

  create: (title: string): Todo => {},

  update: (id: string, data: Partial<Pick<Todo, "title" | "completed">>): Todo => {},

  delete: (id: string): void => {},

  /** @internal test only */
  _reset: (): void => {
    todos = [];
  },
};
