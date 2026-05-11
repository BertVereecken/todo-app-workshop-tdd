import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoRepo } from "../repo/todoRepo";

const TODOS_KEY = ["todos"];

export const useTodos = () =>
  useQuery({ queryKey: TODOS_KEY, queryFn: () => todoRepo.getAll() });

export const useCreateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => Promise.resolve(todoRepo.create(title)),
    onSuccess: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
};

export const useUpdateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; data: { title?: string; completed?: boolean } }) =>
      Promise.resolve(todoRepo.update(vars.id, vars.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
};

export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => Promise.resolve(todoRepo.delete(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
};
