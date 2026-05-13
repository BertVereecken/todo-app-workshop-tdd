export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number; // epoch ms
}

let todos: Todo[] = [];

export const todoRepo = {
  getAll: () => {
    return todos
  },

  getById: (id: string): Todo | undefined => {},

  create: (title: string): Todo => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    }

    todos.push(newTodo)
    return newTodo
  },

  update: (id: string, data: Partial<Pick<Todo, "title" | "completed">>): Todo => {

    const todoToUpdate = todos.find(todo => {
      return todo.id === id
    });

    if (todoToUpdate === undefined) throw new Error(`TODO with id ${id} not found`)

    const updatedTodo = {...todoToUpdate, ...data};

    todos = [updatedTodo]

    return updatedTodo
  },

  delete: (id: string): void => {},

  /** @internal test only */
  _reset: (): void => {
    todos = [];
  },
};
