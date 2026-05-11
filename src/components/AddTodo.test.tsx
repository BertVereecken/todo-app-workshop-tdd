import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createWrapper } from '../test/wrapper';
import { todoRepo } from '../repo/todoRepo';
import { AddTodo } from './AddTodo';

beforeEach(() => {
  todoRepo._reset();
});

describe('AddTodo', () => {
  it('adds a todo on submit', async () => {
    const user = userEvent.setup();
    render(<AddTodo />, { wrapper: createWrapper() });

    await user.type(screen.getByPlaceholderText('New todo...'), 'Test todo');
    await user.click(screen.getByText('Add'));

    expect(todoRepo.getAll()).toHaveLength(1);
    expect(todoRepo.getAll()[0].title).toBe('Test todo');
  });

  it('clears input after submit', async () => {
    const user = userEvent.setup();
    render(<AddTodo />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText('New todo...');
    await user.type(input, 'Test');
    await user.click(screen.getByText('Add'));

    expect(input).toHaveValue('');
  });

  it('does not add empty todos', async () => {
    const user = userEvent.setup();
    render(<AddTodo />, { wrapper: createWrapper() });

    await user.click(screen.getByText('Add'));
    expect(todoRepo.getAll()).toHaveLength(0);
  });
});
