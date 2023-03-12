import React, { useMemo, useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import './TodoFeature.css';

const TodoFeature = () => {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || []);
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFormSubmit = (value) => {
        const todo = {
            id: Math.floor(Math.random() * 10000),
            message: value,
            status: 'new',
        };
        setTodoList([todo, ...todoList]);
    };

    const handleClickDelete = (id) => {
        if (todoList.length === 1) {
            localStorage.removeItem('todoList');
        }
        const newList = todoList.filter((todo) => todo.id !== id);
        setTodoList([...newList]);
    };

    const handleDeleteCompleted = () => {
        const newList = todoList.filter((todo) => todo.status !== 'completed');
        if (todoList.length === 1 || newList.length === 0) {
            localStorage.removeItem('todoList');
        }
        setTodoList([...newList]);
    };

    const handleUpdate = (id, key, value) => {
        const newList = todoList.map((todo) => {
            if (todo.id === id) {
                todo[key] = value;
            }

            return todo;
        });
        setTodoList(newList);
    };

    const handleSelectAll = (selected) => {
        const newList = todoList.map((todo) => {
            if (selected) {
                return { ...todo, status: 'completed' };
            } else {
                return { ...todo, status: 'new' };
            }
        });
        setTodoList(newList);
    };

    const filterListTodo = useMemo(() => {
        if (todoList.length > 0) {
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
        return todoList.filter((todo) => filterStatus === 'all' || filterStatus === todo.status);
    }, [todoList, filterStatus]);

    const hasStatus = (key) => {
        const isStatus = [...todoList].filter((todo) => todo.status === key);
        return isStatus.length;
    };

    return (
        <div className="todo-feature">
            <TodoForm list={filterListTodo} handleSelectAll={handleSelectAll} onSubmit={handleFormSubmit} />
            <TodoList list={filterListTodo} handleDelete={handleClickDelete} handleUpdate={handleUpdate} />
            {todoList.length > 0 && (
                <div className="extend ">
                    <span className="item-length content">{hasStatus('new')} items left</span>
                    <div className="action">
                        <button
                            className={(filterStatus === 'all' ? 'active ' : '') + 'action-btn'}
                            onClick={() => setFilterStatus('all')}
                        >
                            All
                        </button>
                        <button
                            className={(filterStatus === 'new' ? 'active ' : '') + 'action-btn'}
                            onClick={() => setFilterStatus('new')}
                        >
                            Active
                        </button>
                        <button
                            className={(filterStatus === 'completed' ? 'active ' : '') + 'action-btn'}
                            onClick={() => setFilterStatus('completed')}
                        >
                            Completed
                        </button>
                    </div>
                    {hasStatus('completed') > 0 ? (
                        <>
                            <button className="clearCompleted content" onClick={handleDeleteCompleted}>
                                Clear completed
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="clearCompleted content" onClick={handleDeleteCompleted} disabled>
                                Clear completed
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoFeature;
