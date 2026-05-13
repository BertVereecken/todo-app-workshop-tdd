export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number; // epoch ms
}

let todos: Todo[] = [];

export const todoRepo = {
  getAll: () => {},

  getById: () => {},

  create: () => {},

  update: () => {},

  delete: (): void => {},

  /** @internal test only */
  _reset: (): void => {
    todos = [];
  },
};
