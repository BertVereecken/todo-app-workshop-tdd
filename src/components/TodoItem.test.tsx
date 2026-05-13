import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createWrapper } from '../test/wrapper';
import { todoRepo } from '../repo/todoRepo';
import { TodoItem } from './TodoItem';

beforeEach(() => {
  todoRepo._reset();
});

describe('TodoItem', () => {
  it('renders title and raw epoch', () => {
    const todo = todoRepo.create('Hello');
    render(<TodoItem todo={todo} />, { wrapper: createWrapper() });

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText(String(todo.createdAt))).toBeInTheDocument();
  });

  it('toggles completed on checkbox click', async () => {
    const user = userEvent.setup();
    const todo = todoRepo.create('Toggle me');
    render(<TodoItem todo={todo} />, { wrapper: createWrapper() });

    await user.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(todoRepo.getById(todo.id)?.completed).toBe(true);
    });
  });

  it.todo('deletes todo on delete button click', async () => {

  });
});
