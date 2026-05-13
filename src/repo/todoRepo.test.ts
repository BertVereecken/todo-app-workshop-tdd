import {beforeEach, describe, expect, it, test, vi} from 'vitest';
import {todoRepo} from './todoRepo';


describe('todoRepo', () => {

    const id = 'cdf85bcb-b64b-4e70-920f-d3ac153e79d4';
    const epoch = 1778677434274;
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(id);
    vi.useFakeTimers().setSystemTime(new Date(epoch));

    beforeEach(() => {
        todoRepo._reset();
    })

    test('get all should return an empty list', () => {
        const todos = todoRepo.getAll();

        expect(todos).toHaveLength(0)
    })

    it('should allow to create a TODO', () => {
        const todo = todoRepo.create("My todo");

        expect(todo).toEqual({
            completed: false,
            id: id,
            createdAt: epoch,
            title: 'My todo'
        })
    })

    it('should allow to add a TODO to the list of TODOS', () => {
        const todosBefore = todoRepo.getAll();

        expect(todosBefore).toEqual([])

        todoRepo.create("My todo");

        const todosAfter = todoRepo.getAll();

        expect(todosAfter).toEqual([
            {
                completed: false,
                id: id,
                createdAt: epoch,
                title: 'My todo'
            }
        ])
    })

    it('should allow to update only a title of a todo', () => {
        const todo = todoRepo.create("My todo");

        const updateTodo = todoRepo.update(todo.id, {title: 'new title'});

        expect(updateTodo).toEqual(
            {
                completed: false,
                id: id,
                createdAt: epoch,
                title: 'new title'
            }
        )
    })

    it('should allow to update only a "completed" of a todo', () => {
        const todo = todoRepo.create("My todo");

        const updatedTodo = todoRepo.update(todo.id, {completed: true});

        expect(updatedTodo).toEqual(
            {
                completed: true,
                id: id,
                createdAt: epoch,
                title: 'My todo'
            }
        )
    })

    it('should allow to update all editable fields of a todo', () => {
        const todo = todoRepo.create("My todo");

        const updatedTodo = todoRepo.update(todo.id, {completed: true, title: 'new title'});

        expect(updatedTodo).toEqual(
            {
                completed: true,
                id: id,
                createdAt: epoch,
                title: 'new title'
            }
        )
    })

    it('should allow to update a todo from the list of TODOS', () => {
        const todo = todoRepo.create("My todo");

        todoRepo.update(todo.id, {completed: true, title: 'new title'});

        const todos = todoRepo.getAll();

        expect(todos).toEqual([

                {
                    completed: true,
                    id: id,
                    createdAt: epoch,
                    title: 'new title'
                }
            ]
        )
    })

    it('should only update the intended todo', () => {
        const todo1 = todoRepo.create("My todo 1");
        todoRepo.create("My todo 2");

        todoRepo.update(todo1.id, {completed: true, title: 'new title'});

        const todos = todoRepo.getAll();

        expect(todos).toEqual([
                {
                    completed: true,
                    id: id,
                    createdAt: epoch,
                    title: 'new title'
                },
                {
                    completed: false,
                    id: id,
                    createdAt: epoch,
                    title: 'My todo 2'
                }
            ]
        )
    })

    it('should throw an error if the todo is not found while updating', () => {
        todoRepo.create("My todo");

        expect(() =>
            todoRepo.update('fake-id', {title: 'new title'})
        ).toThrow('TODO with id fake-id not found')
    })
});
