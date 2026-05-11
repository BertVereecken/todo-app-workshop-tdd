import { describe, it, expect, beforeEach } from 'vitest';
import { todoRepo } from './todoRepo';

describe('todoRepo', () => {
  beforeEach(() => {
    todoRepo._reset();
  });

  it('starts empty', () => {
    expect(todoRepo.getAll()).toEqual([]);
  });

  it('creates a todo', () => {
    const todo = todoRepo.create('Buy milk');
    expect(todo.title).toBe('Buy milk');
    expect(todo.completed).toBe(false);
    expect(todo.createdAt).toBeTypeOf('number');
    expect(todo.id).toBeTruthy();
  });

  it('getAll returns all todos', () => {
    todoRepo.create('A');
    todoRepo.create('B');
    expect(todoRepo.getAll()).toHaveLength(2);
  });

  it('getById returns the correct todo', () => {
    const todo = todoRepo.create('Find me');
    expect(todoRepo.getById(todo.id)).toEqual(todo);
  });

  it('getById returns undefined for unknown id', () => {
    expect(todoRepo.getById('nope')).toBeUndefined();
  });

  it('updates a todo', () => {
    const todo = todoRepo.create('Original');
    const updated = todoRepo.update(todo.id, { title: 'Changed', completed: true });
    expect(updated.title).toBe('Changed');
    expect(updated.completed).toBe(true);
  });

  it('update throws for unknown id', () => {
    expect(() => todoRepo.update('nope', { title: 'x' })).toThrow('Todo not found');
  });

  it('deletes a todo', () => {
    const todo = todoRepo.create('Delete me');
    todoRepo.delete(todo.id);
    expect(todoRepo.getAll()).toHaveLength(0);
  });
});
